pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                sh 'chmod +x ./cosmos_django/deploy_scripts/test.sh'
                sh './cosmos_django/deploy_scripts/test.sh'
            }
        }
        stage('Deploy') {
            steps {
                sh 'chmod +x ./cosmos_django/deploy_scripts/deploy.sh'
                sh './cosmos_django/deploy_scripts/deploy.sh'
            }
        }
    }
    post {
        success {
            emailext (
                subject: "Cosmos Deployment SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: "YEA BUDDY - SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]': Check console output at '${env.BUILD_URL}'",
                to: 'darshanvkalola@gmail.com',
                recipientProviders: [[$class: 'DevelopersRecipientProvider']]
            )
        }
        failure {
            emailext (
                subject: "Cosmos Deployment FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]': Check console output at '${env.BUILD_URL}'",
                to: 'darshanvkalola@gmail.com',
                recipientProviders: [[$class: 'DevelopersRecipientProvider']]
            )
        }
    }
}