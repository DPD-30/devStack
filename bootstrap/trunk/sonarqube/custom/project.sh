. ../../private/env.sh
. ../../private/jenkins/Sonartoken.sh
echo "setup projects"
curl -X POST -v -u admin:$SONAR_PASSWORD "https://sonarqube.caci-challenge.us/api/projects/create?name=CACI-UI&project=CACI-UI"
curl -X POST -v -u admin:$SONAR_PASSWORD "https://sonarqube.caci-challenge.us/api/projects/create?name=CACI-API&project=CACI-API"
echo "setup webhooks"
curl -X POST -v -u admin:$SONAR_PASSWORD "https://sonarqube.caci-challenge.us/api/webhooks/create?name=jenkins&project=CACI-UI&secret=$TOKEN&url=https%3A%2F%2Fjenkins.caci-challenge.us%2F%2Fsonarqube-webhook%2F"
curl -X POST -v -u admin:$SONAR_PASSWORD "https://sonarqube.caci-challenge.us/api/webhooks/create?name=jenkins&project=CACI-API&secret=$TOKEN&url=https%3A%2F%2Fjenkins.caci-challenge.us%2F%2Fsonarqube-webhook%2F"
