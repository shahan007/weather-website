from flask import (Flask , request , render_template , session,url_for,flash)
from .request_weather import request_weather

app = Flask(__name__)
app.secret_key = b"hello input any secret key"

@app.route("/",methods=["GET","POST"])
def index():
    print(url_for('index'))
    if request.method == "POST":
        country = request.form.get("country").strip()
        if country:            
            data = request_weather(country.lower()) 
            if data:
                session['country'] = country
                session['data']    = data
            else:
                flash("INVALID country !")
        else:
            flash("INVALID country !")                        
    return render_template('index.html')

@app.errorhandler(404)
def handle_404(msg):
    a=10
    return f"""            
            <h3>{msg}</h3>
            <a href="{url_for('index')}">GO BACK</a>
            """