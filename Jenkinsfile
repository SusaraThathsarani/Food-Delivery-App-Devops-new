pipeline {
  agent any

  environment {
    AWS_ACCESS_KEY_ID     = credentials('aws_access_key_id')
    AWS_SECRET_ACCESS_KEY = credentials('aws_secret_access_key')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Terraform Init & Plan') {
      steps {
        sh '''
          cd terraform
          terraform init
          terraform plan \
            -var="access_key=$AWS_ACCESS_KEY_ID" \
            -var="secret_key=$AWS_SECRET_ACCESS_KEY"
        '''
      }
    }

    stage('Terraform Apply') {
      steps {
        sh '''
          cd terraform
          terraform apply -auto-approve \
            -var="access_key=$AWS_ACCESS_KEY_ID" \
            -var="secret_key=$AWS_SECRET_ACCESS_KEY"
        '''
      }
    }
  }

  post {
    success {
      echo 'Terraform provisioning completed successfully!'
    }
    failure {
      echo 'Terraform provisioning failed.'
    }
  }
}
