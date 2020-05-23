#!/bin/bash

ssh cosmos_deploy_user@167.99.154.182 <<EOF
  cd cosmos/cosmos_django
  source venv/bin/activate
  git pull
  pip install -r requirements.txt
  python manage.py makemigrations
  python manage.py migrate
  python manage.py collectstatic --noinput
  echo "Qd7#f_eMYL6ZyTU" | sudo -S systemctl restart gunicorn
  exit
EOF