# Control Props Pattern

The **Control Props Pattern** is a **flexible way** to allow both **internal** and **external** control over a
component’s state. This is useful when you want to provide **default behavior** while also allowing consumers of your 
component to override it when needed.

## What is Control Props Pattern?

In React, components often **manage their own state** internally. However, sometimes we need to give users the ability 
to **control that state from the outside** while keeping an **optional internal fallback**.

With the **Control Props Pattern**, we:

* Allow state to be controlled **internally (default behavior)**.
* Let consumers **control it externally** when needed.
* Detect whether a prop is **controlled or uncontrolled**.
* Fire **callbacks** (e.g., `onChange`) to keep the external state in sync.

## Why is it Important?

* **More Flexibility** – Components can be used in **controlled** and **uncontrolled** modes.
* **Better Reusability** – Works in different use cases without modifying the core logic.
* **Avoids Unnecessary State** – Lets the consumer manage state **only when necessary**.
* **Keeps Components Declarative** – External control makes it easy to manage from the parent.

## When to Use Control Props?

* You need both **default internal state** and **external control**.
* Users might want to **override** the behavior with their own logic.
* You need **two-way data binding** between the component and parent.
* You want a component to be **partially controlled** (e.g., controlled by a prop but still has default behavior).

# Provider Pattern

The **Provider Pattern** in React is a design pattern that **allows state, functions, or dependencies to be shared 
across a component tree** without passing them manually via props at every level.

## How It Works

The **Provider Pattern** in React is implemented using **Context API**. It enables a **centralized store of data or 
dependencies**, which is then accessed by child components using `useContext`.

## Benefits of the Provider Pattern

* Removes prop drilling
* Encapsulates shared state or dependencies
* Encourages separation of concerns
* Easier to test and manage dependencies
