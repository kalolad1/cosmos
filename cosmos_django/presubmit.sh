#!/bin/bash

# Script to get push ready by migrating, formatting, outputting static files,
# and running tests.
python manage.py makemigrations
python manage.py migrate
npm run build
python manage.py collectstatic --noinput
pip freeze > requirements.txt
yapf . --recursive -i
prettier --debug-check frontend/src/*
prettier --write frontend/src/*
python manage.py test -p *_test.py
echo "Presubmit passed!"
cat .bird_asci_art.txt ; echo
