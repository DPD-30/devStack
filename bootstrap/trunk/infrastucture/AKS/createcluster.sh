. ../parameters.sh
# create parameter reference to keyvault for credentials
export InfrastructureVault_ID=$(az resource show -g $InfrastructureRG --resource-type 'Microsoft.KeyVault/vaults' -n $InfrastructureVault --query [id] --output tsv)
echo  "{\"\$schema\": \"https://schema.management.azure.com/schemas/2019-04-01/deploymentParameters.json#\",\"contentVersion\": \"1.0.0.0\",\"parameters\": {\"servicePrincipalClientSecret\": {\"reference\": {\"keyVault\": {\"id\": \"$InfrastructureVault_ID\"},\"secretName\": \"AKS-SP-Secret\"}},\"servicePrincipalClientId\": { \"value\": \"$SP_Client_ID\"} }}" > vaultparam.json

#az deployment group create --resource-group $AKSrg --name CACI-AKS-CICD --template-uri https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/101-aks/azuredeploy.json --parameters @aks.parameters.json --parameters @vaultparam.json
az deployment group create --resource-group $AKSrg --name CACI-AKS-CICD --template-file aks-azuredeploy.json --parameters @aks.parameters.json --parameters @vaultparam.json 
az aks get-credentials --resource-group $AKSrg --name CACI-AKS-CICD
