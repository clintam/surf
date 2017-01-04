import tensorflow as tf
import numpy as np
import os
from tensorflow.contrib import learn

class Predictor(object):
    """
    Loads a trained model and makes predictions
    """

    def __init__(self, *,
                 positive_data_file="./data/rt-polaritydata/rt-polarity.pos",
                 negative_data_file="./data/rt-polaritydata/rt-polarity.neg",
                 eval_train=False):
        self.positive_data_file = positive_data_file
        self.negative_data_file = negative_data_file
        self.batch_size = 64
        self.eval_train = eval_train
        self.allow_soft_placement = True
        self.log_device_placement = False
        # Output directory for models and summaries
        self.out_dir = os.path.abspath(os.path.join(os.path.curdir, "runs", "current"))
        self.checkpoint_dir=os.path.join(self.out_dir, "checkpoints")
        print("Working in to {}\n".format(self.out_dir))
        vocab_path = os.path.join(self.checkpoint_dir, "..", "vocab")
        self.vocab_processor = learn.preprocessing.VocabularyProcessor.restore(vocab_path)

    # TODO : make this a generator?
    def predict(self, x_raw):
        checkpoint_file = tf.train.latest_checkpoint(self.checkpoint_dir)
        graph = tf.Graph()
        with graph.as_default():
            session_conf = tf.ConfigProto(
              allow_soft_placement=self.allow_soft_placement,
              log_device_placement=self.log_device_placement)
            sess = tf.Session(config=session_conf)
            with sess.as_default():
                # Load the saved meta graph and restore variables
                saver = tf.train.import_meta_graph("{}.meta".format(checkpoint_file))
                saver.restore(sess, checkpoint_file)

                # Get the placeholders from the graph by name
                input_x = graph.get_operation_by_name("input_x").outputs[0]
                # input_y = graph.get_operation_by_name("input_y").outputs[0]
                dropout_keep_prob = graph.get_operation_by_name("dropout_keep_prob").outputs[0]

                # Tensors we want to evaluate
                predictions = graph.get_operation_by_name("output/predictions").outputs[0]
                # Map data into vocabulary
                x_test = np.array(list(self.vocab_processor.transform(x_raw)))
                thisPerdiction = sess.run(predictions, {input_x: x_test, dropout_keep_prob: 1.0})
                return thisPerdiction
