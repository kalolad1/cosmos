#!groovy

node {
    try {
        stage 'Checkout'
            checkout scm

        stage 'Test'
            sh 'cd cosmos_django'
            sh 'virtualenv venv -p python3.6'
            sh '. venv/bin/activate'
            sh 'venv/bin/pip install -r requirements.txt'
            sh 'venv/bin/python3.6 manage.py test -p *_test.py'

        stage 'Deploy'
            sh 'chmod +x ./deploy_to_prod.sh'
            sh './deploy_to_prod.sh'
    }
    catch (err) {
        echo 'The build was unsuccessful.'
    }
}