cd svn
. ./setup2.sh
cd ..

cd sonarqube
. ./setup2.sh
cd ..

cd artifactory 
. ./setup2.sh
cd ..

. ./createusers.sh


cd greenmail
. ./setup2.sh
cd ..



cd jenkins
. ./setup2.sh
cd .. 

cd infrastucture/
. ./azureuseraccess.sh
. ./setup2.sh
cd ..
