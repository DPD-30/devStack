mkdir db
mkdir api
mkdir ui
mkdir selenium

cd ui
svn checkout https://svn.caci-challenge.us/svn/caci/challenge/ui/trunk .
cd..

cd api
svn checkout https://svn.caci-challenge.us/svn/caci/challenge/api/trunk .
cd..

cd db
svn checkout https://svn.caci-challenge.us/svn/caci/challenge/db/trunk .
cd..

cd db
svn checkout https://svn.caci-challenge.us/svn/caci/challenge/selenium/trunk .
cd..

cd ui
npm install
cd..

pause
