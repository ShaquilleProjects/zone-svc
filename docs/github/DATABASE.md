## Database 


### Create your Database Instance

#### 1. Create a New Project

LogIn to MongoDB and create a project.

![CREATE_PROJECT](images/CREATE_PROJECT.png)

#### 2. Create a Database in the project

It is to be noted that the first database created is free, and subsequent ones are not.

![CREATE_DATABASE](images/CREATE_DATABASE.png)

![CHOOSE_DB](images/CHOOSE_DB.png)

![CREATE_CLUSTER](images/CREATE_CLUSTER.png)


### Connect your Database

#### 1. Configure users and ip addresses with access to database  

Create a user name and password, and then add the user

Add 0.0.0.0/0 to your list of IP Addresses , which would open it to every IP

![CONFIGURE](images/CONFIGURE.png)

#### 2. Connect using your MONGOURI


Click on connect for your database, and then choose to connect useing MongoDB's native drivers

![CONNECT](images/CONNECT.png)

![DRIVERS](images/DRIVERS.png)

Copy the URI given and save it in your server

![URI](images/URI.png)

In your server, navigate to /server/config/dev.js and store your uri a follows:

        module.exports = {
            MONGO_URI_MARKUP: 'mongodb+srv://ssg:sdgdsgd@phillip-5prhb'
        };


Please note. For production, this has to be replicated so that your data stays clean