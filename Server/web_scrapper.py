from typing import List
from urllib.request import urlopen
from bs4 import BeautifulSoup

def get_page_details(url: str) -> List[dict]:
    page = urlopen(url)
    page_html = page.read().decode("utf-8")
    soup = BeautifulSoup(page_html, "html.parser")

    # remove header
    header = soup.find("header")
    if header:
        header.extract()

    # remove footer
    footer = soup.find("footer")
    if footer:
        footer.extract()

    details = []

    for header in soup.find_all("h3"):
        content : List[str] = []
        # get paragraph text until next header
        for sibling in header.next_siblings:
            if sibling.name == "h3":
                break
            else:
                content.append(sibling.get_text())


        details.append({"title": header.get_text(), "content": "\n".join(content)})

    return details

