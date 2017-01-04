from nose.tools import assert_equals
from ml import predictor
from ml import trainer
from ml import data_helpers


def test_train():
    x_text, y = data_helpers.load_data_and_labels("./data/rt-polaritydata/rt-polarity.pos", "./data/rt-polaritydata/rt-polarity.neg")
    t = trainer.Trainer(x_text=x_text, y=y)
    t.prepareData()
    t.run()
    assert t.accuracy >= .5


def test_predict():
    p = predictor.Predictor()
    result = p.predict("Bad Bad Bad")
    assert_equals(result[0], 0)
