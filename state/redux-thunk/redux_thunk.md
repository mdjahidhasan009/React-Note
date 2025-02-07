# Redux Thunk: Handling Side Effects with Functions

Redux Thunk middleware allows you to write action creators that return a *function* instead of a plain action object. 
This function, often called a "thunk," can be used to delay the dispatch of an action or to dispatch an action 
conditionally based on some logic. The inner function (the thunk) receives the `dispatch()` and `getState()` methods as 
parameters, giving it access to the dispatcher and the current state of the Redux store.

## Redux Thunk vs. Redux Saga: A Comparison

Both Redux Thunk and Redux Saga are designed to manage side effects (asynchronous operations, etc.) in Redux 
applications. Here's a breakdown of their differences:
* **Approach:** Thunk primarily uses Promises to handle side effects, while Saga typically uses Generators.
* **Complexity:** Thunk is generally considered simpler to learn and use, especially for developers already familiar
  with Promises. Saga, with its use of Generators, has a steeper learning curve but offers more powerful and expressive 
  ways to manage complex asynchronous flows.
* **Power and Flexibility:**  Saga provides more advanced features for handling complex asynchronous logic, such as 
  cancellation, task management, and more sophisticated orchestration of side effects. Thunk is often sufficient for
  simpler use cases.
* **Coexistence:**  Thunk and Saga can coexist in the same application. You can start with Thunk for simpler side 
  effects and introduce Saga later if you need its more advanced capabilities for more complex scenarios.  This allows
  you to adopt Saga incrementally as your needs grow.

**In Summary:**

| Feature           | Redux Thunk                                          | Redux Saga                                          |
|-------------------|------------------------------------------------------|-----------------------------------------------------|
| Approach          | Promises                                             | Generators                                          |
| Complexity        | Simpler, easier to learn                             | More complex, steeper learning curve                |
| Power/Flexibility | Good for simpler use cases                           | More powerful, handles complex async logic better   |
| Use Cases         | Simple asynchronous operations, conditional dispatch | Complex asynchronous flows, task management, etc.   |
| Coexistence       | Can be used together                                 | Can be used together                                |

### When to use which
* **Redux Thunk:**  A great starting point for most projects.  Use it when you need to make API calls, dispatch actions 
  conditionally, or perform other relatively straightforward asynchronous tasks.
* **Redux Saga:** Consider Saga when you encounter more complex scenarios:
  * Asynchronous operations that can be cancelled.
  * Complex orchestration of multiple asynchronous actions.
  * Handling race conditions.
  * Improved testability of complex asynchronous logic.

It's often a good strategy to begin with Thunk and then migrate to Saga only when the complexity of your side effects
warrants it.




### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions?tab=readme-ov-file#what-is-react)