pipeline {
    agent any
    
    environment {
        SONARQUBE_URL = 'http://localhost:9000'  // URL du serveur SonarQube
        SONARQUBE_SCANNER = 'SonarQube Scanner'  // Nom du scanner SonarQube configuré
    }

    stages {
        stage('Checkout') {
            steps {
                // Récupère le code depuis GitHub
                git url: 'https://github.com/utilisateur/nom-du-repo.git', branch: 'main'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                // Lancer l'analyse avec SonarQube
                withSonarQubeEnv('SonarQube Server') {
                    script {
                        sh "${env.SONARQUBE_SCANNER_HOME}/bin/sonar-scanner \
                            -Dsonar.projectKey=nom_du_projet \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=${env.SONARQUBE_URL} \
                            -Dsonar.login=${env.SONAR_AUTH_TOKEN}"
                    }
                }
            }
        }
        stage('Quality Gate') {
            steps {
                // Attendre que l'analyse SonarQube soit terminée et vérifier le Quality Gate
                timeout(time: 1, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
