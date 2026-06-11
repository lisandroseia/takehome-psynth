import json
from pathlib import Path
from app.models import Document

DATA_FILE = Path(__file__).parent.parent / "data" / "documents.json"

def load_documents() -> dict[str, Document]:
    with open(DATA_FILE, "r") as f:
        raw = json.load(f)
    return {doc["id"]: Document(**doc) for doc in raw}

documents: dict[str, Document] = load_documents()
