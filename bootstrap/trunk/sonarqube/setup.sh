helm repo add oteemo https://oteemo.github.io/charts/
helm repo update 
export postgres=$(openssl rand -hex 32)
kubectl create secret generic sonar-postgres-admin --from-literal=postgresql-password=$postgres
export postgres=''
kubectl apply -f sonar-pvc.yaml
kubectl apply -f sonardb-pvc.yaml
helm install sonarqube  oteemo/sonarqube --version 6.6.0 -f values.yaml 


