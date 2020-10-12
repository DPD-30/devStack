. ./parameters.sh

while IFS="" read -r row || [ -n "$row" ]
do
  username=$(echo $row | cut -d ' ' -f1 )
  access=$(echo $row | cut -d ' ' -f2 )

az role assignment create --role "$access" --assignee $username --resource-group $APPCIrg
az role assignment create --role "$access" --assignee $username --resource-group $APPDEVrg
az role assignment create --role "$access" --assignee $username --resource-group $APPTESTrg
az role assignment create --role "$access" --assignee $username --resource-group $APPPRODrg
az role assignment create --role "$access" --assignee $username --resource-group $InfrastructureRG
az keyvault set-policy --name $InfrastructureVault --resource-group $InfrastructureRG --object-id $username --secret-permissions get list --key-permissions get list --certificate-permissions get list

done < ../private/azureusers.txt

while IFS="" read -r row || [ -n "$row" ]
do
   IP=$(echo $row | cut -d ' ' -f1 )
  name=$(echo $row | cut -d ' ' -f2 )
  az sql server firewall-rule create -g $APPDEVrg -s cacidb-dev -n $name --start-ip-address $IP --end-ip-address $IP
done < ../private/useripaddress.txt

#todo aks security needs to include 0.0.0.0/32 for jenkins 
#az aks update --resource-group $AKSrg --name CACI-AKS-CICDtemp --api-server-authorized-ip-ranges  71.255.234.17 73.135.111.150 50.193.140.126