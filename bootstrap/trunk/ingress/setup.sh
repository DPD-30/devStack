. ../infrastucture/parameters.sh 

# this script sets up ingress trafic controler for AKS and TLS certficates thru Lets Encrypt.

# setup static IP address for inbound traffic
aks_mc_rg=$(az aks show --resource-group $AKSrg --name $AKS_Cluster --query nodeResourceGroup -o tsv)
export aks_public_ip=$(az network public-ip create --resource-group $aks_mc_rg --name caciAKSPublicIP --sku standard --allocation-method static --dns-name caci-challenge-aks --query publicIp.ipAddress -o tsv)

# create DNS entries for all CICD Services 
az network dns record-set cname set-record -g $InfrastructureRG -z caci-challenge.us -n sonarqube -c caci-challenge-aks.usgovvirginia.cloudapp.usgovcloudapi.net
az network dns record-set cname set-record -g $InfrastructureRG -z caci-challenge.us -n jenkins -c caci-challenge-aks.usgovvirginia.cloudapp.usgovcloudapi.net
az network dns record-set cname set-record -g $InfrastructureRG -z caci-challenge.us -n svn -c caci-challenge-aks.usgovvirginia.cloudapp.usgovcloudapi.net
az network dns record-set cname set-record -g $InfrastructureRG -z caci-challenge.us -n artifactory -c caci-challenge-aks.usgovvirginia.cloudapp.usgovcloudapi.net

# add repos for Nginx ingress and LetEncrypt Cert manager
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
# helm repo add jetstack https://charts.jetstack.io
helm repo update

#install cert 
kubectl apply -f ../private/cacicert.yaml

#install nginx ingress manager
helm install --wait nginx-ingress ingress-nginx/ingress-nginx --version "2.15.0" --set controller.service.loadBalancerIP=$aks_public_ip -f values.yaml   



# Label the cert-manager namespace to disable resource validation
#kubectl label namespace default cert-manager.io/disable-validation=true


#install let encrypt cert manager
#helm install --wait  cert-manager   --version v0.16.1   --set installCRDs=true   --set nodeSelector."beta\.kubernetes\.io/os"=linux jetstack/cert-manager 

#create cluster issuer and default cert. 
#kubectl apply -f cert-manager.yaml 
#kubectl apply -f cert.yaml
