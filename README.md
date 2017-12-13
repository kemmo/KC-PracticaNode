# Keepcoding Boot VI (2017)

## Práctica JS/Node.js/MongoDB

###  _Nodepop_

Steps to download and run the application:

1. Download the project.
2. Init the MongoDB database using the following command:
    `./bin/mongod --dbpath <directory_to_store_data> --directoryperdb`
3. Populate the database with:
    `npm run installDB`
4. Start the server with:
    `node ./bin/www`

#### _Internationalization_
This API supports two languages (en/es), to enable it, add the _Accept-Language_ header to the requests.
