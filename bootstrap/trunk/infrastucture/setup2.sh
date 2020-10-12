echo "setup azure ad admin for database."
id=$(az account show --query id --output tsv)
az sql server ad-admin create --display-name Daugherty --object-id $id --resource-group CACI-APP-CI-RG --server CACIDB-CI
az sql server ad-admin create --display-name Daugherty --object-id $id --resource-group CACI-APP-DEV-RG --server CACIDB-DEV
az sql server ad-admin create --display-name Daugherty --object-id $id --resource-group CACI-APP-TEST-RG --server CACIDB-TEST
az sql server ad-admin create --display-name Daugherty --object-id $id --resource-group CACI-APP-PROD-RG --server CACIDB-PROD
