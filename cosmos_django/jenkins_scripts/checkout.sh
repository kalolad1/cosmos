#!/bin/bash

ssh jenkins@161.35.102.77 <<EOF
  ls
  cd cosmos/cosmos_django
  exit
EOF