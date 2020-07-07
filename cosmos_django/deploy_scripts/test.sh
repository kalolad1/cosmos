#!/bin/bash
set -e

ssh jenkins@161.35.102.77 <<EOF
  function alertFailure {
    echo "Testing has failed!"
  }

  function alertSuccess {
    echo "Testing has succeeded!"
  }
  set -e
  trap alertFailure ERR
  cd cosmos_cloned/cosmos_django; echo $?
  source venv/bin/activate; echo $?
  git pull; echo $?
  echo "%*rmLDpi9cs&T3e" | sudo -S npm ci; echo $?
  npm run build; echo $?
  pip3 install -r requirements.txt; echo $?
  venv/bin/python3.6 manage.py makemigrations; echo $?
  venv/bin/python3.6 manage.py migrate; echo $?
  venv/bin/python3.6 manage.py collectstatic --noinput; echo $?
  venv/bin/python3.6 manage.py test -p *_test.py; echo $?
  exit 0
EOF
exit 0