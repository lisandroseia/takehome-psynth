import math
from uuid import uuid4
from datetime import datetime, timezone
from typing import Optional

from fastapi import HTTPException

from app.documents import repository
from app.documents.models import (
    Document,
    DocumentCategory,
    DocumentCreate,
    DocumentPatch,
    DocumentPriority,
    DocumentSortBy,
    DocumentStatus,
    PaginatedResponse,
    SortOrder,
)

_PRIORITY_ORDER = {DocumentPriority.low: 0, DocumentPriority.medium: 1, DocumentPriority.high: 2}
_STATUS_ORDER = {DocumentStatus.pending: 0, DocumentStatus.in_review: 1, DocumentStatus.approved: 2, DocumentStatus.rejected: 3}


def list_documents(
    status: Optional[DocumentStatus] = None,
    priority: Optional[DocumentPriority] = None,
    category: Optional[DocumentCategory] = None,
    q: Optional[str] = None,
    sort_by: DocumentSortBy = DocumentSortBy.created_at,
    sort_order: SortOrder = SortOrder.desc,
    page: int = 1,
    page_size: Optional[int] = 10,
) -> PaginatedResponse:
    docs = repository.get_all()

    if status:
        docs = [doc for doc in docs if doc.status == status]
    if priority:
        docs = [doc for doc in docs if doc.priority == priority]
    if category:
        docs = [doc for doc in docs if doc.category == category]
    if q:
        term = q.lower()
        docs = [doc for doc in docs if term in doc.title.lower() or term in doc.submitter_name.lower()]

    reverse = sort_order == SortOrder.desc
    if sort_by == DocumentSortBy.priority:
        docs.sort(key=lambda d: _PRIORITY_ORDER[d.priority], reverse=reverse)
    elif sort_by == DocumentSortBy.status:
        docs.sort(key=lambda d: _STATUS_ORDER[d.status], reverse=reverse)
    else:
        docs.sort(key=lambda d: getattr(d, sort_by.value), reverse=reverse)

    total = len(docs)

    if page_size is None:
        return PaginatedResponse(items=docs, total=total, page=1, page_size=None, total_pages=1)

    total_pages = max(1, math.ceil(total / page_size))
    page = min(page, total_pages)
    start = (page - 1) * page_size
    return PaginatedResponse(
        items=docs[start : start + page_size],
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
    )


def get_document(document_id: str) -> Document:
    doc = repository.get_by_id(document_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document Not Found")
    return doc


def create_document(payload: DocumentCreate) -> Document:
    doc = Document(
        id=f"doc_{uuid4().hex[:8]}",
        created_at=datetime.now(timezone.utc),
        **payload.model_dump(),
    )
    return repository.save(doc)


def update_document(document_id: str, payload: DocumentPatch) -> Document:
    doc = get_document(document_id)
    updated = doc.model_copy(update={"status": payload.status})
    return repository.save(updated)


def delete_document(document_id: str) -> None:
    if not repository.delete(document_id):
        raise HTTPException(status_code=404, detail="Document Not Found")
