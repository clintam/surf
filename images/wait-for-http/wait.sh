#!/bin/sh
url=$1
echo "waiting on ${url}"
until $(curl --output /dev/null --silent --head --fail "${url}"); do
    printf '.'
    sleep 1
done