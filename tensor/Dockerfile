FROM tensorflow

ADD requirements.txt .
RUN pip3 install -r requirements.txt
ADD . .
CMD ["python", "train.py", "--num_epochs", "1"]