from flask import (Flask , request , render_template , session,url_for,jsonify)
from .request_weather import request_weather, request_weather_geo , request_weather_forecast

app = Flask(__name__)
app.secret_key = b"hello input any secret key"

@app.route("/",methods=["GET"])
def index():
    return render_template('index.html')

@app.route('/updateweather',methods=["POST"])
def update_weather():
    data      = request.get_json()
    place = data.get('place')
    longitude = data.get('longitude')
    latitude  = data.get('latitude')
    if len(place) > 13:
        place_error = place[:13] + '....'
    else:
        place_error = place
    error = jsonify({'message': f'{place_error or "Empty"} is an invalid location!'})
    error.status_code = 400    
    if latitude and longitude:
        data = request_weather_geo(longitude,latitude)
        if data:            
            session['place'] = data.get('name').title()
            session['data'] = data
            return jsonify({'data': data}), 200    
        return error            
    if place:
        data = request_weather(place.lower())
        if data:
            session['place'] = place.title()
            session['data'] = data
            return jsonify({'data':data}) , 200
        return  error
    else:
        return error

@app.route('/updateforecast',methods=["POST"])
def updateforecast():
    next_hr = int(request.get_json().get('next_hr'))
    data = []
    forecastmsg = request_weather_forecast(place=session['place'])    
    msg = forecastmsg.get('list')
    for i,m in enumerate(msg):
        if int(m.get('dt_txt').split()[1].split(':')[0]) == next_hr:            
            break
    data.extend(msg[i:i+3])
    return jsonify(data)
    
@app.errorhandler(404)
def handle_404(msg):    
    return f"""            
            <h3>{msg}</h3>
            <a href="{url_for('index')}">GO BACK</a>
            """