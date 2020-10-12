. ./parameters.sh
echo 'setup the PROD Resource group with base services.'
az deployment group create --resource-group $APPPRODrg --name PROD_API --template-file ../../../azureInfrastructure/trunk/api/azuredeploy.json  --parameters @../../../azureInfrastructure/trunk/api/azuredeploy.parameters-prod.json --parameters @../../../azureInfrastructure/trunk/api/spvaultparam.json --parameters @../private/temp/prod_vaultparam.json
#az deployment group create --resource-group $APPPRODrg --name PROD_Function --template-file ../../../azureInfrastructure/trunk/functionapp/azuredeploy.json  --parameters @../../../azureInfrastructure/trunk/functionapp/azuredeploy.parameters-prod.json --no-wait

az deployment group create --resource-group $APPPRODrg --name PROD_WebApp --template-file ../../../azureInfrastructure/trunk/webapp/azuredeploy.json  --parameters @../../../azureInfrastructure/trunk/webapp/azuredeploy.parameters-prod.json 
az storage blob service-properties update --account-name cacichallenge --static-website --404-document error.html --index-document index.html
