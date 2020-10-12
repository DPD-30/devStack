echo 'infrastucture setup'
cd infrastucture
. ./setup.sh
echo 'infrastucture objects created'
cd .. 

echo 'begin setup for AKS'
echo 'setup ingress and cert for cicd'
cd ingress
. ./setup.sh
cd ..

cd svn
. ./setup.sh
cd ..

cd jenkins
. ./setup.sh
cd .. 

cd artifactory 
. ./setup.sh
cd ..

cd sonarqube
. ./setup.sh
cd ..

cd greenmail
. ./setup.sh
cd ..

cd seleniumHub
. ./setup.sh
cd ..

cd infrastucture
. ./setup_dev.sh
. ./azureuseraccess.sh
. ./setup_ci.sh
. ./setup_test.sh
. ./setup_prod.sh


cd ..
kubectl get pods
echo 'confirm that ARM Deployments have completed.'
#todo query deployment status's 
