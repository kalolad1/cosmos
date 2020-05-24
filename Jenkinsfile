pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'ls'
                dir('cosmos_django') {
                    sh 'ls'
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