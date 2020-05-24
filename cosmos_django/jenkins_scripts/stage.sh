#!/bin/bash

ssh jenkins@161.35.102.77 <<EOF
  cd cosmos_cloned/cosmos_django
  source venv/bin/activate
  venv/bin/python3.6 manage.py runserver 0.0.0.0:8000
  exit
EOF