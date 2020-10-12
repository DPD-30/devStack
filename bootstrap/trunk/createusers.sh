. ./infrastucture/parameters.sh
. ./private/env.sh
# account create loop
JENKINS_SERVERADDRESS="https://jenkins.caci-challenge.us/"
while IFS="" read -r row || [ -n "$row" ]
do
  username=$(echo $row | cut -d ' ' -f1 )
  email=$(echo $row | cut -d ' ' -f2 )
  name=$(echo $row | cut -d ' ' -f3-4 ) 
  password=$(echo $row | cut -d ' ' -f5 )
  
  #password=$(openssl rand -base64 12)
  #echo $row 
  #echo $username $email $name $password
  
  kubectl exec svn-svn-svn -t -- htpasswd -b /etc/subversion/passwd $username $password
  curl -X POST -v -u admin:$SONAR_PASSWORD --data-urlencode "password=$password" --data-urlencode "login=$username" --data-urlencode "password=$password" --data-urlencode "name=$name" --data-urlencode "email=$email" "http://sonarqube.caci-challenge.us/api/users/create"
  
  echo jenkins.model.Jenkins.instance.securityRealm.createAccount\(\"$username\", \"$password\"\) | java -jar ./jenkins/jenkins-cli.jar -auth $JENKINS_ADMINUSER:$JENKINS_ADMINPASS -s $JENKINS_SERVERADDRESS groovy =
  
  echo { \"name\": \"$username\", \"email\": \"$email\", \"password\": \"$password\", \"admin\": true, \"profileUpdatable\": true,  \"disableUIAccess\": false,  \"internalPasswordDisabled\": false,  \"groups\": [\"readers\"],  \"watchManager\": false,  \"policyManager\": false} > private/artuser.json
  jfrog rt curl --server-id caci -XPUT api/security/users/$username -d @private/artuser.json -H 'Content-Type: application/json'
  curl -X POST -v -u admin:$SONAR_PASSWORD "https://sonarqube.caci-challenge.us/api/users/create?login=$username&password=$password&email=$email" --data-urlencode "name=$name"
done < private/users.txt