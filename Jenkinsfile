pipeline {
    agent any
    
    environment {
        // --- CONFIGURACIÓN ESPECÍFICA PARA BIENESTAR ---
        PROJECT_ROOT = '/var/www/bienestar'
        INFRA_ROOT = '/var/www/infrastructure'
        // El puerto que definimos en docker-compose.ecosystem.yml
        APP_PORT = '3014' 
        // El nombre del servicio en docker-compose.ecosystem.yml
        SERVICE_NAME = 'bienestar-app'
    }
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        timestamps()
        timeout(time: 20, unit: 'MINUTES')
        disableConcurrentBuilds()
    }
    
    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_COMMIT_SHORT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                }
                echo "🚀 Iniciando despliegue de Bienestar (Commit: ${env.GIT_COMMIT_SHORT})"
            }
        }
        
        stage('Update Source Code') {
            steps {
                script {
                    echo "🔄 Sincronizando código fuente con ${PROJECT_ROOT}..."
                    
                    // Usamos rsync seguro (-rlv)
                    sh """
                        rsync -rlv --checksum --no-perms --no-owner --no-group \\
                        --exclude='.git' \\
                        --exclude='node_modules' \\
                        --exclude='.next' \\
                        --exclude='.env*' \\
                        --exclude='test-results' \\
                        ./ ${PROJECT_ROOT}/
                    """
                }
            }
        }

        stage('Approval for Production') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    input message: "Desplegar Bienestar a Producción?", ok: '🚀 Deploy'
                }
            }
        }
        
        stage('Deploy to Production') {
            steps {
                script {
                    echo "🐳 Reconstruyendo contenedor ${SERVICE_NAME}..."
                    dir(INFRA_ROOT) {
                        // Despliegue específico para bienestar-app
                        // --no-deps evita reiniciar bases de datos u otros servicios
                        sh """
                            docker compose -f docker-compose.ecosystem.yml up -d --no-deps --build --force-recreate ${SERVICE_NAME}
                            docker image prune -f
                        """
                    }
                }
            }
        }
        
        stage('Health Check') {
            steps {
                echo "⏳ Esperando 20 segundos a que la app inicie..."
                sleep 20 
                script {
                    // Validamos contra el puerto 3014
                    def status = sh(script: "curl -s -o /dev/null -w '%{http_code}' http://localhost:${APP_PORT} || echo '000'", returnStdout: true).trim()
                    
                    echo "Status recibido: ${status}"
                    
                    if (status == '200' || status == '307' || status == '308') {
                        echo "✅ Bienestar está VIVO en el puerto ${APP_PORT}."
                    } else {
                        echo "⚠️ Alerta: Health Check devolvió ${status}. Revisa logs con 'docker logs ${SERVICE_NAME}'"
                    }
                }
            }
        }
    }
    
    post {
        failure {
            echo '❌ El despliegue de Bienestar falló.'
        }
        success {
            echo '✅ Despliegue de Bienestar completado.'
        }
    }
}
