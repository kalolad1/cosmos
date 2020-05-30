#!/bin/bash

# Script to handle and then push changes to Github.
# Run without argument to simply build and test.
# Run with "<Commit message>" to push to github.
python manage.py makemigrations
python manage.py migrate
npm run build
python manage.py collectstatic --noinput
pip freeze > requirements.txt
yapf . --recursive -i
if python manage.py test -p *_test.py; then
  git add -A
  git commit -m "$1"
  git push
fi