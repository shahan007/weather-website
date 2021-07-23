import os
import requests as req

API_KEY = os.environ.get("API_KEY")
API_URL = "https://api.openweathermap.org/data/2.5/weather"
API_FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast"
REQUEST_HEADER = {
    "user-agent" : "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Mobile Safari/537.36"
    }

def request_weather(place):    
    payload = {
        "q": place,
        "appid": API_KEY,
        "units": "metric"
    }
    try:
        res = req.get(API_URL, payload, headers=REQUEST_HEADER)
        if res.ok:
            return res.json()
        return None
    except:
        return None

def request_weather_geo(lon,lat):
    payload = {
        "lat": lat,
        "lon" : lon,
        "units": "metric",
        "appid": API_KEY,        
    }
    try:
        res = req.get(API_URL, payload, headers=REQUEST_HEADER)
        if res.ok:            
            return res.json()
        return None
    except:
        return None    

def request_weather_forecast(place):
    payload = {
        "q":place,
        "appid":API_KEY,
        "units": "metric",
        "cnt" : 6
    }
    try:
        res = req.get(API_FORECAST_URL, payload, headers=REQUEST_HEADER)
        if res.ok:
            return res.json()
        return None
    except:
        return None