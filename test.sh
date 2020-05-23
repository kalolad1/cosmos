#!/bin/bash

virtualenv venv -p python3.6
. venv/bin/activate
venv/bin/pip install -r cosmos_django/requirements.txt
ls -la
venv/bin/python3.6 cosmos_django/manage.py test -p *_test.py
cd cosmos_django || exit
ls -la cosmos_django