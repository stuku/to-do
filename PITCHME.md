---
marp: true
backgroundColor: BlanchedAlmond
paginate: true
---

![bg opacity:0.7](https://webgradients.com/public/webgradients_png/007%20Sunny%20Morning.png)

# To-Do List With Restful Backend

Implemented with:
Typescript, Express, Mongoose, React, Redux, Redux-Observable, RxJS, Jest and Swagger

---

![bg right width:300 opacity:0.2](https://www.clipartmax.com/png/full/166-1661137_follow-the-coin-variance-functional-programming-logo.png)

## Functional Programming

- Orthogonal, not opposites to iterative

- Eliminate:

  - Side Effects
  - Screen Output
  - Setting of Variables Elsewhere

- Implemented with [ReactiveX/rxjs](https://github.com/ReactiveX/rxjs) :star:26.6k:

  - **Client**: Epics
  - **Server**: Services

---

![bg left](https://blog.logrocket.com/wp-content/uploads/2019/07/rxjsobservables.png)

![create/combine/listen](https://d1dwq032kyr03c.cloudfront.net/upload/images/20200918/20020617kccIhyQtzO.jpg)

## Observables, Observers

- **Observables** are collections of multiple values
- **Observer** consumes values delivered by an observable

---

- [**Operators**](https://rxmarbles.com/) to deal with collections

  - Creation: `from`, `of`, `throwError`
  - Pipeable: `catchError`, `debounceTime`, `mergeMap`, `switchMap`

    ```javascript
    import { of } from 'rxjs';
    import { map } from 'rxjs/operators';

    of(1, 2, 3)
      .pipe(map((x) => x * x))
      .subscribe((v) => console.log(`value: ${v}`));

    // Logs:
    // value: 1
    // value: 4
    // value: 9
    ```

---

## How to Start

```
npm install
npm run start-install
npm run dev
```

You can now view client in the browser: [http://localhost:3000/](http://localhost:3000/)

Swagger UI would be accessible at: [http://localhost:49170/api-doc/](http://localhost:49170/api-doc/)

## How to Test

```
npm run test
```

---

# Questions?
