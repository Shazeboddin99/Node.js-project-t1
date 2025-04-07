# Node.js App with Jenkins CI/CD Pipeline

This project demonstrates the use of a **Node.js** web application and automating its deployment using a **Jenkins** CI/CD pipeline.

### Features
- Node.js Web Application
- Automated testing
- Dockerized application
- Jenkins CI/CD pipeline
Step 3: Add GitHub Repository Link
Provide the URL of your GitHub repository so others can access it easily.


## GitHub Repository

Step 4: Add Jenkins CI/CD Pipeline Setup Instructions
Next, provide step-by-step instructions on how others can set up and use the Jenkins pipeline for this project.

## Jenkins CI/CD Pipeline Setup

### Prerequisites
Before setting up the pipeline, ensure that you have the following:
- A **Jenkins** server running (You can install Jenkins [here](https://www.jenkins.io/doc/book/installing/)).
- Docker installed and configured on your Jenkins server.
- A **DockerHub account** (for pushing images).
- A **GitHub** account and access to the repository.

### Steps to Set Up the Jenkins Pipeline

1. **Create a New Jenkins Job**:
   - Go to your Jenkins dashboard.
   - Click on **New Item**.
   - Select **Pipeline**.
   - Name your pipeline (e.g., `NodeJS-CI-CD`).
   - Click **OK**.

2. **Configure GitHub Repository**:
   - In the **Pipeline** section, select **Pipeline script from SCM**.
   - Choose **Git** as your SCM.
   - In the **Repository URL**, enter the GitHub URL of your project:  
     `https://github.com/yourusername/your-repository.git`
   - Select the **branch** as `main` (or the branch you are working with).

3. **Set Up DockerHub Credentials in Jenkins**:
   - In Jenkins, go to **Manage Jenkins** > **Manage Credentials** > **(Global or system)** > **Add Credentials**.
   - Add your **DockerHub credentials** (username and password or token).

4. **Create a `Jenkinsfile` in Your Repository**:
   - Create a `Jenkinsfile` in the root of your GitHub repository.
   - Copy and paste the following code into the `Jenkinsfile`:


pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'nodejs-app'
        DOCKER_USER = 'your-docker-username'
        GIT_REPO = 'https://github.com/yourusername/your-repository.git'
        DOCKERHUB_CREDENTIALS = 'dockerhub-creds'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: "${env.GIT_REPO}"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_USER}/${DOCKER_IMAGE}:${BUILD_ID}")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                        docker.image("${DOCKER_USER}/${DOCKER_IMAGE}:${BUILD_ID}").push()
                    }
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                script {
                    sh 'ssh user@your-server-ip "docker pull ${DOCKER_USER}/${DOCKER_IMAGE}:${BUILD_ID} && docker run -d -p 3000:3000 ${DOCKER_USER}/${DOCKER_IMAGE}:${BUILD_ID}"'
                }
            }
        }
    }

    post {
        success {
            echo 'The pipeline has completed successfully.'
        }
        failure {
            echo 'The pipeline has failed.'
        }
        always {
            echo 'Cleaning up resources or any other post-action logic.'
        }
    }
}
Trigger the Pipeline:
Now, whenever you push code changes to your GitHub repository (on the main branch), Jenkins will automatically trigger the pipeline and execute the steps defined in the Jenkinsfile.
You can monitor the pipeline's progress from the Jenkins dashboard.

Deploy the App:
If you've set up deployment to a remote server, Jenkins will automatically deploy the latest Docker image to your server after a successful build.

Step 5: Add Any Other Information
If there are any other specifics about your Node.js application, such as how to test or run the app locally, include that information.

## Running Locally
To run the Node.js application locally, follow these steps:

1. Clone the repository:
   
   git clone https://github.com/yourusername/your-repository.git
   cd your-repository
   
Install dependencies:

npm install
Start the server:

npm start
Open the app in your browser: Visit http://localhost:3000.

Running Docker Locally
If you want to run the app using Docker locally, follow these steps:
Build the Docker image:
docker build -t nodejs-app .
Run the container:
docker run -d -p 3000:3000 nodejs-app
Open the app in your browser: Visit http://localhost:3000.

---

# Node.js App with Jenkins CI/CD Pipeline

This project demonstrates the use of a **Node.js** web application and automating its deployment using a **Jenkins** CI/CD pipeline.

