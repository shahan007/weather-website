# weather-website
_A simple single page web application to display the current weather and 3 times +3hr weather forecast_<br>
_Check out the website here: **[Weather Health](https://weather-health.herokuapp.com/)**_
<br><br>

## Built With
- _API from [Open Weather](https://openweathermap.org/)_
- _Python version 3.8.0_
- _HTML/CSS/JS/JQuery_ <br><br>

## How to run ?

#### Clone the repo
```console
$ git clone https://github.com/shahan007/weather-website.git
```

#### Setting up the environment
```console
$ python -m venv venv
$ source venv/Scripts/activate
(venv) $ pip install -r requirements.txt
```

#### Setting up the environment variables
```console
(venv) $ export FLASK_DEBUG=1     #optional
(venv) $ export FLASK_APP=run.py
(venv) $ export API_KEY=<YOUR_API_KEY>
```
###### Generating Secret Key for session
```console
(venv) $ python -c 'import os; print(os.urandom(16))'
b'\xba\xc9>\xfc}\xcf\x1b\xe5\xcc\xb8\x94L\x8e\x8c-C'      #copy this secret key & set it as secret key
(venv) $ export SECRET_KEY=\xba\xc9>\xfc}\xcf\x1b\xe5\xcc\xb8\x94L\x8e\x8c-C
```

#### Run the website
```console
(venv) $ flask run
```
