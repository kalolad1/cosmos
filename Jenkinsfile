#!groovy

node {
    try {
        stage 'Deploy'
            sh 'chmod +x ./cosmos_django/deploy_to_prod.sh'
            sh './cosmos_django/deploy_to_prod.sh'
    }
    catch (err) {
        echo 'The build was unsuccessful.'
    }
}