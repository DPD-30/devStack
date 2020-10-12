. ./parameters.sh
echo 'setup the CI Resource group with base services.'
az deployment group create --resource-group $APPCIrg --name CI_API --template-file ../../../azureInfrastructure/trunk/api/azuredeploy.json  --parameters @../../../azureInfrastructure/trunk/api/azuredeploy.parameters-ci.json --parameters @../../../azureInfrastructure/trunk/api/spvaultparam.json --parameters @../private/temp/ci_vaultparam.json --no-wait
#az deployment group create --resource-group $APPCIrg --name CI_Function --template-file ../code/challenge/azureInfrastructure/functionapp/azuredeploy.json  --parameters @../../../azureInfrastructure/trunk/functionapp/azuredeploy.parameters-ci.json --no-wait

az deployment group create --resource-group $APPCIrg --name CI_WebApp --template-file ../../../azureInfrastructure/trunk/webapp/azuredeploy.json  --parameters @../../../azureInfrastructure/trunk/webapp/azuredeploy.parameters-ci.json
az storage blob service-properties update --account-name cacichallengeci --static-website --404-document error.html --index-document index.html
