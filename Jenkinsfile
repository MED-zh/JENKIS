pipeline {
    agent any

    environment {
        SONARQUBE_URL = 'http://localhost:9000'
        SONARQUBE_SCANNER = 'SonarQube Scanner'  // Nom du scanner SonarQube configuré
        SONAR_AUTH_TOKEN = credentials('TOKEN') // ID du token d’authentification Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                // Cloner le code depuis GitHub
                git url: 'https://github.com/MED-zh/JENKIS.git', branch: 'main'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube Server') {
                    sh "${env.SONARQUBE_SCANNER_HOME}/bin/sonar-scanner \
                        -Dsonar.projectKey=SN-test \
                        -Dsonar.projectName='SN-test' \
                        -Dsonar.projectVersion=1.0 \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=${env.SONARQUBE_URL} \
                        -Dsonar.login=${env.SONAR_AUTH_TOKEN}"
                }
            }
        }
        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
