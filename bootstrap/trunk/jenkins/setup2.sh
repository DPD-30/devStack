#!/bin/bash
#jenkins user setup

JENKINS_SERVERADDRESS=https://jenkins.caci-challenge.us/

. ../private/env.sh
. ../infrastucture/parameters.sh

. ../private/jenkins/createSonarToken.sh
cd ../private/jenkins/
. ./allstorageaccount.sh
. ./azuresp.sh
SP_password=$(az keyvault secret show --name Dev-DB-Secret --vault-name $InfrastructureVault --query [value] -o tsv)
. ./db_secret.sh DB_DEV $SP_password
SP_password=$(az keyvault secret show --name CI-DB-Secret --vault-name $InfrastructureVault --query [value] -o tsv)
. ./db_secret.sh DB_CI $SP_password
SP_password=$(az keyvault secret show --name TEST-DB-Secret --vault-name $InfrastructureVault --query [value] -o tsv)
. ./db_secret.sh DB_TEST $SP_password
SP_password=$(az keyvault secret show --name PROD-DB-Secret --vault-name $InfrastructureVault --query [value] -o tsv)
. ./db_secret.sh DB_PROD $SP_password
SP_password=''
cd ../../jenkins/

echo 'create creds'
java -jar jenkins-cli.jar -auth $JENKINS_ADMINUSER:$JENKINS_ADMINPASS -s $JENKINS_SERVERADDRESS create-credentials-by-xml system::system::jenkins _  < ../private/jenkins/Artifactory.xml
java -jar jenkins-cli.jar -auth $JENKINS_ADMINUSER:$JENKINS_ADMINPASS -s $JENKINS_SERVERADDRESS create-credentials-by-xml system::system::jenkins _  < ../private/jenkins/SonarQube.xml
java -jar jenkins-cli.jar -auth $JENKINS_ADMINUSER:$JENKINS_ADMINPASS -s $JENKINS_SERVERADDRESS create-credentials-by-xml system::system::jenkins _  < ../private/jenkins/SVN.xml
java -jar jenkins-cli.jar -auth $JENKINS_ADMINUSER:$JENKINS_ADMINPASS -s $JENKINS_SERVERADDRESS create-credentials-by-xml system::system::jenkins _  < ../private/jenkins/Storagekeycacichallenge.xml
java -jar jenkins-cli.jar -auth $JENKINS_ADMINUSER:$JENKINS_ADMINPASS -s $JENKINS_SERVERADDRESS create-credentials-by-xml system::system::jenkins _  < ../private/jenkins/Storagekeycacichallengeci.xml
java -jar jenkins-cli.jar -auth $JENKINS_ADMINUSER:$JENKINS_ADMINPASS -s $JENKINS_SERVERADDRESS create-credentials-by-xml system::system::jenkins _  < ../private/jenkins/Storagekeycacichallengedev.xml
java -jar jenkins-cli.jar -auth $JENKINS_ADMINUSER:$JENKINS_ADMINPASS -s $JENKINS_SERVERADDRESS create-credentials-by-xml system::system::jenkins _  < ../private/jenkins/Storagekeycacichallengetest.xml
java -jar jenkins-cli.jar -auth $JENKINS_ADMINUSER:$JENKINS_ADMINPASS -s $JENKINS_SERVERADDRESS create-credentials-by-xml system::system::jenkins _  < ../private/jenkins/azuresp.xml
java -jar jenkins-cli.jar -auth $JENKINS_ADMINUSER:$JENKINS_ADMINPASS -s $JENKINS_SERVERADDRESS create-credentials-by-xml system::system::jenkins _  < ../private/jenkins/db_DB_CI.xml
java -jar jenkins-cli.jar -auth $JENKINS_ADMINUSER:$JENKINS_ADMINPASS -s $JENKINS_SERVERADDRESS create-credentials-by-xml system::system::jenkins _  < ../private/jenkins/db_DB_TEST.xml
java -jar jenkins-cli.jar -auth $JENKINS_ADMINUSER:$JENKINS_ADMINPASS -s $JENKINS_SERVERADDRESS create-credentials-by-xml system::system::jenkins _  < ../private/jenkins/db_DB_DEV.xml
java -jar jenkins-cli.jar -auth $JENKINS_ADMINUSER:$JENKINS_ADMINPASS -s $JENKINS_SERVERADDRESS create-credentials-by-xml system::system::jenkins _  < ../private/jenkins/db_DB_PROD.xml

echo 'add jenkins to the DB allowed IP list'
aks_mc_rg=$(az aks show --resource-group $AKSrg --name $AKS_Cluster --query nodeResourceGroup -o tsv)
jenkins_ip=$(az network public-ip show --resource-group $aks_mc_rg --name caciAKSPublicIP --query ipAddress -o tsv)

az sql server firewall-rule create -g $APPCIrg -s cacidb-ci -n jenkins --start-ip-address $jenkins_ip --end-ip-address $jenkins_ip
az sql server firewall-rule create -g $APPTESTrg -s cacidb-test -n jenkins --start-ip-address $jenkins_ip --end-ip-address $jenkins_ip
az sql server firewall-rule create -g $APPPRODrg -s cacidb-prod -n jenkins --start-ip-address $jenkins_ip --end-ip-address $jenkins_ip
az sql server firewall-rule create -g $APPDEVrg -s cacidb-dev -n jenkins --start-ip-address $jenkins_ip --end-ip-address $jenkins_ip

echo 'create job'
java -jar jenkins-cli.jar -auth $JENKINS_ADMINUSER:$JENKINS_ADMINPASS -s $JENKINS_SERVERADDRESS create-job CACI < custom/job_config.xml
