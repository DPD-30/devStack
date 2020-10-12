#! /usr/bin/pwsh
param(
    [string]
    $password,
    [string]
    $user,
    [string]
    $tenant,
    [string]
    $parameterFilename,
    [string]
    $resourcegroupname,
    [string]
    $storageaccountname,
    [string]
    $vaultitem

)
$ErrorActionPreference = "Stop"
Install-Module -Name Az -AllowClobber -Scope CurrentUser -force
import-module -name az 

$userPassword = ConvertTo-SecureString -String $Password -AsPlainText -Force
$pscredential = New-Object -TypeName System.Management.Automation.PSCredential($user,$userPassword)
Connect-AzAccount -EnvironmentName AzureUSGovernment -ServicePrincipal -Credential $pscredential -Tenant $tenant

echo deploy web api and db infrastructure
$vaultinfo = get-azresource -resourcegroupname CACI-Infrastructure-RG -resourcetype 'Microsoft.KeyVault/vaults'
echo  "`{`"`$schema`": `"https://schema.management.azure.com/schemas/2019-04-01/deploymentParameters.json#`",`"contentVersion`": `"1.0.0.0`",`"parameters`": {`"sqlAdministratorLoginPassword`": {`"reference`": {`"keyVault`": {`"id`": `"$($vaultinfo.ID)`"},`"secretName`": `"$($vaultitem)`"} }}}" > vaultparam.json

New-AzResourceGroupDeployment -name webapidb -resourcegroupname $resourcegroupname -TemplateFile "$pwd/api/azuredeploy.json" -templateparameterfile "$pwd/api/$parameterFilename" -templateparameterfile "$pwd/vaultparam.json" -sqlAdministratorLoginPassword= '{"reference": {"keyVault": {"id": "/subscriptions/329e2697-3054-4611-a1c4-94ee18941cd7/resourceGroups/CACI-Infrastructure-RG/providers/Microsoft.KeyVault/vaults/Infrastructure-Vault37"},"secretName": "CI-DB-Secret"}}'

echo deploy storage account website infrastructure
New-AzResourceGroupDeployment -name webfrontend -resourcegroupname $resourcegroupname -TemplateFile "$pwd/webapp/azuredeploy.json" -templateparameterfile "$pwd/webapp/$parameterFilename"

$storageAccount = Get-AzStorageAccount -ResourceGroupName $resourcegroupname -AccountName "$storageaccountname"
$ctx = $storageAccount.Context

Enable-AzStorageStaticWebsite -Context $ctx -IndexDocument index.html -ErrorDocument404Path error.html

#New-AzResourceGroupDeployment -name apimgt -resourcegroupname $resourcegroupname -TemplateFile "$pwd/api-mgt/azuredeploy.json" -templateparameterfile "$pwd/api-mgt/$parameterFilename"