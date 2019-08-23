| Language | Framework | Database |Client
| -------- | -------- |--------|--------|
| Nodejs | Express | MongoDB| Vue


# Car Maintenance Alert Service


## Running project

You need to have installed Node.js v10.15.3, npm v6.4.1 and mongoDB 4.0

### Install dependencies

To install dependencies enter project folder and run following command:
```
npm install
```

### Run Server

Create a file named `.env` such as `.envExample`
update the `.env` file with proper key and values

To run server, execute:
```
npm start
```

To run server in dev mode
```
npm run dev
```

### Run Client

Go to the client directory
```
cd client
```

Change the `baseApi`, for development in `.env.development` and  for production `.env.production`.

To run client, execute
```
npm run dev
```

To build the client
```
npm run build:prod
```

While build is completed, the distribution directory `dist` will be find in the `projectRootDirectory/public/dist`


### API Doc
I added the api doc in project root directory named `Car Service Maintenance.postman_collection.json`.
