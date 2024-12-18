pipeline {
    agent { label 'window' } // Specify a Windows agent
    tools {
        nodejs 'nodejs' // Use the Node.js installation configured in Jenkins
    }
    options {
        buildDiscarder(logRotator(numToKeepStr: '5')) // Retain only the last 5 builds
    }

    environment {
        SONARQUBE_ENV = 'sonar' // SonarQube configuration name in Jenkins
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main',
                    url: 'https://github.com/MED-zh/JENKIS.git',
                    credentialsId: 'github-token'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
            }
        }

        stage('SonarQube Scan') {
            steps {
                echo 'Running SonarQube Scan...'
                withSonarQubeEnv(SONARQUBE_ENV) {
                    bat 'mvn clean org.sonarsource.scanner.maven:sonar-maven-plugin:3.9.0.2155:sonar'
                }
            }
        }

        stage('Build Application') {
            steps {
                echo 'Building the application...'
                bat 'npm run build'
            }
        }

       stage('Run Application') {
             steps {
                echo 'Running the application...'
                bat 'start npm start' // Starts the app in the background
                echo 'Application is running on http://localhost:3000'
         }
    }

    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
