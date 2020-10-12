This component is responsible for initializing the Azure environment. 
Creation of resource groups and azure services are handeled by this component.  
It also makes use of the azureInfrastructurue component in this same project.  

To make use of this component you will need to adjust the following:
  infrastructurue/paramaters.sh
  private/**  temporaraly set passwords, licenes and keys in files for bootstrap opperation.  
  *** DO NOT commit these to a code repository.  They are used for bootstrap operation ONCE and then deleted. *** 
  *** revert codebase after use.  ***

Services created by this component.

    Azure Key Vault - used to securely store secrets and passwords for the various components.
    Azure DNS - used to establish the URLs for the CI/CD pipeline
    Azure Kubernetes servcies - Host the CI/CD applications
        Jenkins
        Subversion
        Artifactory
        SonarQube
        Greenmail
        Selnium Hub
    The following 4 application environments are also established in Azure resource grouops
        Continous Integration (CI) - this is where the CI build pipeline initial deploy
        Development (Dev) - this is where developers, tester and UI/UX member do inital verification of the application.
        Test - First step of the Deliver pileline 