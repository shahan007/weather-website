import os
import requests as req

API_KEY = os.environ.get("API_KEY")
API_URL = "https://api.openweathermap.org/data/2.5/weather"

def request_weather(country):    
    payload = {
        "q" : country,
        "appid": API_KEY,
        "units": "metric"
    }
    try:
        res = req.get(API_URL, payload)
        if res.ok:
            return res.json()
        return None
    except:
        return None