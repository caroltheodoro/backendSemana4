sudo -i
sudo apt-get update

#installs node
cd ~
curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install nodejs
sudo apt-get install build-essential

#installs nginx
sudo apt-get install nginx
sudo ufw allow 'Nginx Full'

#installs mongodb
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
sudo apt-get update
sudo apt-get install -y mongodb-org

#installs pm2 - process mananger for node
npm install pm2 -g

#installs dependencys for this project
npm install

#opens vim to configure the reverse proxy 
vim /etc/nginx/nginx.conf
