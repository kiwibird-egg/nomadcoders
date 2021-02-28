import os
import requests
from bs4 import BeautifulSoup
from babel.numbers import format_currency

def getCountry1():
    selector = -1
    while(True):
      try:
          selector = int(input("#: "))
          if (selector > len(list_country)-1 or selector < 0):
              print("choose a number from the list")
              continue
          else:
              print(list_country[selector][0])
              return selector
      except:
          print("that wasnt's a number.")
          continue

def getCountry2():
    selector = -1
    while(True):
      try:
          selector = int(input("#: "))
          if (selector > len(list_country)-1 or selector < 0):
              print("choose a number from the list")
              continue
          else:
              print(list_country[selector][0])
              return selector
      except:
          print("that wasnt's a number.")
          continue

def getAmount():
    selector = -1
    while(True):
      try:
          selector = int(input("#: "))
          return selector
      except:
          print("that wasnt's a number.")
          continue

def convertCurrency(cur1, cur2, amt):
  url = "https://transferwise.com/gb/currency-converter/"+cur1+"-to-"+cur2+"-rate?amount="+str(amt)
  result = -1

  try:
    response2 = requests.get(url)

    soup2 = BeautifulSoup(response2.text,"html.parser")
    balance = soup2.select(".text-success")[0].text
    result = float(balance)*amt

  except:
    print("Sorry, we don't have that country's currency information")
    return result

  return result

os.system("clear")
print("Welcome to CurrencyConvert pro 2020!")
"""
Use the 'format_currency' function to format the output of the conversion
format_currency(AMOUNT, CURRENCY_CODE, locale="ko_KR" (no need to change this one))
"""

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

print("\nWhere are you from? Choose a country by number.")
country1 = int(getCountry1())
print("\nNow choose another country.")
country2 = int(getCountry2())


print(f"\nHow many {list_country[country1][1]} do you want to convert to  {list_country[country2][1]} ?")
amount = int(getAmount())

result = convertCurrency(list_country[country1][1],list_country[country2][1], amount)

if(result!=-1):
  amt = format_currency(amount, list_country[country1][1], locale="ko_KR")
  result = format_currency(result, list_country[country2][1], locale="ko_KR")
  print(f"{amt} is {result}")



#print(format_currency(5000, "KRW", locale="ko_KR"))