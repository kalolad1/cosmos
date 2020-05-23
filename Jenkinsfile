#!groovy

node {
    try {
        stage 'Checkout'
            checkout scm

        stage 'Test'
            sh '. cosmos_django/test.sh'

        stage 'Deploy'
            sh 'chmod +x ./deploy_to_prod.sh'
            sh './deploy_to_prod.sh'
    }
    catch (err) {
        echo 'The build was unsuccessful.'
    }
}