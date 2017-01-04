#! /usr/bin/env python

from ml import trainer

t = trainer.Trainer(num_epochs=1)
t.prepareData()
t.run()