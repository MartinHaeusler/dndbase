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
