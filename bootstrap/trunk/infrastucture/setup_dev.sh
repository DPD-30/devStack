. ./parameters.sh
echo 'setup the DEV Resource group with base services.'

az deployment group create --resource-group $APPDEVrg --name DEV_API --template-file ../../../azureInfrastructure/trunk/api/azuredeploy.json  --parameters @../../../azureInfrastructure/trunk/api/azuredeploy.parameters-dev.json --parameters @../../../azureInfrastructure/trunk/api/spvaultparam.json --parameters @../private/temp/dev_vaultparam.json
#az deployment group create --resource-group $APPDEVrg --name DEV_Function --template-file ../../../azureInfrastructure/trunk/functionapp/azuredeploy.json  --parameters @../../../azureInfrastructure/trunk/functionapp/azuredeploy.parameters-dev.json --no-wait

az deployment group create --resource-group $APPDEVrg --name DEV_WebApp --template-file ../../../azureInfrastructure/trunk/webapp/azuredeploy.json  --parameters @../../../azureInfrastructure/trunk/webapp/azuredeploy.parameters-dev.json 
az storage blob service-properties update --account-name cacichallengedev --static-website --404-document error.html --index-document index.html

