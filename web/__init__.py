from flask import (Flask , request , render_template , session,url_for,jsonify)
from .request_weather import request_weather

app = Flask(__name__)
app.secret_key = b"hello input any secret key"

@app.route("/",methods=["GET"])
def index():    
    return render_template('index.html')

@app.route('/updateweather',methods=["POST"])
def update_weather():
    country = request.get_json().get('country')    
    error = jsonify({'message': f'{country or "Empty"} is an invalid country!'})
    error.status_code = 400
    if country:
        data = request_weather(country.lower())
        if data:
            session['country'] = country
            session['data'] = data
            return jsonify({'data':data}) , 200
        return  error
    else:
        return error

@app.errorhandler(404)
def handle_404(msg):
    a=10
    return f"""            
            <h3>{msg}</h3>
            <a href="{url_for('index')}">GO BACK</a>
            """