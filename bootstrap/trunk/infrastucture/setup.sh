#set variables
. ./parameters.sh

#az group create --name $InfrastructureRG --location "USGovVirginia"
az group create --name $AKSrg --location "USGovVirginia"
az group create --name $APPCIrg --location "USGovVirginia"
az group create --name $APPDEVrg --location "USGovVirginia"
az group create --name $APPTESTrg --location "USGovVirginia"
az group create --name $APPPRODrg --location "USGovVirginia"

#create vault to manage infrastrucure passwords where needed. 
az keyvault create --resource-group $InfrastructureRG --name $InfrastructureVault --enabled-for-template-deployment  --location USGovVirginia
#sometimes need to wait for it to complete creations.  
az resource wait --resource-group $InfrastructureRG --name $InfrastructureVault --resource-type Microsoft.KeyVault/vaults --exists --created --interval 5

export InfrastructureVault_ID=$(az resource show -g $InfrastructureRG --resource-type 'Microsoft.KeyVault/vaults' -n $InfrastructureVault --query [id] --output tsv)
SP_password=$(. ../private/devdbpass.sh)

az keyvault secret set --name Dev-DB-Secret --vault-name $InfrastructureVault --description "DEV DB user=CACI_admin" --value $SP_password >> /dev/null
# setup paramater reference of the vault for when the DB gets created.  password is NOT in this file.  Only reference to the password.
echo  "{\"\$schema\": \"https://schema.management.azure.com/schemas/2019-04-01/deploymentParameters.json#\",\"contentVersion\": \"1.0.0.0\",\"parameters\": {\"sqlAdministratorLoginPassword\": {\"reference\": {\"keyVault\": {\"id\": \"$InfrastructureVault_ID\"},\"secretName\": \"Dev-DB-Secret\"} }}}" > ../private/temp/dev_vaultparam.json

SP_password=$(openssl rand -base64 48 | tr -d "=+/" | cut -c1-32)
az keyvault secret set --name CI-DB-Secret --vault-name $InfrastructureVault --description "CI DB user=CACI_admin" --value $SP_password >> /dev/null
# setup paramater reference of the vault for when the DB gets created.  password is NOT in this file.  Only reference to the password.
echo  "{\"\$schema\": \"https://schema.management.azure.com/schemas/2019-04-01/deploymentParameters.json#\",\"contentVersion\": \"1.0.0.0\",\"parameters\": {\"sqlAdministratorLoginPassword\": {\"reference\": {\"keyVault\": {\"id\": \"$InfrastructureVault_ID\"},\"secretName\": \"CI-DB-Secret\"} }}}" > ../private/temp/ci_vaultparam.json

SP_password=$(openssl rand -base64 48 | tr -d "=+/" | cut -c1-32)
az keyvault secret set --name TEST-DB-Secret --vault-name $InfrastructureVault --description "TEST DB user=CACI_admin" --value $SP_password >> /dev/null
# setup paramater reference of the vault for when the DB gets created.  password is NOT in this file.  Only reference to the password.
echo  "{\"\$schema\": \"https://schema.management.azure.com/schemas/2019-04-01/deploymentParameters.json#\",\"contentVersion\": \"1.0.0.0\",\"parameters\": {\"sqlAdministratorLoginPassword\": {\"reference\": {\"keyVault\": {\"id\": \"$InfrastructureVault_ID\"},\"secretName\": \"TEST-DB-Secret\"} }}}" > ../private/temp/test_vaultparam.json

SP_password=$(openssl rand -base64 48 | tr -d "=+/" | cut -c1-32)
az keyvault secret set --name PROD-DB-Secret --vault-name $InfrastructureVault --description "PROD DB user=CACI_admin" --value $SP_password >> /dev/null
# setup paramater reference of the vault for when the DB gets created.  password is NOT in this file.  Only reference to the password.
echo  "{\"\$schema\": \"https://schema.management.azure.com/schemas/2019-04-01/deploymentParameters.json#\",\"contentVersion\": \"1.0.0.0\",\"parameters\": {\"sqlAdministratorLoginPassword\": {\"reference\": {\"keyVault\": {\"id\": \"$InfrastructureVault_ID\"},\"secretName\": \"PROD-DB-Secret\"} }}}" > ../private/temp/prod_vaultparam.json

SP_password=''

#echo $InfrastructureVault
#echo $(az resource show -g $InfrastructureRG --resource-type 'Microsoft.KeyVault/vaults' -n $InfrastructureVault --query [id] --output tsv)

echo $InfrastructureVault_ID

cd AKS
. ./aks_sp_setup.sh
cd ..

az role assignment create --role "Contributor" --assignee $SP_Client_ID --resource-group $APPCIrg
az role assignment create --role "Contributor" --assignee $SP_Client_ID --resource-group $APPDEVrg
az role assignment create --role "Contributor" --assignee $SP_Client_ID --resource-group $APPTESTrg
az role assignment create --role "Contributor" --assignee $SP_Client_ID --resource-group $APPPRODrg
az role assignment create --role "Contributor" --assignee $SP_Client_ID --resource-group $InfrastructureRG



#az network dns zone create -g $InfrastructureRG -n caci-challenge.us 
az network dns record-set ns show --resource-group $InfrastructureRG --zone-name caci-challenge.us --name @

echo "Action Required: Modify NS records at registrar"
read -n1 -rsp $'Press any key to continue or Ctrl+C to exit...\n' 

cd AKS
. ./createcluster.sh
cd ..