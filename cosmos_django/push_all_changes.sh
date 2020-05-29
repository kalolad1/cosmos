#!/bin/bash

# Script to push all changes to Github.
# run collectstatic
python manage.py collectstatic --noinput
python manage.py makemigrations
python manage.py migrate
npm run dev
pip freeze > requirements.txt
yapf . --recursive -i
mypy .
python manage.py test -p *_test.py
git add -A
git commit -m "$1"
git push




