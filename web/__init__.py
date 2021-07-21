from flask import (Flask , request , render_template , session,url_for,jsonify)
from .request_weather import request_weather, request_weather_geo

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
            session['place'] = data.get('name')
            session['data'] = data
            return jsonify({'data': data}), 200    
        return error            
    if place:
        data = request_weather(place.lower())
        if data:
            session['place'] = place
            session['data'] = data
            return jsonify({'data':data}) , 200
        return  error
    else:
        return error

@app.errorhandler(404)
def handle_404(msg):    
    return f"""            
            <h3>{msg}</h3>
            <a href="{url_for('index')}">GO BACK</a>
            """