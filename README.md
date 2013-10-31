## REBIOMA MAPS

* Maps of lemur richness and species lists 
* Created for [REBIOMA](http://data.rebioma.net), a joint project of WCS-Madagascar and UC Berkeley
* Built with Ruby, Rails, Javasript, Jquery, Postgresql, CartoDB, and Heroku

This project shows a snapshot of biodiversity data derived from species distribution models hosted on the 
[REBIOMA data portal](http://data.rebioma.net). This is a prototype of mapping and data interaction tools 
we are working to integrate on top of the data portal.

We model species distributions for three eras from public and private occurrence data uploaded by many 
individuals and partner institutions.

After validation and review of the occurrence data by teams of taxonomic experts, we use MaxEnt to model 
species distributions from the database, using forest cover and WorldClim climate data for 2000, and 2100 
as predictors. For 2100, we use environmental data derived from two emissions scenarios, A2a and B2a. We then apply a presence threshold to each model, and use the result to build the map of species richness and a species list for each era, shown here. Richness and species lists are calculated on a 5x5 km grid.

REBIOMA is a joint project Wildlife Conservation Society Madagascar, and the University of California 
Berkeley with support from the MacArthur Foundation and the JRS Biodiversity Foundation. For more information, 
please see the [project page](http://rebioma.net), [data portal](http://data.rebioma.net), and 
[help pages](https://sites.google.com/site/rebiomahelp).

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

4. Create and then migrate the database
``` 
rake db:create
rake db:migrate
```

5. Start the server and open localhost:3000
```
rails s
```
