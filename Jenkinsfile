pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    environment {
        // Tag injected from .env or default to latest
        IMAGE_TAG = 'latest'
        SERVICE_NAME = 'bienestar-app'
        IMAGE_NAME = "coldtemplar478/bienestar-app"
    }

    stages {
        stage('Checkout Infrastructure') {
            steps {
                // Checkout Infrastructure into a subdirectory for docker-compose.ecosystem.yml
                dir('infrastructure') {
                    git branch: 'main', url: 'https://github.com/c0ldtemplar/infrastructure.git', credentialsId: 'rocalian-dev'
                }
            }
        }

        stage('Configuration') {
            steps {
                script {
                    echo "🔧 Configuring Environment..."
                    sh "echo IMAGE_TAG=${IMAGE_TAG} > .env"
                    
                    // Inject Production Credentials
                    withCredentials([file(credentialsId: 'production-dotenv', variable: 'PROD_ENV_FILE')]) {
                        sh 'cat $PROD_ENV_FILE >> .env'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "🚀 Starting Deployment of Bienestar..."
                    
                    // 1. Pull from Local Registry (Raspberry Pi IP)
                    // Note: Ensure IMAGE_TAG matches what was pushed locally
                    sh "docker pull 192.168.4.7:5000/${IMAGE_NAME}:${IMAGE_TAG} || docker pull ${IMAGE_NAME}:${IMAGE_TAG}"

                    // 2. Restart and Deploy using shared infrastructure file
                    // Bienestar might be defined in ecosystem, if not we fallback to local compose. 
                    // But standard is ecosystem. Let's assume it's in ecosystem or we merge.
                    // For now, let's use the local docker-compose.prod.yml if specific, or ecosystem.
                    // The previous file used local compose. Let's stick to ecosystem for consistency if possible, 
                    // BUT checking the repo list, 'bienestar' is a separate app.
                    // Let's us the local docker-compose.prod.yml adjusted for image.
                    
                    echo "🔄 Updating Service..."
                    sh "docker stop ${SERVICE_NAME} || true"
                    sh "docker rm ${SERVICE_NAME} || true"
                    
                    // Using local compose but ensuring image points to registry? 
                    // Better to rely on the pull above and then run.
                    // User's previous compose file had 'image: coldtemplar478/bienestar-app:${IMAGE_TAG}'
                    // We need to override image to point to local registry if we are pulling from there?
                    // Or we just tag it locally.
                    
                    sh "docker tag 192.168.4.7:5000/${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:${IMAGE_TAG} || true"
                    
                    sh "docker compose -f docker-compose.prod.yml up -d"
                    
                    sh "docker image prune -f"
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed.'
        }
    }
}
