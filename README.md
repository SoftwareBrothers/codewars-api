# Installation

### Setup env variables

1. Copy example env `cp .env.dist .env`
2. Populate with your own values

# Debugging

Run the app in debug mode:

#### Using docker-compose

```
docker-compose -f ./docker-compose.yaml -f ./with-debug.yaml up --build -d
```

#### Using makefile

```
make debug
```

### IDE configuration

#### JetBrains IDE (IntelliJ IDEA, WebStorm, PHPStorm, ...)

1. In your IDE go to `Run` -> `Edit Configurations...`
2. `+` (Add New Configuration) -> `Attach to Node.js/Chrome`
    * Name: name it as you want, like `debug`
    * Host: localhost
    * Port: 9229
    * Attach to: Chrome or Node.js > 6.3
    * Reconnect automatically
    * `OK`

3. Start debugging!

#### vscode

0. Install Docker Extension for vscode: https://code.visualstudio.com/docs/azure/docker
1. Press CMD(Ctrl)+Shift+P(Command Palette) and find “Debug: Open launch.json”:
1. Then choose Docker: Node.js
1. Paste this configuration:

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "App: Attach Docker to Node",
            "type": "node",
            "request": "attach",
            "remoteRoot": "/home/node/app",
            "port": 9229,
            "address": "localhost",
            "localRoot": "${workspaceFolder}",
            "protocol": "inspector",
            "restart": true
        }
    ]
}
```

# nestJS

## Running the app

```bash
# development
yarn start

# watch mode
yarn start:dev

# production mode
yarn start:prod
```

## Test

```bash
# unit tests
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```


# Release

### Configure semantic-release
Open `.releaserc` file and change `INSERT_YOUR_ID_HERE` to id of your project in Jira.

# Developing / Code

It is established that repository `find*` methods return value or null while `get*` method return value or throw error.