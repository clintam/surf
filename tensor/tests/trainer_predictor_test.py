from nose.tools import assert_equals
import trainer
import predictor


def test_train():
    t = trainer.Trainer()
    t.prepareData()
    t.run()
    assert t.accuracy >= .5


def test_predict():
    p = predictor.Predictor()
    result = p.predict("Bad Bad Bad")
    assert_equals(result[0], 0)
