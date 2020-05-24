pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'ls -la'
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