import json
from pathlib import Path

from app.documents.models import Document

_DATA_FILE = Path(__file__).parent.parent.parent / "data" / "documents.json"

_store: dict[str, Document] = {}


def _load() -> None:
    if not _DATA_FILE.exists():
        raise FileNotFoundError(f"Mock data file not found: {_DATA_FILE}")
    with open(_DATA_FILE, "r") as f:
        try:
            raw = json.load(f)
        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON in mock data file: {e}") from e
    _store.update({doc["id"]: Document(**doc) for doc in raw})


_load()


def get_all() -> list[Document]:
    return list(_store.values())


def get_by_id(document_id: str) -> Document | None:
    return _store.get(document_id)


def save(document: Document) -> Document:
    _store[document.id] = document
    return document


def delete(document_id: str) -> bool:
    if document_id not in _store:
        return False
    del _store[document_id]
    return True
