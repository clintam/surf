#! /usr/bin/env python

from ml import trainer
from ml import data_helpers

print("Loading data...")
x_text, y = data_helpers.load_data_and_labels("./data/rt-polaritydata/rt-polarity.pos", "./data/rt-polaritydata/rt-polarity.neg")
t = trainer.Trainer(x_text=x_text, y=y, num_epochs=1)
t.prepareData()
t.run()
