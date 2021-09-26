### To run the project locally

1. Install dependencies

```
npm i
```

2. Run the project in dev mode

```
npm run dev
```

3. Run the project in dev mode with DEBUG flag

```
DEBUG=app* npm run dev
```

### To run the project in production

1. Install dependencies
```
npm i
```
2. Build the project (it will create /dist folder)
```
npm run build
```

2. Run the project
```
npm run start
```


#### Note: Do not forget to add needed enviromental variables to .env

```
PORT =
COSMOS_DB_ACCOUNT_URI =
COSMOS_DB_ACCOUNT_KEY =
```

#### For now this implementation of API is serving mock data from Azure Cosmos DB

```
{
"telemetryData": [
    {
        "id": "1",
        "connectionDeviceId": "keep-the-box-green-device",
        "connectionDeviceGenerationId": "637669621042053570",
        "enqueuedTimeUTC": "2021-09-11T17:57:36.4340000Z",
        "temperature": 28.202403706127036,
        "humidity": 64.96773367978993,
        "_rid": "AQ99ALrBAPgBAAAAAAAAAA==",
        "_self": "dbs/AQ99AA==/colls/AQ99ALrBAPg=/docs/AQ99ALrBAPgBAAAAAAAAAA==/",
        "_etag": "\"04009225-0000-1500-0000-6145b9480000\"",
        "_attachments": "attachments/",
        "_ts": 1631959368
    },
]
}
```

### To run app with Docker container
```
docker build . -t keep-the-box-green-api
docker run -p 8080:8080  keep-the-box-green-api
```

NOTE: There is also Dockerfile.dev, in order to build an image with Dockerfile.dev:

```
docker build -t keep-the-box-green-api-dev -f Dockerfile.dev .
```
[keepTheBoxGreen-api docker hub](https://hub.docker.com/repository/docker/irinabaeva/keeptheboxgreen-api-docker)


### The app is deployed with Azure App Services 

[keepTheBoxGreen-api](https://keeptheboxgreen-api.azurewebsites.net/)

### MVP cloud infrastructure diagram:

![diagram](assets/mvp-schema.png "")