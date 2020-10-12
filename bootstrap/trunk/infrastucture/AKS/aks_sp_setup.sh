. ../parameters.sh
. ../../private/env.sh
#create Secret for Service Princaple to be used with AKS
echo 'start creating SP credentials and store in vault.'
#az ad app credential reset --append --credential-description 'AKS_access' --id $SP_Client_ID --password $SP_password >> /dev/null
az keyvault secret set --name AKS-SP-Secret --vault-name $InfrastructureVault --description "AKS service principle client secret" --value $SP_password >> /dev/null
SP_password=''

#save the vault info for use by arm template later.
export InfrastructureVault_ID=$(az resource show -g $InfrastructureRG --resource-type 'Microsoft.KeyVault/vaults' -n $InfrastructureVault --query [id] --output tsv)
echo  "{\"\$schema\": \"https://schema.management.azure.com/schemas/2019-04-01/deploymentParameters.json#\",\"contentVersion\": \"1.0.0.0\",\"parameters\": {\"ADAppKey\": {\"reference\": {\"keyVault\": {\"id\": \"$InfrastructureVault_ID\"},\"secretName\": \"AKS-SP-Secret\"}}}}" > ../../../../azureInfrastructure/trunk/api/spvaultparam.json

echo 'SP cred set and stored in vault'

