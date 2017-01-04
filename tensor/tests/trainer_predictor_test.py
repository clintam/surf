from nose.tools import assert_equals
from ml import predictor
from ml import trainer


def test_train():
    t = trainer.Trainer()
    t.prepareData()
    t.run()
    assert t.accuracy >= .5


def test_predict():
    p = predictor.Predictor()
    result = p.predict("Bad Bad Bad")
    assert_equals(result[0], 0)
