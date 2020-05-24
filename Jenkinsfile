pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'ls -la'
                dir('cosmos_django') {
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