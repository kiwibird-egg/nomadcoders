import os
import csv
import requests
from bs4 import BeautifulSoup

def find_job(brand_name, brand_url):
    brand_response = requests.get(brand_url)
    brand_soup = BeautifulSoup(brand_response.text,"html.parser")
    tr_list = brand_soup.select("#NormalInfo > table > tbody > tr:not(.summaryView)")
    if tr_list[0].text=="해당 조건/분류에 일치하는 채용정보가 없습니다.":
        return -1
    job_list = []
    for idx, tr in  enumerate(tr_list):
        job_list.append([])
        job_list[idx].append(tr.select("td:first-child")[0].text.replace("\xa0"," "))
        job_list[idx].append(tr.select(".company")[0].text)
        job_list[idx].append(tr.select(".data > span")[0].text)
        job_list[idx].append((tr.select(".pay > span:first-child")[0].text)+(tr.select(".number")[0].text))
        job_list[idx].append(tr.select(".regDate")[0].text)
    return job_list

def save_to_file(brand_name,job_list):
    brand_name = brand_name.replace("/","_")
    file = open(brand_name+".csv", mode="w")
    writer = csv.writer(file)
    writer.writerow(["place","title","time","pay","date"])
    for job in job_list:
        writer.writerow(job)
    return

os.system("clear")

alba_url = "http://www.alba.co.kr"
main_response = requests.get(alba_url)
main_soup = BeautifulSoup(main_response.text,"html.parser")
impact_list = main_soup.select("#MainSuperBrand .impact")

num = 1

for li in impact_list :
    brand_name = li.select(".company")[0].text
    for a in li.find_all('a', href=True):
        brand_url = a['href']
        break
    print(num,brand_name)
    num += 1
    job_list = find_job(brand_name, brand_url)
    if job_list==-1 :
        continue
    save_to_file(brand_name,job_list)
    print("===================")


