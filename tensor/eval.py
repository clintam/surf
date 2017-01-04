#! /usr/bin/env python

from ml import predictor

prediction = predictor.Predictor()

# Ask questions
while True:
    input_list = [input('Enter your RT review :> ')]
    # Map data into vocabulary
    predictions = prediction.predict(input_list)
    for p in predictions:
        print("It will be: {} ({})".format("Good" if p == 1.0 else "Rotten", p))
