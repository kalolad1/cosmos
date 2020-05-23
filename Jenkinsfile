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

ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDXU0lF3eN0XNIvRuvGZ13OjBzYNteZ2OcS5GGzJN+TzKuAgTSEUvNrDFFBBJpSfISFNtf6cRWBHkcxsPJGlRPjDgKq+kYrc0UC3D1pwtGqXGLql42kVyfeNmtyNjy8SuQWTq8dMwp7kC7zFwIi9HKKq5qCOameSfGU9PsEg4uxY2XyDTz8OFK5emy39IKuGbjWeCgNHV0fBjgxAMfb1QLivKLdgmN6XlwUDlsasswhtcjK8wSSWrbQhliSU1Oqww4kWGxnSjFTj8DBDkR1nrvX6zgkQQN1o40frmqYlp2q67LcSrIXZ6TnRwSze1kv2/NuX+ZEd8g93Vb69ieSqd5f jenkins@cosmos-build-server

ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDXU0lF3eN0XNIvRuvGZ13OjBzYNteZ2OcS5GGzJN+TzKuAgTSEUvNrDFFBBJpSfISFNtf6cRWBHkcxsPJGlRPjDgKq+kYrc0UC3D1pwtGqXGLql42kVyfeNmtyNjy8SuQWTq8dMwp7kC7zFwIi9HKKq5qCOameSfGU9PsEg4uxY2XyDTz8OFK5emy39IKuGbjWeCgNHV0fBjgxAMfb1QLivKLdgmN6XlwUDlsasswhtcjK8wSSWrbQhliSU1Oqww4kWGxnSjFTj8DBDkR1nrvX6zgkQQN1o40frmqYlp2q67LcSrIXZ6TnRwSze1kv2/NuX+ZEd8g93Vb69ieSqd5f jenkins@cosmos-build-server
