# redux-saga: Managing Side Effects in Redux

`redux-saga` is a library designed to make side effects (asynchronous operations like data fetching, and impure actions
like accessing browser cache) in React/Redux applications easier and more manageable.  It's available on NPM:

```bash
$ npm install --save redux-saga
```

## The Mental Model of redux-saga
Think of a Saga as a separate thread (or process) within your application dedicated entirely to handling side effects. 
`redux-saga` is a Redux middleware, meaning this "thread" can be started, paused, and cancelled from the main
application using regular Redux actions. Sagas have access to the complete Redux application state and can also dispatch
Redux actions.

## `call()` vs. `put()` in redux-saga
Both `call()` and `put()` are effect creator functions within `redux-saga`.
* **`call()`:** Creates an *effect description* that instructs the middleware to call a given function (which often 
  returns a Promise).  The resolved value of the Promise is then available within the Saga.
* **`put()`:** Creates an *effect* that instructs the middleware to dispatch a given action to the Redux store.

### Example: Fetching User Data
```js
function* fetchUserSaga(action) {
  try {
    // `call` function accepts rest arguments, which will be passed to `api.fetchUser` function.
    // Instructing middleware to call promise, its resolved value will be assigned to `userData` variable.
    const userData = yield call(api.fetchUser, action.userId);

    // Instructing middleware to dispatch corresponding action.
    yield put({ type: "FETCH_USER_SUCCESS", userData });
  } catch (error) {
    yield put({ type: "FETCH_USER_FAILURE", error }); // Handle errors
  }
}
```

**Explanation:**

* `yield call(api.fetchUser, action.userId)`: This line tells the `redux-saga` middleware to call the `api.fetchUser` 
  function, passing `action.userId` as an argument.  `api.fetchUser` is assumed to return a Promise. The `yield` keyword
  pauses the Saga execution until the Promise resolves. The resolved value is then assigned to the `userData` variable.
* `yield put({ type: "FETCH_USER_SUCCESS", userData })`:  This line tells the middleware to dispatch the 
  `FETCH_USER_SUCCESS` action to the Redux store, along with the fetched `userData`. This will trigger the appropriate
  reducer to update the state.
* **Error Handling (Added):** The example now includes a `try...catch` block. This is *crucial* for handling potential
  errors during the API call. If `api.fetchUser` rejects the Promise, the `catch` block will execute, allowing you to
  dispatch an error action (e.g., `FETCH_USER_FAILURE`) and handle the error gracefully.  This makes your Sagas more 
  robust.

**In summary:** `call()` is for calling functions (often asynchronous), and `put()` is for dispatching actions. They are
the core building blocks for managing side effects in a clear and testable way with `redux-saga`.




### References
* [reactjs-interview-questions - github](www.github.com/sudheerj/reactjs-interview-questions)