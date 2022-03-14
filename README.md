# To-Do List With Restful Backend

Implemented with:
Typescript, Express, Mongoose, React, Redux, Redux-Observable, RxJS, Jest and Swagger

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

## Functional Programming

- Orthogonal, not opposites to OOP

- Prevent:

  - Side Effects
  - Screen Output
  - Setting of Variables Elsewhere

- Implemented with [ReactiveX/rxjs](https://github.com/ReactiveX/rxjs) :star:26.6k:

  - **Client**: Epics
  - **Server**: Services

---

## Observables, Observers

- **Observables** are collections of multiple values
- **Observer** consumes values delivered by an observable

---

- **Operators** to deal with collections

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
