# MobX vs Redux - State Management in React

## What is MobX?
MobX is a simple, scalable, and battle-tested state management solution for applying **functional reactive programming
(TFRP)**. For a ReactJS application, you need to install the following packages:

```sh
npm install mobx --save
npm install mobx-react --save
```

⬆ Back to Top

## What are the Differences Between Redux and MobX?
Below are the main differences between **Redux** and **MobX**:

| **Topic**              | **Redux**                                                      | **MobX**                                                                |
|------------------------|----------------------------------------------------------------|-------------------------------------------------------------------------|
| **Definition**         | It is a JavaScript library for managing the application state. | It is a library for reactively managing the state of your applications. |
| **Programming**        | It is mainly written in ES6.                                   | It is written in JavaScript (ES5).                                      |
| **Data Store**         | There is only **one large store** for data storage.            | There is **more than one store** for storage.                           |
| **Usage**              | Mainly used for **large and complex** applications.            | Used for **simple applications**.                                       |
| **Performance**        | Needs optimization for better performance.                     | Provides **better performance** due to reactive tracking.               |
| **How it Stores Data** | Uses a **JavaScript Object** to store data.                    | Uses **observables** to store data, making it more efficient.           |

⬆ Back to Top

## Additional Notes:
- **Redux** enforces a strict unidirectional data flow with immutable state updates.
- **MobX** allows mutable state and tracks changes automatically via observables.
- **Redux** requires actions, reducers, and middleware for async operations, while **MobX** simplifies state management with less boilerplate.
- **Choosing between Redux and MobX** depends on the application complexity and developer preference.


### References
* [reactjs-interview-questions - github](www.github.com/sudheerj/reactjs-interview-questions)