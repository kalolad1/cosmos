#!/bin/bash

ssh jenkins@161.35.102.77 <<EOF
  cd cosmos_cloned/cosmos_django
  source venv/bin/activate
  git pull
  pip3 install --upgrade --force-reinstall -r requirements.txt
  venv/bin/python3.6 manage.py makemigrations
  venv/bin/python3.6 manage.py migrate
  venv/bin/python3.6 manage.py collectstatic --noinput
  venv/bin/python3.6 manage.py test -p *_test.py
  exit
EOF