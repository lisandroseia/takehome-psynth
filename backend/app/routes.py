from fastapi import APIRouter, HTTPException, status
from typing import Optional
from uuid import uuid4
from datetime import datetime, timezone

from app.models import Document, DocumentCreate, DocumentPatch, DocumentStatus
from app.data import documents

router = APIRouter()

@router.get("/documents", response_model=list[Document])
def get_documents(status: Optional[DocumentStatus] = None):
    docs = list(documents.values())
    if status:
        docs = [doc for doc in docs if doc.status == status]
    return docs

@router.get("/documents/{document_id}", response_model=Document)
def get_document(document_id: str):
    doc = documents.get(document_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document Not Found")
    return doc

@router.post("/documents", response_model=Document, status_code=201)
def create_document(payload: DocumentCreate):
    new_id = f"doc_{uuid4().hex[:8]}"
    doc = Document(
        id=new_id,
        created_at=datetime.now(timezone.utc),
        **payload.model_dump(),
    )
    documents[new_id] = doc
    return doc


@router.patch("/documents/{document_id}", response_model=Document)
def update_document(document_id: str, payload: DocumentPatch):
    doc = documents.get(document_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document Not Found")
    updated = doc.model_copy(update={"status": payload.status})
    return updated

@router.delete("/documents/{document_id}", status_code=204)
def delete_document(document_id: str):
    if document_id not in documents:
        raise HTTPException(status_code=404, detail="Document Not Found")
    del documents[document_id]

    