from enum import Enum
from datetime import datetime
from pydantic import BaseModel

class DocumentStatus(str, Enum):
    pending = "pending"
    in_review = "in_review"
    approved = "approved"
    rejected = "rejected"

class DocumentPriority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class Document(BaseModel):
    id: str
    title: str
    submitter_name: str
    category: str
    status: DocumentStatus
    priority: DocumentPriority
    created_at: datetime
    summary: str

class DocumentCreate(BaseModel):
    title: str
    submitter_name: str
    category: str
    status: DocumentStatus = DocumentStatus.pending
    priority: DocumentPriority
    summary: str

class DocumentPatch(BaseModel):
    status: DocumentStatus