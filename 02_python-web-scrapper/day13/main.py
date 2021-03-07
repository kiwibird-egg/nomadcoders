"""
These are the URLs that will give you remote jobs for the word 'python'

https://stackoverflow.com/jobs?r=true&q=python
https://weworkremotely.com/remote-jobs/search?term=python
https://remoteok.io/remote-dev+python-jobs
"""
#====================================================#
import requests
import csv
import os
import redirect
from flask import Flask, render_template, request, redirect, send_file
from bs4 import BeautifulSoup

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'}
db = {}

#====================================================#
def get_obj(term):
  fromDb = db.get(term)
  if fromDb:
    job_list = fromDb
  else:
    url1 = f"https://stackoverflow.com/jobs?r=true&q={term}"
    url2 = f"https://weworkremotely.com/remote-jobs/search?term={term}"
    url3 = f"https://remoteok.io/remote-dev+{term}-jobs"

    list1 = get_url1(url1)
    list2 = get_url2(url2)
    list3 = get_url3(url3)
    job_list = list1 + list2 + list3
    db[term] = job_list

  return job_list

def save_to_file(job_list):
    file = open("jobs.csv", mode="w")
    writer = csv.writer(file)
    writer.writerow(["title","company","link"])
    for job in job_list:
        writer.writerow(job)
    file.close()
    return 
#====================================================#
def get_url1(url):
  soup = BeautifulSoup(
    requests.get(url,headers=headers).text, "html.parser")
  listResults = soup.select(".listResults > div:nth-child(-n+4)")

  job_list = []
  for idx, result in enumerate(listResults):
    job_list.append([])
    job_list[idx].append(
      result.find("h2").text.strip()
      ) # title
    job_list[idx].append(
      result.select("h3 >span")[0].text.strip()
      ) #company
    job_list[idx].append(
      "https://stackoverflow.com"+result.select("h2 a")[0]["href"]
    ) #link

  return job_list

def get_url2(url):
  soup = BeautifulSoup(
    requests.get(url,headers=headers).text, "html.parser")
  listResults = soup.select(
    "#job_list > section > article > ul > li")
  job_list = []
  for idx, result in enumerate(listResults):
    if idx==4:
      break;
    job_list.append([])
    job_list[idx].append(result.select(".title")[0].text)
    job_list[idx].append(result.select(".company")[0].text)
    job_list[idx].append(
      "https://weworkremotely.com"+result.select("a")[0]["href"])
  return job_list

def get_url3(url):
  soup = BeautifulSoup(requests.get(
    url,headers=headers).text, "html.parser")
  listResults = soup.select("#jobsboard .job")

  job_list = []
  for idx, result in enumerate(listResults):
    if idx==4:
      break;
    job_list.append([])  
    job_list[idx].append(result.select(".preventLink > h2")[0].text)
    job_list[idx].append(result.select(".companyLink > h3")[0].text)
    job_list[idx].append(
      "https://remoteok.io"+result.select(".preventLink")[0]["href"]
      )
  return job_list

#====================================================#
app = Flask("IT-Job-Finder")

@app.route("/")
def home():
  return render_template("home.html")

@app.route("/search")
def search():
  term = request.args.get("term")
  job_list = get_obj(term)
  print("csv exporting...")
  return render_template("search.html",job_list=job_list)

@app.route("/export")
def export():
  try:
    word = request.args.get("term")
    if not word:
      raise Exception()
    word = word.lower()
    jobs = db.get(word)
    if not jobs:
      raise Exception()
    save_to_file(jobs)
    return send_file(
      "jobs.csv", 
      mimetype='text/csv', 
      attachment_filename="jobs.csv",  
      as_attachment=True
      )
  except:
    return redirect("/")
  

app.run(host="0.0.0.0")



