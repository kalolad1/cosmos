#!/bin/bash
set -e
# Script to get push ready by migrating, formatting, outputting static files,
# and running tests.

NO_COLOR='\033[0m'

function alertFailure {
  RED='\033[0;31m'
  echo "${RED}Presubmit has failed!${NO_COLOR}"
}

function alertSuccess {
  GREEN='\033[0;32m'
  echo "${GREEN}Presubmit has succeeded!"
  cat .bird_asci_art.txt ; echo "${NO_COLOR}"
}

trap alertFailure ERR
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput
pip freeze > requirements.txt
yapf . --recursive -i
prettier --debug-check frontend/src/*
prettier --write frontend/src/*
eslint frontend/src/actions/action_creators/allergy_action_creators.ts --max-warnings 0
npm test
python manage.py test -p *_test.py
alertSuccess
