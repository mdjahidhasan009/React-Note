# Custom Hook

A **Custom Hook** in React is a **reusable function** that encapsulates stateful logic using **React Hooks** like
`useState`, `useEffect`, `useRef`, etc. It follows the naming convention `useSomething`, making it easy to share logic
across multiple components without code duplication.

Before custom hooks, we had **three primary ways** to reuse logic:

* Higher-Order Components (HOC)
* Render Props
* Context API (for state sharing)

However, both **HOCs and Render Props led to issues** like:

* **Nested Components (Wrapper Hell)** – Too many wrapper components made the JSX harder to read.
* **Props Drilling** – Passing down props multiple levels.
* **Complex Debugging** – Hard to track data flow inside deeply nested components.

Custom Hooks solve these problems by providing a **simple, composable, and readable** way to extract logic!

# Factory Hook

The **Factory Hook Pattern** is a way to create **custom hooks dynamically** based on different conditions, 
configurations, or dependencies. Instead of having a single static hook, a factory function generates a hook instance 
based on specific parameters, improving reusability, flexibility, and maintainability.

## Why Do We Need Factory Hooks?

* **Customizable Behavior** → Create variations of hooks with different configurations.
* **Encapsulation** → Abstract complex logic into reusable units.
* **Avoid Duplication** → Instead of writing multiple similar hooks, generate them dynamically.
* **Dynamic Dependencies** → Inject dependencies or configurations when creating hooks.
