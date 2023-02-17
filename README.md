# Microservices Learning

Repo containing my learning into microservices.

This project is just meant to give me an idea of how microservices work, by any means is intended to be treated as a professional project, thou, I will be trying to implement best practices learned from other places.

## Dev Environment

- Fedora Linux 37 (Workstation Edition)
- Visual Studio Code
- Node v18.13.0

## Microservices Installation

Run following commands in the terminal of the microservice 
```bsh
// Start Node project
npm init -y

// Install Dependencies
npm install express cors axios 
npm install --save-dev nodemon typescript ts-node @types/node @types/express

// Start TypeScript Configuration
npx tsc --init 
```

Configure **tsconfig.json** so that we have the following configuration:
```json
"rootDir": "./src"
"moduleResolution": "node"
"outDir": "./dist"
```
You might also want to create your `src` folder right away, and add a `app.ts` file.

Add this script to `scripts` in **package.json** to have `nodemon` run the app and watch for changes
```json
"dev": "nodemon dist/app.js"
```

### Run Dev Environment

Once the installation is completed, run the following commands in microservice terminal.
```bsh
// Start TypeScript watch mode
npx tsc -w

// RUN IN DIFFERENT TERMINAL

// Start Node App
npm run dev
```

Notes: Is there something similar to Vite or Nuxt engine that would automatically complie Typescript files in a node enviroment and would let me just run the app with just one command instead of doing all of the above? Most likely there is, I need research about it


## Client Installation

We are using Nuxt as a framework to create a client and all we have to do is follow their steps.

For more details visit their [official documentation](https://nuxt.com/docs/getting-started/installation)

```bsh
// Create Nuxt project
npx nuxi init client
// You can change 'client' to whatever name you want

// Navigate to client folder's location
cd client

// Install dependencies, which is actually only Nuxt at the beginning
npm install

// Start Dev Environment
npm run dev -- -o
```

# Notes Learning

## What is a Microservice?

First let's look at a Monolithic Server, which what I most commonly used.

A monolithic server contains all of our `routing`, `middlewares`, `business logic`, and `database access` to implement **all features** of our app.

![Monolithic Structure Example](/images/monolithic.png)

A single microservice contains the `routing`, `middlewares`, `business logic`, and `database access` to implement **one feature** of our app.

![Microservices Structure Example](/images/microservices.png)

The features are split, and are self conatain, all of the code needed for them to work should be only inside that microservice.
If for any reason any of the other services fails, the remianing microservices should be able to work just fine.

### Data Management Between Services

The way we store data between different services and the way we communicate that data between diferent services. Managing the data is the big problem when dealing with microservices.

Each service gets its own databates (if it needs one) and services will never, ever reach into another services database. This pattern is called 'Database-Per-Service'.

Why would we want to do it that way? Because we want each service to run independently of other services, without interconnectino across services if one fails the rest remaing untouch increasing the overall uptime of our services, this is the most important reason but there are a few more. Database schemas/structure mught change unexpectedly and some services might function more efficiently with different types od DB's (sql vs nosql).

The problem with this approach is that when we want to add a new feature that needs information from any of the other services we have the constarint of not being able to directly fetch data from there. 

### Communication Strategies Between Services

**Sync:** Services commmunicate with each other using direct requests.

**Async:** Services communicate with each other using *events*

The Sync communication would make direct request to any of the services from which it needs information, but it would ultimately create a dependency, the service is as fast as the slowest request that we would make to the other services, and it can introduce a web of requests.

On the other hand, Async communication would have all the services manage their data and also send an event to an Event-Bus that would handle those events and store useful data to any other database interested in that data. 