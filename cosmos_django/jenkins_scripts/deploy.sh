#!/bin/bash

ssh cosmos_deploy_user@167.99.154.182 <<EOF
  cd cosmos/cosmos_django
  source venv/bin/activate
  git pull
  npm update
  npm run build
  pip3 install -r requirements.txt
  venv/bin/python3.6 manage.py makemigrations
  venv/bin/python3.6 manage.py migrate
  venv/bin/python3.6 manage.py collectstatic --noinput
  echo "Qd7#f_eMYL6ZyTU" | sudo -S systemctl restart gunicorn
  exit
EOF