import requests
import json

def get_title(url):
  res = requests.get(url).text
  objs = json.loads(res)
  objs = objs["hits"]

  return_list = []
  for idx, obj in enumerate(objs):
    return_list.append({})
    return_list[idx]["title"] = obj["title"]
    return_list[idx]["url"] = obj["url"]
    return_list[idx]["points"] = obj["points"]
    return_list[idx]["author"] = obj["author"]
    return_list[idx]["num_comments"] = obj["num_comments"]
    return_list[idx]["objectID"] = obj["objectID"]
  return return_list

def get_comments(url):
  res = requests.get(url).text
  objs = json.loads(res)
  objs = objs["children"]
  
  return_list = []
  for idx, obj in enumerate(objs):
    return_list.append({})
    return_list[idx]["author"] = obj["author"]
    return_list[idx]["text"] = obj["text"]
  return return_list