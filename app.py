#!/usr/bin/env python
from flask import Flask, render_template, redirect, url_for, abort, request
import time
import datetime

import json
import os



app = Flask(__name__, static_url_path='/static')
app.config['SECRET_KEY'] ='athena'


def json_serial(obj):
    if isinstance(obj, datetime.datetime):
        serial = obj.isoformat()
        return serial
        raise TypeError("Type not Serializable")
    if isinstance(obj, datetime.date):
        serial = obj.isoformat()
        return serial
        raise TypeError("Type not Serializable")

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/views/<path:filename>')
def getView(filename):
	return app.send_static_file('views/' + filename)

@app.route('/js/<path:filename>')
def getJsFile(filename):
	return app.send_static_file('js/' + filename)

@app.route('/css/<path:filename>')
def getCssFile(filename):
	return app.send_static_file('css/' + filename)

@app.route('/img/<path:filename>')
def getImgFile(filename):
	return app.send_static_file('img/' + filename)


@app.route('/quiz', methods=['GET'])
def quiz():
    with open('quiz1.json') as f:
        data = json.load(f)
    return json.dumps(data, default=json_serial)
    

if __name__ == '__main__':
	port = int(os.environ.get("PORT", 8000))
	app.run(host='0.0.0.0', port=8000, debug=True)
