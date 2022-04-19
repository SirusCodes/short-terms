from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from summazier import get_summary

app = FastAPI()


class SummaryRequest(BaseModel):
    text: str
    length: Optional[int] = 40


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/summarize")
def summarize(request: SummaryRequest):
    summary = get_summary(request.text, request.length)
    return {"summary": summary}
