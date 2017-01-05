#! /usr/bin/env python

from ml import trainer
from ml import data_helpers
from ml.predictionServer import Server

import threading

def train():
    print("Loading data...")
    x_text, y = data_helpers.load_data_and_labels("./data/rt-polaritydata/rt-polarity.pos", "./data/rt-polaritydata/rt-polarity.neg")
    t = trainer.Trainer(x_text=x_text, y=y, num_epochs=10)
    t.prepareData()
    t.run()

thread = threading.Thread(target=train, args=())
thread.start()

Server().run()
