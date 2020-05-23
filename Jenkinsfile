#!groovy

node {
    try {
        stage 'Checkout'
            sh 'git clone https://kalolad1:Baps12345!@github.com/kalolad1/cosmos.git'

        stage 'Test'
            sh 'virtualenv venv -p python3.6'
            sh '. venv/bin/activate'
            sh 'venv/bin/pip install -r cosmos_django/requirements.txt'
            sh 'venv/bin/python3.6 cosmos_django/manage.py test -p *_test.py'

        stage 'Deploy'
            sh 'chmod +x ./deploy_to_prod.sh'
            sh './deploy_to_prod.sh'
    }
    catch (err) {
        echo 'The build was unsuccessful.'
    }
}