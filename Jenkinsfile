pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                dir('cosmos/cosmos/cosmos_django'){
                    sh 'ls -la'
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}