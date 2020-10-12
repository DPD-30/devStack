echo start svn config
#htpass file need to be created
kubectl exec svn-svn-svn -t -- htpasswd -cb /etc/subversion/passwd svnadmin $(openssl rand -base64 12)
kubectl exec svn-svn-svn -t -- rm -rf /home/svn/lost\+found
kubectl exec svn-svn-svn -t -- svnadmin create /home/svn/caci
kubectl exec svn-svn-svn -t -- chmod -R 777 /home/svn
kubectl cp subversion-access-control svn-svn-svn:/etc/subversion/subversion-access-control

