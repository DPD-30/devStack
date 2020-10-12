. ../infrastucture/parameters.sh 
SERVICE_IP=$(kubectl get svc --namespace default greenmail-service --template "{{ range (index .status.loadBalancer.ingress 0) }}{{ . }}{{ end }}")
az network dns record-set a add-record -g $InfrastructureRG -z caci-challenge.us -n greenmail -a $SERVICE_IP

