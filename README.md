## REBIOMA MAPS

* Maps of lemur richness and species lists 
* Created for [REBIOMA](http://data.rebioma.net), a joint project of WCS-Madagascar and UC Berkeley
* Built with Ruby, Rails, Javasript, Jquery, Postgresql, CartoDB, and Heroku

## Live version
[http://maps.rebioma.net](http://maps.rebioma.net)

## Installation
1. Clone the project
```
git clone https://github.com/tomay/rebmaps3.git
```

2. cd into the project and bundle
```
bundle install
```

3. Unzip and untar data in db/seed-data
```
cd db/seed-data
gzip rebmaps3_data.tar.gz
tar xvf rebmaps3_data.tar

4. Migrate the database
``` 
rake db:migrate
```

5. Start the server and open localhost:3000
```
rails s
```
