# D&DBase

A toolset for Dungoen Masters for Dungeons and Dragons 5th Edition.

## Technical Details

The server is a Spring Boot project written in Kotlin. The client is a React application written in Typescript using BlueprintJS.

## Running the Server

```shell
./gradlew bootRun
```

## Running the Client

```shell
cd client
yarn install
yarn start
```

## Creating an executable bundle

```shell
./gradlew bootJar
```

The executable will be a `*.jar` file located in `/build/libs`.
This artifact can be run with `java -jar <filename>` and includes
both the server and the client.

## Creating a docker image

```shell
 ./gradlew bootBuildImage
```

## Publishing

(Requires SSH Credentials)

On your development machine:

```shell
 # build the image
 ./gradlew bootBuildImage

 # transfer the image to the remote server
 docker save dndbase:latest | bzip2 | ssh root@116.203.178.153 docker load
```

On the remote server:

```shell
 # switch to the DNDBase deployment directory
 cd ~/deployment/dndbase
 # shut down the previous version
 docker compose down
 # start the new version
 docker compose up -d
```
