FROM ubuntu:16.04

RUN apt-get update && \
    apt-get install -y \
        curl && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir /work
WORKDIR work

ADD wait.sh .

ENTRYPOINT ["./wait.sh"]
CMD [""]