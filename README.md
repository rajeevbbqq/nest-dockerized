## Description

Project is scaffolded with below tools

|   | Tools  |   
|---|---|
| Framework  | Nest JS  |
| Database  | Postgres  |
| Containeraization  | Docker  |
| Database ORM  | TypeORM  |
| Documentation  | Swagger  |

## Live demo

|   | Link  |   
|---|---|
| Documentation  | [Access documentation](http://ec2-3-111-218-226.ap-south-1.compute.amazonaws.com/documentation)  |
| Application Server  | [Access](http://ec2-3-111-218-226.ap-south-1.compute.amazonaws.com)  |

Note: When invoking API make sure to pass JWT token mentioned in the Swagger doc

## Deploying Project locally with Docker

Prequisite: Docker should be installed on your machine to execute below commands. [Get docker](https://docs.docker.com/get-docker/)

Build the NestJS project
```bash
docker compose build
```
Starting application server as daemon
```bash
docker compose up -d
```

Project starts on [http://localhost:3000](http://localhost:3000)



## Testing the app

```bash

# e2e tests for testing API services
npm run test:e2e
```

## Running the app locally for development

```bash
# development with watch mode
$ npm run start:dev
```

## Generating DB scripts

It is possible to generate migration scripts based on the entities created or modified.
```bash
npm run migration:generate
```
The above command creates migration scripts automatically

## Modify database configs

Database is scaffolded with Postgres image pulled from docker hub, credentials can be updated in `docker-compose.yml`. 

## Side note

`.env` published as part of repo does not contains any production secrets or configs. Credentials stored inside `.env` is for running application without hassles.

## License

Nest is [MIT licensed](LICENSE).
