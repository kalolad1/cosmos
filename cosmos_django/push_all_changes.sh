#!/bin/bash

# Script to push all changes to Github.
python manage.py makemigrations
python manage.py migrate
npm run dev
python manage.py collectstatic --noinput
pip freeze > requirements.txt
yapf . --recursive -i
if python manage.py test -p *_test.py; then
  git add -A
  git commit -m "$1"
  git push
fi