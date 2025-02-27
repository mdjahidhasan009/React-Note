# Container Presentation Pattern

The **Container-Presentation Pattern** is a design pattern in React that separates **UI components (Presentation 
Components)** from **logic and data-fetching components (Container Components)**.

## Importance of Container Presentation Pattern:

* **Separation of Concerns** – It keeps UI components clean and focused only on rendering while keeping data-fetching
  and business logic separate.
* **Reusability** – The same presentation component can be reused with different data sources.
* **Easier Maintenance** – Changes in logic don’t affect the UI and vice versa.
* **Better Testing** – You can test UI separately from business logic.

## Separation of Concerns (SoC):

**Separation of Concerns (SoC)** is a software design principle that suggests dividing a program into distinct sections,
where each section addresses a separate concern.

In **React**, this means breaking an application into independent, reusable parts, where:

* **UI Components** handle rendering.
* **Logic Components** handle data-fetching, state management, or API interactions.
* **Routing, State, and Business Logic** are kept modular to improve maintainability.

## Single Responsibility Pattern (SRP):

The **Single Responsibility Principle (SRP)** states that a component should have **one reason to change—it should do
one thing well**.

In **React**, this means:

* UI components should only handle rendering
* Logic components should manage state and data fetching
* Reusable utilities should handle specific tasks (e.g., formatting, API calls)

## Why is SRP Important?

* **Easier Maintenance** – When a component has a single responsibility, it’s easier to update.
* **Better Readability** – Developers can quickly understand the purpose of each component.
* **Improved Reusability** – Smaller, focused components can be reused in multiple places.
* **Simplified Testing** – Testing a small, focused component is easier than testing a large, complex one.

## Two Most Common Patterns: HOC & Render Props

### Higher-Order Component (HOC)

A **Higher-Order Component (HOC)** is a **pattern** in React that allows you to **re-use component logic**. It's a 
function that takes a component and **returns a new component** with additional props or logic.

HOCs are commonly used for:

* Reusing component logic
* Adding extra features like authentication, logging, etc.
* Modifying props or behavior of the wrapped component without changing the original component.

### Render Props

A **render prop** is a pattern in React where a component uses a function prop to know what to render. This pattern 
allows you to share code between components using a function that returns a React element.

Instead of the component rendering something directly, it provides a function (a "render prop") to the consumer of the 
component. This function then returns what the component should render.

## Why is Render Props Important?

* **Reusable Logic:** Render props allow for **code reuse** across multiple components. You can share logic between
  components without using inheritance or mixins.
* **Separation of Concerns:** By separating logic from presentation, render props help keep components more **focused**
  on a single responsibility.
* **Flexibility:** Render props provide a high level of flexibility. You can change what gets rendered based on the
  function you pass to the component, and you can control how components behave by passing different functions.
* **Composability:** You can compose different behaviors by using multiple render prop components. Each component can
  provide its own logic, and the consumer can decide how to combine them.

## Use Cases for Render Props

* **Sharing state or logic:** When you need to share logic or state between multiple components (e.g., managing form
  state or handling mouse position).
* **Conditional rendering:** When you want to control what gets rendered based on certain conditions or logic.
* **Code reuse:** When you want to reuse a block of code that renders UI elements in different ways, but with shared
  logic.
* **Dynamic content rendering:** When the content or structure needs to be dynamic and controlled from outside the
  component.

