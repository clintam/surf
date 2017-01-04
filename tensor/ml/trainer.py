import datetime

import numpy as np
import os
import tensorflow as tf
from tensorflow.contrib import learn

from ml import data_helpers
from ml.text_cnn import TextCNN


class Trainer(object):
    """
    Drives training for the model
    """

    def __init__(self, *,
                 x_text,
                 y,
                 num_epochs=1):
        self.x_text = x_text
        self.y = y
        self.num_epochs = num_epochs
        self.dev_sample_percentage = .1
        self.embedding_dim = 128
        self.filter_sizes = [3,4,5]
        self.num_filters = 128
        self.dropout_keep_prob = .5
        self.l2_reg_lambda = 0.0
        self.batch_size = 64
        self.evaluate_every = 100
        self.checkpoint_every = 100
        self.allow_soft_placement = True
        self.log_device_placement = False
        # Output directory for models and summaries
        self.out_dir = os.path.abspath(os.path.join(os.path.curdir, "runs", "current"))
        print("Working in to {}\n".format(self.out_dir))

    # TODO, make this take some data from json payload (and write output?)
    def prepareData(self):
        # Build vocabulary
        max_document_length = max([len(x.split(" ")) for x in self.x_text])
        self.vocab_processor = learn.preprocessing.VocabularyProcessor(max_document_length)
        x = np.array(list(self.vocab_processor.fit_transform(self.x_text)))

        # Randomly shuffle data
        np.random.seed(10)
        shuffle_indices = np.random.permutation(np.arange(len(self.y)))
        x_shuffled = x[shuffle_indices]
        y_shuffled = self.y[shuffle_indices]

        # Split train/test set
        # TODO: This is very crude, should use cross-validation
        dev_sample_index = -1 * int(self.dev_sample_percentage * float(len(self.y)))
        self.x_train, self.x_dev = x_shuffled[:dev_sample_index], x_shuffled[dev_sample_index:]
        self.y_train, self.y_dev = y_shuffled[:dev_sample_index], y_shuffled[dev_sample_index:]
        print("Vocabulary Size: {:d}".format(len(self.vocab_processor.vocabulary_)))
        print("Train/Dev split: {:d}/{:d}".format(len(self.y_train), len(self.y_dev)))

    def buildModel(self):
        # TODO check directory and load model if it exists
        # https://www.tensorflow.org/how_tos/variables/
        cnn = TextCNN(
            sequence_length=self.x_train.shape[1],
            num_classes=self.y_train.shape[1],
            vocab_size=len(self.vocab_processor.vocabulary_),
            embedding_size=self.embedding_dim,
            filter_sizes=self.filter_sizes,
            num_filters=self.num_filters,
            l2_reg_lambda=self.l2_reg_lambda)
        return cnn

    # TODO, make this work
    def restore(self, sess, dir):
        vocab_path = os.path.join(self.out_dir, "..", "vocab")
        self.vocab_processor = learn.preprocessing.VocabularyProcessor.restore(vocab_path)
        checkpoint_file = tf.train.latest_checkpoint(dir)
        # Load the saved meta graph and restore variables
        saver = tf.train.import_meta_graph("{}.meta".format(checkpoint_file))
        saver.restore(sess, checkpoint_file)

    def run(self):
        with tf.Graph().as_default():
            session_conf = tf.ConfigProto(
              allow_soft_placement=self.allow_soft_placement,
              log_device_placement=self.log_device_placement)
            sess = tf.Session(config=session_conf)
            with sess.as_default():
                cnn = self.buildModel()
                # Define Training procedure
                global_step = tf.Variable(0, name="global_step", trainable=False)
                optimizer = tf.train.AdamOptimizer(1e-3)
                grads_and_vars = optimizer.compute_gradients(cnn.loss)
                train_op = optimizer.apply_gradients(grads_and_vars, global_step=global_step)

                # Keep track of gradient values and sparsity (optional)
                grad_summaries = []
                for g, v in grads_and_vars:
                    if g is not None:
                        grad_hist_summary = tf.summary.histogram("{}/grad/hist".format(v.name), g)
                        sparsity_summary = tf.summary.scalar("{}/grad/sparsity".format(v.name), tf.nn.zero_fraction(g))
                        grad_summaries.append(grad_hist_summary)
                        grad_summaries.append(sparsity_summary)
                grad_summaries_merged = tf.summary.merge(grad_summaries)


                # Summaries for loss and accuracy
                loss_summary = tf.summary.scalar("loss", cnn.loss)
                acc_summary = tf.summary.scalar("accuracy", cnn.accuracy)

                # Train Summaries
                train_summary_op = tf.summary.merge([loss_summary, acc_summary, grad_summaries_merged])
                train_summary_dir = os.path.join(self.out_dir, "summaries", "train")
                train_summary_writer = tf.summary.FileWriter(train_summary_dir, sess.graph)

                # Dev summaries
                dev_summary_op = tf.summary.merge([loss_summary, acc_summary])
                dev_summary_dir = os.path.join(self.out_dir, "summaries", "dev")
                dev_summary_writer = tf.summary.FileWriter(dev_summary_dir, sess.graph)

                # Checkpoint directory. Tensorflow assumes this directory already exists so we need to create it
                checkpoint_dir = os.path.abspath(os.path.join(self.out_dir, "checkpoints"))
                checkpoint_prefix = os.path.join(checkpoint_dir, "model")
                if not os.path.exists(checkpoint_dir):
                    os.makedirs(checkpoint_dir)
                saver = tf.train.Saver(tf.global_variables())

                # Write vocabulary
                self.vocab_processor.save(os.path.join(self.out_dir, "vocab"))

                # Initialize all variables
                sess.run(tf.global_variables_initializer())

                def train_step(x_batch, y_batch):
                    """
                    A single training step
                    """
                    feed_dict = {
                      cnn.input_x: x_batch,
                      cnn.input_y: y_batch,
                      cnn.dropout_keep_prob: self.dropout_keep_prob
                    }
                    _, step, summaries, loss, accuracy = sess.run(
                        [train_op, global_step, train_summary_op, cnn.loss, cnn.accuracy],
                        feed_dict)
                    time_str = datetime.datetime.now().isoformat()
                    print("{}: step {}, loss {:g}, acc {:g}".format(time_str, step, loss, accuracy))
                    train_summary_writer.add_summary(summaries, step)

                def dev_step(x_batch, y_batch, writer=None):
                    """
                    Evaluates model on a dev set
                    """
                    feed_dict = {
                      cnn.input_x: x_batch,
                      cnn.input_y: y_batch,
                      cnn.dropout_keep_prob: 1.0
                    }
                    step, summaries, loss, self.accuracy = sess.run(
                        [global_step, dev_summary_op, cnn.loss, cnn.accuracy],
                        feed_dict)
                    time_str = datetime.datetime.now().isoformat()
                    print("{}: step {}, loss {:g}, acc {:g}".format(time_str, step, loss, self.accuracy))
                    if writer:
                        writer.add_summary(summaries, step)

                # Generate batches
                batches = data_helpers.batch_iter(
                    list(zip(self.x_train, self.y_train)), self.batch_size, self.num_epochs)
                # Training loop. For each batch...
                for batch in batches:
                    x_batch, y_batch = zip(*batch)
                    train_step(x_batch, y_batch)
                    current_step = tf.train.global_step(sess, global_step)
                    if current_step % self.evaluate_every == 0:
                        print("\nEvaluation:")
                        dev_step(self.x_dev, self.y_dev, writer=dev_summary_writer)
                        print("")
                    if current_step % self.checkpoint_every == 0:
                        path = saver.save(sess, checkpoint_prefix, global_step=current_step)
                        print("Saved model checkpoint to {}\n".format(path))
