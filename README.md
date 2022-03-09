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

### cd ./client
```
npm run start
```
It will run on port 3000 by default.

### cd ./sever
```
npm run dev
```
It will run on port 49170 by default.

The swagger UI would be accessible at: [http://localhost:49170/api-doc/](http://localhost:49170/api-doc/)

Service and utils would be tested by:
```
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
