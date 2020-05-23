#!groovy

node {
    try {
        stage 'Deploy'
            sh 'chmod +x ./deploy_to_prod.sh'
            sh './deploy_to_prod.sh'
    }
    catch (err) {
        echo 'The build was unsuccessful.'
    }
}