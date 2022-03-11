# To-do List Web Page with Restful Backend

A To-Do List with features like create, edit, filter, prioritize, etc.

## Mandatory
- Development duration is around 2 weeks 
- Server side languages: TypeScript
- API design with OpenAPI spec
- Unit test
- Commit/push code to your Github
- Prepare presentation to demo your project
- Apply functional programming (TypeScript: FP-PS Either, Pipe…)

## Tech
Typescript + Express + Mongoose + React + Redux + Redux-Observable + RxJS + Jest + swagger

## How to Start

### Start Manually

#### Frontend
```
cd ./client
npm install
npm run start
```
It will run on port 3000 by default.

#### Backend
```
cd ./sever
npm install
npm run dev
```
It will run on port 49170 by default.

## Endpoints

You can now view client in the browser: [http://localhost:3000/](http://localhost:3000/)

The swagger UI would be accessible at: [http://localhost:49170/api-doc/](http://localhost:49170/api-doc/)

Test report of service and utils for server would be generated after:
```
cd ./server
npm run test
```

## Roadmap

### Phase 1

- Initialize Project:
    - Tech Research: Node.js, Express, its boilerplate, OpenAPI generator, Typescript, RxJS, Jest, etc.
    - File Structure: create-react-app (template Typescript)
    - docker
- Server-side Implementation:
    - Db: mongoose
    - enums, interfaces, models
    - APIs, swagger
        - CRUD, filter, prioritize, etc.
    - Unit Tests
- Client-side Implementation:
    - Page Design and components: Material UI
    - Redux
- Integration Test

### Phase 2 (N2H)
- Add "User" as option into "To-do" items
- Optimize coding, validations
