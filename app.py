#!/usr/bin/env python
from flask import Flask, render_template, redirect, url_for, abort, request

import time
import datetime
import logging
import logging.handlers
import ConfigParser
import json
import os

from api_auth import auth_required, AuthStore

def json_serial(obj):
    if isinstance(obj, datetime.datetime):
        serial = obj.isoformat()
        return serial
        raise TypeError("Type not Serializable")
    if isinstance(obj, datetime.date):
        serial = obj.isoformat()
        return serial
        raise TypeError("Type not Serializable")

app = Flask(__name__, static_url_path='/static')
app.config['SECRET_KEY'] ='athena'

# Initialize config reader
config = ConfigParser.ConfigParser()
config.read('conf/app.conf')

# Initialize logger
logger = logging.getLogger('Logger')
logger.setLevel(logging.INFO)
handler = logging.handlers.RotatingFileHandler(config.get('logging', 'file'))
formatter = logging.Formatter("%(asctime)s: %(levelname)s - %(name)s - %(message)s")
handler.setFormatter(formatter)
logger.addHandler(handler)



@app.route('/views/<path:filename>')
def getView(filename):
	return app.send_static_file('views/' + filename)

@app.route('/js/<path:filename>')
def getJsFile(filename):
	return app.send_static_file('js/' + filename)

@app.route('/fonts/<path:filename>')
def getFontsFile(filename):
    return app.send_static_file('fonts/' + filename)

@app.route('/css/<path:filename>')
def getCssFile(filename):
	return app.send_static_file('css/' + filename)

@app.route('/img/<path:filename>')
def getImgFile(filename):
	return app.send_static_file('img/' + filename)


@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/progress', methods=['GET'])
def progress():
    return app.send_static_file('progress.html')

@app.route('/login', methods=['GET'])
def login():
    return app.send_static_file('login.html')


@app.route('/loginpost', methods=['POST'])
def login_post():
    try:
        username = None
        password = None
        if 'username' in request.form:
            username = request.form["username"]
        if 'password' in request.form:
            password = request.form["password"]

        if AuthStore().valid_user(username, password):
            response = make_response(redirect('/quiz'))
            response.set_cookie("auth-token", str(AuthStore().get_token(username)))
            response.set_cookie("username", str(username))
            return response
    except:
        traceback.print_exc()

    return redirect('/login?status=invalid') #send_from_directory('.', 'login.html')


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    response = make_response(redirect('/login'))
    response.set_cookie("auth-token", "", expires=0)
    response.set_cookie("username", "", expires=0)
    return response


@app.route('/quiz', methods=['GET'])

def quiz():
    with open('quiz1.json') as f:
        data = json.load(f)
    return json.dumps(data, default=json_serial)




if __name__ == '__main__':
    AuthStore().init()
    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=8000, debug=True)
