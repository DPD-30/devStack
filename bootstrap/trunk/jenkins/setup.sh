. ../private/env.sh
#createscript
kubectl apply -f jenkins-pvc.yaml
#kubectl create secret generic jenkins-admin --from-literal=jenkins-admin-user=admin --from-literal=jenkins-admin-password=$JENKINS_ADMINPASS
#helm install jenkins stable/jenkins -f values.yaml -f ../private/jenkins-securityrealm.yaml
helm repo add jenkinsci https://charts.jenkins.io
helm repo update
helm upgrade --install jenkins jenkinsci/jenkins --version="2.6.2" -f values.yaml -f ../private/jenkins-securityrealm.yaml

#echo $JENKINS_ADMINPASS
