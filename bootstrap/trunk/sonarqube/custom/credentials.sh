. ../../private/env.sh
echo 'change Admin Password'
curl -X POST -v -u admin:admin "https://sonarqube.caci-challenge.us/api/users/change_password?login=admin&password=$SONAR_PASSWORD&previousPassword=admin"
echo 'svn connection'
curl -X POST -v -u admin:$SONAR_PASSWORD "https://sonarqube.caci-challenge.us/api/settings/set?key=sonar.svn.username&value=sonarqube"
curl -X POST -v -u admin:$SONAR_PASSWORD "https://sonarqube.caci-challenge.us/api/settings/set?key=sonar.svn.password.secured&value=$SONAR_PASSWORD"

