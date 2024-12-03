pipeline {
 agent any
 
 environment {
 GIT_CREDENTIALS = 'github-token'
 SONARQUBE_CREDENTIALS = 'sonarqube-token'
 }
 stages {
     stage('Clone Repository') {
         steps {
         echo 'Cloning repository from GitHub...'
         git credentialsId: "${GIT_CREDENTIALS}", url: 'https://github.com/votreutilisateur/votre-repository.git'
        }
     }
 stage('Install Dependencies') {
             steps {
             echo 'Installing dependencies...'
             sh 'npm install'
             }
 }
 stage('Run Tests') {
         steps {
         echo 'Running tests...'
         sh 'npm test'
         }
 }
 stage('SonarQube Analysis') {
         steps {
         echo 'Running SonarQube analysis...'
         withCredentials([string(credentialsId: "${SONARQUBE_CREDENTIALS}", 
                variable: 'SONAR_TOKEN')]) {
                 sh 'sonar-scanner -Dsonar.projectKey=my-node-app -
                Dsonar.host.url=http://your-sonarqube-url -Dsonar.login=$SONAR_TOKEN'
                 }
         }
 }
 stage('Deploy Application') {
         steps {
         echo 'Deploying the application to the local directory...'
         sh 'mkdir -p /path/to/deployment/directory'
         sh 'cp -r * /path/to/deployment/directory/'
         }
 }
     stage('Run Application') {
         steps {
         echo 'Running the application...'
         sh 'node /path/to/deployment/directory/app.js'
         }
     }
 }
}
