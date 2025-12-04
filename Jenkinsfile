pipeline {
    agent any



    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install --legacy-peer-deps'
            }
        }

        stage('Test') {
            steps {
                script {
                    // Check if test script exists using node
                    def hasTestScript = sh(script: "node -e \"if (require('./package.json').scripts.test) process.exit(0); else process.exit(1);\"", returnStatus: true) == 0
                    
                    if (hasTestScript) {
                        try {
                            sh 'npm test'
                        } catch (Exception e) {
                            echo 'Tests failed'
                            currentBuild.result = 'UNSTABLE'
                        }
                    } else {
                        echo 'No test script found in package.json'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                // Run build if it exists
                script {
                    // Check if build script exists using node
                    def hasBuildScript = sh(script: "node -e \"if (require('./package.json').scripts.build) process.exit(0); else process.exit(1);\"", returnStatus: true) == 0
                    
                    if (hasBuildScript) {
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    def appName = 'bienestar-app'
                    def imageTag = "${appName}:${env.BUILD_NUMBER}"
                    
                    // Build locally
                    sh "docker build -t ${imageTag} ."
                    
                    // Tag as latest
                    sh "docker tag ${imageTag} ${appName}:latest"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Ensure external network exists
                    sh 'docker network create tea-network || true'
                    
                    if (fileExists('docker-compose.yml')) {
                        // Deploy using local image
                        sh 'docker compose up -d --build'
                        
                        // Prune old images to save space
                        sh 'docker image prune -f'
                    } else {
                        error 'docker-compose.yml not found'
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
