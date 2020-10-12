. ./parameters.sh
echo 'setup the TEST Resource group with base services.'
az deployment group create --resource-group $APPTESTrg --name TEST_API --template-file ../../../azureInfrastructure/trunk/api/azuredeploy.json  --parameters @../../../azureInfrastructure/trunk/api/azuredeploy.parameters-test.json --parameters @../../../azureInfrastructure/trunk/api/spvaultparam.json --parameters @../private/temp/test_vaultparam.json --no-wait
#az deployment group create --resource-group $APPTESTrg --name TEST_Function --template-file ../../../azureInfrastructure/trunk/functionapp/azuredeploy.json  --parameters @../../../azureInfrastructure/trunk/functionapp/azuredeploy.parameters-test.json --no-wait

az deployment group create --resource-group $APPTESTrg --name TEST_WebApp --template-file ../../../azureInfrastructure/trunk/webapp/azuredeploy.json  --parameters @../../../azureInfrastructure/trunk/webapp/azuredeploy.parameters-test.json 
az storage blob service-properties update --account-name cacichallengetest --static-website --404-document error.html --index-document index.html
