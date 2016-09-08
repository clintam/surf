#!/bin/sh
url=$1
echo -n "waiting on ${url}"
until $(curl --output /dev/null --silent --head --fail "${url}"); do
    printf '.'
    sleep 1
done
echo ". OK"