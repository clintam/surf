# -*- coding: utf-8 -*-
"""
    PredictionServer
"""

from flask import Flask, jsonify, request
import data_helpers

app = Flask(__name__)

@app.route('/train', methods=['POST'])
def datapoint():
    [x, y] = data_helpers.load_json_data_and_labels(request.get_json())

    return jsonify(result="Started Training")

@app.route('/predict', methods=['POST'])
def predict():
    body = request.get_json()
    return "blah"

if __name__ == "__main__":
    app.run()
