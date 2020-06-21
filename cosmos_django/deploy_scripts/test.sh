#!/bin/bash

ssh jenkins@161.35.102.77 <<EOF
  cd cosmos_cloned/cosmos_django
  source venv/bin/activate
  git pull
  echo "%*rmLDpi9cs&T3e" | sudo -S npm ci
  npm run build
  pip3 install -r requirements.txt
  venv/bin/python3.6 manage.py makemigrations
  venv/bin/python3.6 manage.py migrate
  venv/bin/python3.6 manage.py collectstatic --noinput
  venv/bin/python3.6 manage.py test -p *_test.py
  exit
EOF