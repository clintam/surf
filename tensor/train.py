#! /usr/bin/env python

import trainer

t = trainer.Trainer(num_epochs=1)
t.prepareData()
t.run()