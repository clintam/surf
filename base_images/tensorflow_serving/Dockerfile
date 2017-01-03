FROM clintmorgan/tensorflow:base

RUN git clone --recursive https://github.com/tensorflow/serving

ADD configure.input serving/tensorflow/configure.input
RUN /var/lib/dpkg/info/ca-certificates-java.postinst configure && cd serving/tensorflow && \
    ./configure < configure.input && \
    cd .. && \
    bazel build -c opt tensorflow_serving/...

RUN cd serving/tensorflow && \
    bazel build -c opt //tensorflow/tools/pip_package:build_pip_package

RUN cd serving/tensorflow && \
    bazel-bin/tensorflow/tools/pip_package/build_pip_package /tmp/tensorflow_pkg && \
     pip install /tmp/tensorflow_pkg/tensorflow-0.12.0rc1-cp27-none-linux_x86_64.whl

RUN ln -s /serving/bazel-bin/tensorflow_serving/model_servers/tensorflow_model_server  /usr/local/bin/tensorflow_model_server
