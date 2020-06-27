#!/bin/bash

# Script to get push ready by migrating, formatting, outputting static files,
# and running tests. Run without argument to simply build and test.
# Run with "<commit message>" to push to github.
python manage.py makemigrations
python manage.py migrate
npm run build
python manage.py collectstatic --noinput
pip freeze > requirements.txt
yapf . --recursive -i
prettier --debug-check frontend/src/*
prettier --write frontend/src/*
python manage.py test -p *_test.py
echo "All presubmit checks passed!"
cat .bird_asci_art.txt ; echo

if [ $# -gt 0 ]
  then
    git add -A
    git commit -m "$1"
    git push
fi