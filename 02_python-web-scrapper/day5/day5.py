import os
import requests
from bs4 import BeautifulSoup

def getCode():
    selector = -1
    try:
        selector = int(input("#: "))
        
    except:
        print("that wasnt's a number.")
        getCode()
        return
    finally:
        if selector==-1:
            return
        if (selector > len(list_country)-1 or selector < 0):
            print("choose a number from the list")
            getCode()
        else:
            print("You chose "+list_country[selector][0])
            print("The currency code is "+list_country[selector][1])
        return

os.system("cls")
url = "https://www.iban.com/currency-codes"
response = requests.get(url)

soup = BeautifulSoup(response.text,"html.parser")

list_tr = soup.select("table tbody tr")

list_country = []

print("# Hello! Please choose select a country by number:")

for idx, td in enumerate(list_tr) :
    list_country.append([])
    list_country[idx].append(td.select("td:first-child")[0].text)
    list_country[idx].append(td.select("td:nth-child(3)")[0].text)
    print("# "+str(idx)+" "+list_country[idx][0])

getCode()


