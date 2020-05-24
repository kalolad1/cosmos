#!/bin/bash

ssh jenkins@161.35.102.77 <<EOF
  ls
  cd cosmos_cloned/cosmos_django
  source venv/bin/activate
  git pull
  pip install -r requirements.txt
  python manage.py makemigrations
  python manage.py migrate
  python manage.py collectstatic --noinput

  python manage.py test -p *_test.py
  exit
EOF