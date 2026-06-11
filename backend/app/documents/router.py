from typing import Optional

from fastapi import APIRouter, Query

from app.documents import service
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

router = APIRouter(prefix="/documents", tags=["documents"])


@router.get("", response_model=PaginatedResponse)
def get_documents(
    status: Optional[DocumentStatus] = None,
    priority: Optional[DocumentPriority] = None,
    category: Optional[DocumentCategory] = None,
    q: Optional[str] = None,
    sort_by: DocumentSortBy = DocumentSortBy.created_at,
    sort_order: SortOrder = SortOrder.desc,
    page: int = Query(default=1, ge=1),
    page_size: Optional[int] = Query(default=10, ge=1),
):
    return service.list_documents(status, priority, category, q, sort_by, sort_order, page, page_size)


@router.get("/{document_id}", response_model=Document)
def get_document(document_id: str):
    return service.get_document(document_id)


@router.post("", response_model=Document, status_code=201)
def create_document(payload: DocumentCreate):
    return service.create_document(payload)


@router.patch("/{document_id}", response_model=Document)
def update_document(document_id: str, payload: DocumentPatch):
    return service.update_document(document_id, payload)


@router.delete("/{document_id}", status_code=204)
def delete_document(document_id: str):
    service.delete_document(document_id)
