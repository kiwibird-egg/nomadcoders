import requests
from flask import Flask, render_template, request,redirect
import get_obj

base_url = "http://hn.algolia.com/api/v1"


new_url = f"{base_url}/search_by_date?tags=story"
popular_url = f"{base_url}/search?tags=story"
detail_url = f"{base_url}/items/"

# This function makes the URL to get the detail of a storie by id.
# Heres the documentation: https://hn.algolia.com/api
def make_detail_url(id):
  return f"{base_url}/items/{id}"

db = {}
db2 = {} #detail

app = Flask("DayNine")
  
@app.route("/")
def get_main():
  order_by = request.args.get("order_by")
  if order_by=="popular":
    fromDb = db.get("popular")
    if fromDb:
      pre = fromDb
    else:
      pre = get_obj.get_title(popular_url)
      db["popular"] = pre
    return render_template("index.html",previews=pre)
  elif order_by=="new":
    fromDb = db.get("new")
    if fromDb:
      pre = fromDb
    else:
      pre = get_obj.get_title(new_url)
      db["new"] = pre
    return render_template("index.html",previews=pre)
  else: #nothing slected => popular
    fromDb = db.get("popular")
    if fromDb:
      pre = fromDb
    else:
      pre = get_obj.get_title(popular_url)
      db["popular"] = pre
    return render_template("index.html",previews=pre)

@app.route("/<id>")
def get_detail(id):
  fromDb = db2.get(str(id))
  if fromDb:
    pre = fromDb
    print("info aleady!")
    return render_template("detail.html",previews=pre)
  else:
    pre = get_obj.get_comments(detail_url+id)
    db2[str(id)] = pre
    print("info not aleady!")
    return render_template("detail.html",previews=pre)


app.run(host="0.0.0.0")