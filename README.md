# Keepcoding Boot VI (2017)

##  _Nodepop_

#### _API Usage_

* Url of _Nodepop_ API:
[http://ec2-18-218-171-78.us-east-2.compute.amazonaws.com/]

* Url of personal page:
[http://18.218.171.78/]

#### _How To Install_

Steps to download and run the application:

1. Download the project.


2. Modify the .env.example file to a .env file with proper values.
3. Init the MongoDB database using the following command:

    `./bin/mongod --dbpath <directory_to_store_data> --directoryperdb`
    
4. Populate the database with:

    `npm run installDB`
    
5. Start the server with:

    `node ./bin/www`

#### _Internationalization_
This API supports two languages (en/es), to enable it, add the _Accept-Language_ header to the requests.

#### _API Usage_

* Register an user
````
POST /apiv1/usuarios/registro

MUST parameters in the body:
        {
            nombre: STRING, 
            email: STRING, 
            clave: STRING
        }

NOTES: You cannot register two users with same email.
````
* Login an user
````
POST /apiv1/usuarios/login

MUST parameters in the body:
        {
            email: STRING,
            clave: STRING
        }
````
* Get list of advertisements
````
GET /apiv1/anuncios

MUST parameters in the http url:
    * "token": Auth token. You can create it registering and login an user.

OPTIONAL parameters in the http url:
    *"tag": String -> Filter by tag.
    *"venta": Bool -> Filter by if the item is for sale or in search.
    *"nombre": String -> Filter by name.
    *"precioMin": Int -> Filter by min price.
    *"precioMax": Int -> Filter by max price.
    *"start": Int -> Pagination purposes.
    *"limit": Int -> Pagination purposes.
    
NOTES: Only auth users can retrieve the list of ads.
````
* Get list of available tags
````
GET /apiv1/anuncios/tags
````

[http://ec2-18-218-171-78.us-east-2.compute.amazonaws.com/]: http://ec2-18-218-171-78.us-east-2.compute.amazonaws.com/
[http://18.218.171.78/]: http://18.218.171.78/