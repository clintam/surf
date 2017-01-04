FROM tensorflow

ADD requirements.txt .
RUN pip3 install -r requirements.txt
ADD . .

EXPOSE 8080
CMD ["./main.py"]
