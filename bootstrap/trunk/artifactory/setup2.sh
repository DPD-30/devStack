. ../private/env.sh
jfrog rt c caci --url=https://artifactory.caci-challenge.us/artifactory --user=admin --password=$ARTIFACTORY_PASSWORD --interactive=false
jfrog rt rc --server-id caci config/repo/CACI-BETA.json
jfrog rt rc --server-id caci config/repo/CACI-Release.json
jfrog rt rc --server-id caci config/repo/npm.json
jfrog rt rc --server-id caci config/repo/nuget.json
