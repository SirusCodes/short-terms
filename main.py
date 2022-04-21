from typing import List, Optional
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from summazier import get_summary
from web_scrapper import get_page_details

app = FastAPI()


class SummaryRequest(BaseModel):
    text: str
    length: Optional[int] = 40

class URLSummaryRequest(BaseModel):
    url: str
    length: Optional[int] = 40

class URLSummaryResponse(BaseModel):
    title: str
    summary: str


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

@app.post("/summarize_url")
def summarize_url(request: URLSummaryRequest):
    page = get_page_details(request.url)

    response : List[URLSummaryResponse] = []

    for detail in page:
        summary = get_summary(detail["content"], request.length)
        if summary == "":
            summary = detail["content"]
        response.append(URLSummaryResponse(title=detail["title"], summary=summary))

    return response

