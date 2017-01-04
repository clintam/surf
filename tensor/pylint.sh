#!/bin/bash

find ml -name "*.py" | xargs pylint -E --extension-pkg-whitelist=numpy