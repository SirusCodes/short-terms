from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel

from summazier import get_summary

app = FastAPI()


class SummaryRequest(BaseModel):
    text: str
    length: Optional[int] = 40


@app.post("/summarize")
def summarize(request: SummaryRequest):
    summary = get_summary(request.text, request.length)
    return {"summary": summary}
