# Task Master 

## Live Application
1) https://jin-task-manager-e2e0e11982e2.herokuapp.com/login
2) Sign-Up if you haven't already, create an username like so: 
- Email: sample@example.com
- Password: computer098

## Installation
1) On the Terminal install all required node modules
- ```npm i```
2) cd into the ```task-manager-front``` folder
3) On the Terminal install all required node modules
- ```npm i```
4) cd backout to the api
- ```cd..```

## Configuration
1) Create a folder titled ```config```
2) Inside the ```config``` folder create a file titled ```.env``` and ```test.env```
- Inside the ```.env``` file incorporate the three varibales with proper values: ```PORT```, ```MONGODB_URL```, ```JWT_SECRET```
* ```PORT``` : assign the value to ```=``` a port number of your choice (Recommended : ```3000```)
* ```MONGODB_URL``` : assign the value to ```=``` a local mongodb url or to a mongoose cluster url for data storage
* ```JWT_SECRET``` : assign the value with ```=``` a random structure of your choice to ensure proper data encryption
- Inside the ```test.env``` file incorporate the three varibales with proper values: ```PORT```, ```MONGODB_URL```, ```JWT_SECRET```
3) In the terminal ```cd``` into the ```task-manager-front``` folder then run the ```npm run build``` command for the backend to have a frontend build to return
- When deployed the ```build``` command is already done automatically thus this is only done for local applicaiton runs