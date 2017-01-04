FROM tensorflow

ADD requirements.txt .
RUN pip3 install -r requirements.txt
ADD . .
CMD ["./train.py"]
