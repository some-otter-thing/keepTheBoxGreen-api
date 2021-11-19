[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![Deployment](https://github.com/some-otter-thing/keepTheBoxGreen-api/actions/workflows/github-pipelines.yml/badge.svg)
![Docker](https://img.shields.io/docker/v/irinabaeva/keeptheboxgreen-api-docker?label=Docker&style=plastic)


### Table of contents

- [Project Description](#project-description)
- [Deployment](#deployment)
- [Local Installation](local-installation)
- [Data schema](#data-schema)
- [Docker](#docker)
- [Cloud infrastructure diagram](#cloud-infrastructure-diagram)
- [Cloud services](#cloud-services)
- [Data flow](#data-flow)
- [Continuous integration and continuous delivery](#continuous-integration-and-continuous-delivery)

### Project Description

KeepTheBoxGreen project introduces the implementation of the Arduino device, which collects data from sensors such as Ultrasonic sensor, Humidity/Temperature sensor, Dust sensor. It has simple logic behind which helps indicate if any of the working conditions are violated by changing the colour of a box. For example, when a person is sitting in front of the laptop for more than 1 hour or air quality drops, the box's light changes its colour to red, and the LCD prints a piece of appropriate advice.
This repo is a REST API built with Express and TS. It is serving data from Azure Cosmos DB. Azure Cosmos DB consists of constantly updated data from the IoT hub through the Stream Analytics job.

Check [link](https://github.com/some-otter-thing/keepTheBoxGreen-arduino) for Arduino repository.

Development process and prototypes:

<img src="./assets/lcd.JPG" alt="lcd" width="200"/>
<img src="./assets/prototype.JPG" alt="prototype" width="300"/>

### Deployment

The app is deployed with Azure App Service

- Production environment of containerized app [keepTheBoxGreen-api](https://keeptheboxgreen-prod.azurewebsites.net/)
- Staging environment of containerized app [keepTheBoxGreen-api](https://keeptheboxgreen-staging.azurewebsites.net/)
- Deployment of (not containerized) app (just for the learning purpose) [keepTheBoxGreen-api](https://keeptheboxgreen-api.azurewebsites.net/)

### Local Installation

#### Pre-Installed Requirements

- NPM an Node (v.14.0) installed (check with npm --version and node --version)
- Docker

#### To run the project locally in development mode

1. Clone repo and install dependencies

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

4. Navigate to http://localhost:${PORT} depending on the PORT you specified in the .env file

#### To run the project locally in production mode

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

#### Note: Do not forget to add needed environmental variables to .env

```
PORT =
COSMOS_DB_ACCOUNT_URI =
COSMOS_DB_ACCOUNT_KEY =
```

### Data schema

Data is served from Azure SQL Cosmos DB

#### Data schema of telemetryData container

| Fields                       | Type   |
| ---------------------------- | ------ |
| id                           | string |
| connectionDeviceId           | string |
| connectionDeviceId           | string |
| connectionDeviceGenerationId | string |
| temperature                  | float  |
| humidity                     | float  |
| sittingTime                  | int    |
| dustConcentration            | float  |

#### Example of response for /

```json
{
  "telemetryData": [
    {
      "id": "1",
      "connectionDeviceId": "keep-the-box-green-device",
      "connectionDeviceGenerationId": "637669621042053570",
      "eventTimestamp": "2021-09-11T17:57:36.4340000Z",
      "temperature": 28.2,
      "humidity": 64.96,
      "sittingTime": 60000,
      "dustConcentration": 64.8
    }
  ]
}
```

Note: temperature is shown in celsius, humidity - in %, sittingTime - in milliseconds, dustConcentration - in ug/m3

Endpont to get MIN or MAX value

```
showValue?day=YYYY-MM-DD&value=VALUE&parameter=PARAMETER
```

provide day in the format like YYYY-MM-DD;

provide value: temperature, humidity or dustConcentration

example of endpoint http://localhost:8080/showValue?day=2021-10-15&value=humidity&parameter=MAX

```json
{
  "telemetryData": [
    {
      "maxhumidity": 44.9
    }
  ]
}
```
Endpont to get all data by day:
```
http://localhost:8080/date?day=YYYY-MM-DD
```


### Docker

The app has been containerized and has two Docker files for production and development.

#### To run Docker container

```
docker build . -t keep-the-box-green-api
docker run -p 8080:8080  keep-the-box-green-api
```

NOTE: There is also Dockerfile.dev. In order to build an image with Dockerfile.dev:

```
docker build -t keep-the-box-green-api-dev -f Dockerfile.dev .
```

#### Image is stored in Docker hub

Docker hub is Docker's official cloud-based registry for Docker images

[keepTheBoxGreen-api docker hub](https://hub.docker.com/repository/docker/irinabaeva/keeptheboxgreen-api-docker)

### Cloud infrastructure diagram:

![diagram](assets/schema.png)

### Cloud services

1. IoT Hub is a Platform-as-a-Services (PaaS), which collects the telemetry data securely. Also, it partially a message broker. In our case, Arduino communicates with KeepTheBoxGreen IoT hub using the MQTT protocol. The implementation of this communication can be found [here](https://github.com/some-otter-thing/keepTheBoxGreen-arduino/blob/main/Main/Main.ino). IoT Hub allows data retention in the built-in Event Hubs for a maximum of 7 days. Collection of data can be explored with Azure IOT explorer:


   ![iot_exp](assets/azure_iot_explorer.png)
2. Stream Analytics is one of the solutions for consuming the telemetry data and placing the data into database. It helps with real-time streaming data.
   Azure Stream Analytics uses event-based approach: event producer -> event processor-> event consumer. In our case event producer is our IoT Hub, and the event consumer is Cosmos DB and Power BI.

   ![stream](assets/azure_stream_analytics.png)
3. Azure Cosmos DB provides great scalability, which is very important for IoT data. Documentation claims 99.999% read and write availability. The project uses native Core (SQL) API. One of the main reasons for choosing this database is that our implementation required Stream Analytics which only works with SQL API.

   ![cosmos_query](assets/azure_cosmos.png)
4. App Services is a Platform as a Service (PaaS) and "an HTTP-based service for hosting web applications, REST APIs, and mobile back ends". It provides good ability to scale, but since our project uses free tier, we are limited by it. But even with the free tier, it supports both automated and manual deployment.
   Also, huge benefit is that App Services support automated deployment directly from GitHub.
   Free tier limited us to use deployment slots which could be a great solution for having different environments.

### Data Flow

Data flow is explained above in great details, and here we can see the overall diagram:

![data-flow](./assets/data_flow.png)

### Continuous integration and continuous delivery

#### Tools of CI/CD:

1. Ci/CD tool: Github Actions 

Azure provides its own Ci/CD tool Azure DevOps. Both Github Actions and Azure DevOps automatically build, test, publish, release, and deploy code. Also, they use the same YAML files and workflow steps. One of the benefits of Azure is that Azure Pipelines can be easily used for any source control system, but GitHub Actions is for GitHub only. Since we use Github as our source control, we wanted to keep consistent with implementation. Also, Azure Pipelines is suitable for private enterprise projects, but we want to keep our project public and visible for anyone who wants to contribute. 

2. Container registery: Docker Hub

After researching different container registry options, we chose to try Docker Hub and Azure Container Registry. Azure Container Registry offers different plans, but even the basic one is not for free. So we proceed with a free option of <a href="https://hub.docker.com/repository/docker/irinabaeva/keeptheboxgreen-api-docker">Docker Hub.</a>.

3. Web hosting service : Azure App Service

#### Diagram of deployment pipeline:

![diagram ci/cd](/assets/diagram_cicd.jpg)

The work and collaboration within the project follow CI/CD principles.
The main jobs of CI/CD pipeline:

- build (build, test, lint, upload artifact)
- sonarcloud (code coverage scan, code smells, security issues)
- docker (build image with the commit sha tag and push to docker hub)
- deploy to Staging (containerized) - deploys to Staging environment for testing before release.
- deployContainerizedProd

P.S. deployProduction (this step is present just for learning purposes, since the main deployment has been done with containerized app)
##### Workflow on pull request

![workflow](/assets/workflow_pr.png)

Push to main branch is protected and requires Build, Sonar Cloud and Deploy to staging status checks to pass before merging

Deployment step is protected and requires manual trigger (approval) of reviewer.

##### Workflow on push to main branch

![workflow](/assets/workflow_push.png)

There is an email notification. Deployment is finished after approval.

##### Successful deployment

![workflow](/assets/workflow_push_success.png)

We use Slack Notify for creating custom notification to the slack

![slack](/assets/slack_notify.png)
