from enum import Enum
from datetime import datetime
from pydantic import BaseModel, Field


class DocumentStatus(str, Enum):
    pending = "pending"
    in_review = "in_review"
    approved = "approved"
    rejected = "rejected"


class DocumentPriority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class DocumentCategory(str, Enum):
    legal = "Legal"
    marketing = "Marketing"
    security = "Security"
    operations = "Operations"
    product = "Product"
    engineering = "Engineering"
    customer_success = "Customer Success"


class DocumentSortBy(str, Enum):
    title = "title"
    submitter_name = "submitter_name"
    created_at = "created_at"
    priority = "priority"
    status = "status"


class SortOrder(str, Enum):
    asc = "asc"
    desc = "desc"


class Document(BaseModel):
    id: str
    title: str
    submitter_name: str
    category: DocumentCategory
    status: DocumentStatus
    priority: DocumentPriority
    created_at: datetime
    summary: str


class DocumentCreate(BaseModel):
    title: str = Field(min_length=3, max_length=200)
    submitter_name: str = Field(min_length=2, max_length=100)
    category: DocumentCategory
    status: DocumentStatus = DocumentStatus.pending
    priority: DocumentPriority
    summary: str = Field(min_length=10, max_length=1000)


class DocumentPatch(BaseModel):
    status: DocumentStatus


class PaginatedResponse(BaseModel):
    items: list[Document]
    total: int
    page: int
    page_size: int | None
    total_pages: int
