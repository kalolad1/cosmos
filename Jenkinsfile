pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                dir('cosmos/cosmos/cosmos_django'){
                    sh 'pwd'
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