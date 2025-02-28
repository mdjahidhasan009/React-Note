# Function as Children Prop Pattern

The **Function as Children Prop** (also known as **Render Props with children**) pattern in React allows passing a
function as the `children` prop to a component. This function receives data or state from the component and returns JSX,
making the component flexible and reusable.

## Why is it Important?

* **Enhances Reusability** – Instead of duplicating logic, different components can use the same logic but customize 
  rendering.
* **Promotes Separation of Concerns (SoC)** – The logic and UI rendering are decoupled, making maintenance easier.
* **Flexible Component Customization** – The parent component can fully control how the child is rendered.

## Note:

* Any time we need hooks we can use Function as Children Prop Pattern. It won’t introduce any junk inside the JSX but
  provides enhanced functionalities.
* Any time you need complex logic or flow inside JSX use Children Prop Pattern.

# Context API

The **Context API** in React provides a way to pass data deeply through the component tree **without needing to 
manually pass props at every level** (a.k.a. "prop drilling"). It is mainly used for **global state management** in
scenarios where multiple components need access to shared data.

## When to Use Context API?

* Theme Management – Light/Dark mode switching.
* Authentication State – User login status across the app.
* Language/Localization – Multi-language support.
* Global UI State – Sidebar visibility, modals, notifications.
* Application Configurations – Feature flags, environment settings.
* Form State Sharing – Multi-step forms where data is shared across steps.

## Strengths of Context API

* Removes Prop Drilling – No need to pass props through multiple levels.
* Lightweight Alternative to State Management Libraries – No need for Redux or Zustand for simple state sharing.
* Built-in and Native to React – No extra dependencies.
* Flexible – Works with any data type (booleans, strings, objects, functions).

## Weaknesses of Context API

* Re-renders All Consumers When Context Changes – Even if only part of the context changes, all consuming components
  re-render.
* Not Ideal for High-Frequency Updates – If data updates frequently (e.g., real-time stock prices), Context API may
  cause performance issues.
* Complex Debugging – If multiple contexts exist, debugging can become challenging.

# Compound Components

The **Compound Component Pattern** in React allows multiple related components to work together as a single unit. 
Instead of passing multiple props to control child components, compound components communicate implicitly through 
**context or React’s `children` prop**.

This pattern is useful when you want to design **flexible, reusable UI components** that allow users to compose them in
different ways.

## When to Use Compound Components? (Use Cases)

* Building UI libraries – Tabs, Accordions, Dropdowns, Modals, etc.
* Designing flexible, reusable components – Form controls, Wizards.
* When multiple components share a common state – Controlled components.
* Improving code readability & maintainability – Reducing prop drilling.
