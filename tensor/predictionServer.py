# -*- coding: utf-8 -*-
"""
    PredictionServer
"""

from flask import Flask, jsonify, request
from ml import trainer
from ml import predictor
from ml import data_helpers

app = Flask(__name__)

@app.route('/train', methods=['POST'])
def datapoint():
    x_text, y = data_helpers.load_json_data_and_labels(request.get_json())
    #t = trainer.Trainer(x_text=x_text, y=y, num_epochs=1)
    #t.prepareData()
    #t.run()

    return jsonify(result="Started Training")

@app.route('/predict', methods=['POST'])
def predict():
    body = request.get_json()
    inputs = body['inputs']

    p = predictor.Predictor()
    result = p.predict(inputs)

    return jsonify(result=result.tolist())

if __name__ == "__main__":
    app.run()
