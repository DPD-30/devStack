. ../private/env.sh

helm repo add center https://repo.chartcenter.io
helm repo update
export join=$(openssl rand -hex 32)
kubectl create secret generic jfrog-join-key --from-literal=join-key=$join
kubectl create secret generic artifactory-license --from-file=../private/art.lic
#kubectl create secret generic artifactory-admin --from-literal=admin-password=$ARTIFACTORY_PASSWORD
export join=''
kubectl apply -f art-pvc.yaml
helm upgrade --install artifactory center/jfrog/artifactory --version="11.0.0" -f values.yaml -f ../private/art-creds.yaml 