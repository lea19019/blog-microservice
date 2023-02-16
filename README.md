# Microservices Learning

Repo containing my learning into microservices

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

