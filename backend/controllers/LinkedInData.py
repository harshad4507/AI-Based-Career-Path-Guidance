import requests
from bs4 import BeautifulSoup
import json
import time
import random
import sys

def scrape_linkedin_jobs(title, location, start=0):
    # Construct the URL for LinkedIn job search
    list_url = f"https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords={title}&location={location}&start={start}"
    
    # Send a GET request to the URL
    response = requests.get(list_url)
    if response.status_code != 200:
        print(f"Failed to fetch page at start {start}. Status code: {response.status_code}")
        return []

    list_data = response.text
    list_soup = BeautifulSoup(list_data, "html.parser")
    page_jobs = list_soup.find_all("li")

    id_list = []

    for job in page_jobs:
        base_card_div = job.find("div", {"class": "base-card"})
        if base_card_div and "data-entity-urn" in base_card_div.attrs:
            job_id = base_card_div["data-entity-urn"].split(":")[3]
            id_list.append(job_id)

    job_list = []

    for job_id in id_list:
        job_url = f"https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/{job_id}"
        job_response = requests.get(job_url)

        if job_response.status_code == 200:
            job_soup = BeautifulSoup(job_response.text, "html.parser")
            
            job_post = {}
            
            try:
                job_post["job_title"] = job_soup.find("h2", {"class": "top-card-layout__title"}).text.strip()
            except AttributeError:
                job_post["job_title"] = None

            try:
                company_element = job_soup.find("a", {"class": "topcard__org-name-link"})
                job_post["company_name"] = company_element.text.strip() if company_element else None
                job_post["company_href"] = company_element['href'] if company_element else None
            except AttributeError:
                job_post["company_name"] = None
                job_post["company_href"] = None
                
            try:
                apply_element = job_soup.find("a", {"class": "topcard__link"})
                job_post["apply_link"] = apply_element['href'] if apply_element else None
            except AttributeError:
                job_post["apply_link"] = None
                
            try:
                job_post["time_posted"] = job_soup.find("span", {"class": "posted-time-ago__text"}).text.strip()
            except AttributeError:
                job_post["time_posted"] = None
                
            try:
                job_post["num_applicants"] = job_soup.find("span", {"class": "num-applicants__caption"}).text.strip()
            except AttributeError:
                job_post["num_applicants"] = None

            job_list.append(job_post)
            time.sleep(random.uniform(1, 3))

    return job_list

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    title = input_data.get("title", "")
    location = input_data.get("location", "")
    
    job_data = scrape_linkedin_jobs(title, location)
    print(json.dumps(job_data))
