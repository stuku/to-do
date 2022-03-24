# To-Do List With Restful Backend

Implemented with:
Typescript, Express, Mongoose, React, Redux, Redux-Observable, RxJS, Jest and Swagger

#

## How to Start

#

### a. Start with Docker.

```
cp .env.example .env
docker-compose up --build
```

#

### b. Start Manually.

#### 1. Set up `MONGODB_URL` in `.env` file with `.env.example` and change proxy setting in `setupProxy.js`.

```
cp .env.example .env
```

#### 2. Install dependencies:

```
npm install
npm run start-install
```

#### 3. Run:

```
npm run dev
```

#

You can now view client in the browser: [http://localhost:3000/](http://localhost:3000/)

Swagger UI would be accessible at: [http://localhost:8080/api-doc/](http://localhost:8080/api-doc/)

#

## How to Test

```
npm run test
```
