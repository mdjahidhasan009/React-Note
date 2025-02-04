# Level 1: Grouping by "File Types"
```
└── src/
    ├── assets/
    ├── api/
    ├── configs/
    ├── components/
    │   ├── SignUpForm.tsx
    │   ├── Employees.tsx
    │   ├── PaymentForm.tsx
    │   └── Button.tsx
    ├── hooks/
    │   ├── usePayment.ts
    │   ├── useUpdateEmployee.ts
    │   ├── useEmployees.ts
    │   └── useAuth.tsx
    ├── lib/
    ├── services/
    ├── states/
    └── utils/
```
* Project Size: Small to Medium
* Advantages: Simple & straightforward
* Disadvantages:
 * Will inflate quickly and become hard to maintain
 * No separation of business concerns

Let's say you have a lot of code revolving around payment. One day the whole business changes or is no longer needed, 
how easy is it to replace or remove it? With this folder structure, you'll have to go through every folder and the files 
inside it to make the necessary changes. And if the project keeps growing larger, it'll soon grow into a maintenance hell
that will only get worse over time.

# Level 2: Grouping by "File Types" and Features
```
└── src/
    ├── assets/
    ├── api/
    ├── configs/
    ├── components/
    │   ├── auth/
    │   │   └── SignUpForm.tsx
    │   ├── payment/
    │   │   └── PaymentForm.tsx
    │   ├── common/
    │   │   └── Button.tsx
    │   └── employees/
    │       ├── EmployeeList.tsx
    │       └── EmployeeSummary.tsx
    ├── hooks/
    │   ├── auth/
    │   │   └── useAuth.ts
    │   ├── payment/
    │   │   └── usePayment.ts
    │   └── employees/
    │       ├── useEmployees.ts
    │       └── useUpdateEmployee.ts
    ├── lib/
    ├── services/
    ├── states/
    └── utils/
```
* Project Size: Medium to Large
* Advantages:
  * Simple & straightforward
  * Stuff are grouped by features
* Disadvantages
 * Logic related to a feature is still spread across multiple folder types

Now let's come back to the problem statement where the payment module needs to be modified or removed. With this structure, 
it's a lot easier to do that now.

# Level 3: Grouping by Features/Modules
For larger projects, the "Level 3" structure offers a highly modular approach, defining clear boundaries for different 
aspects of the application within each module:
```
└── src/
    ├── assets/
    ├── lib/
    |   ├── features/
    |   │   ├── commonFeatureSlice.ts
    │   ├── store.ts
    ├── modules/
    │   ├── core/
    │   │   ├── components/
    │   │   ├── design-system/
    │   │   │   └── Button.tsx
    │   │   ├── hooks/
    │   │   ├── lib/
    │   │   └── utils/
    │   ├── payment/
    │   │   ├── components/
    │   │   │   └── PaymentForm.tsx
    │   │   ├── hooks/
    │   │   │   └── usePayment.ts
    │   │   ├── lib/
    │   │   │   └── paymentSlice.ts
    │   │   ├── services/
    │   │   ├── states/
    │   │   └── utils/
    │   ├── auth/
    │   │   ├── components/
    │   │   │   └── SignUpForm.tsx
    │   │   ├── hooks/
    │   │   │   └── useAuth.ts
    │   │   ├── lib/
    │   │   │   └── authSlice.ts
    │   │   ├── services/
    │   │   ├── states/
    │   │   └── utils/
    │   └── employees/
    │       ├── components/
    │       │   ├── EmployeeList.tsx
    │       │   └── EmployeeSummary.tsx
    │       ├── hooks/
    │       │   ├── useEmployees.ts
    │       │   └── useUpdateEmployee.ts
    │       ├── lib/
    │       │   └── employeesSlice.ts
    │       ├── services/
    │       ├── states/
    │       └── utils/
    └── ...

```
* Project Size: Large and Complex
* Advantages:
  * Stuff are clearly grouped by features/modules
  * Features/Modules are clear representations of objects in the real world
* Disadvantages:
  * You'll have to be well-aware of the business logic to make the right grouping decisions
  
With this, if you are to remove or modify the payment logic, you'll know right away where to start.

# Give Consistent Meanings to Folder Names
Regardless of the structure level, certain folder names should carry specific meanings. What a folder name means may vary based on your preferences or the project's conventions.

Here's what I usually think about folder names:

### UI Components
* components: React components - the main UI building blocks.
* design-system: Fundamental UI elements and patterns based on the design system.
* icons: SVG icons that are meant to be used inline.
### React Specific
* hooks: Custom React hooks for shared logic.
* hocs: React Higher-order Components.
* contexts/providers: Contains React Contexts and Providers.
### Utilities & External Integrations
* utils: Utilities for universal logic that is not related to business logic or any technologies, e.g. string manipulations, mathematic calculations, etc.
* lib: Utilities that are related to certain technologies, e.g. DOM manipulations, HTML-related logic, localStorage, IndexedDB, etc.
* plugins: Third-party plugins (e.g. i18n, Sentry, etc.)
### Business Logic
* services: Encapsulates main business & application logic.
* helpers: Provides business-specific utilities.
### Styles
* styles: Contains (global) CSS or CSS-in-JS styles.
### TypeScript and Configurations
* types: For general TypeScript types, enums and interfaces.
* configs: Configs for the application (e.g. environment variables)
* constants: Constant, unchanged values (e.g. export const MINUTES_PER_HOUR = 60).
### Server Communication
* api: For logic that communicates with the server(s).
* graphql: GraphQL-specific code.
### State Management
* states/store: Global state management logic (Zustand, Valtio, Jotai, etc.)
* reducers, store, actions, selectors: Redux-specific logic
### Routing
* routes/router: Defining routes (if you're using React Router or the like).
* pages: Defining entry-point components for pages.
### Testing
* tests: Unit tests and other kinds of tests for your code.


<br/><br/><br/>

```
lib
|----- features
|          |----- bookSlice.ts
|----- store.ts
|----- hooks.ts
```
* **lib:** This folder will encompass all the Redux files and folders.
* **features:** This section holds the files containing slices that will be integrated into our global store. Here, we can create as many slices as necessary to segment the state per feature.
* **bookSlice.ts:** This file comprises the structure with the state and actions that impact the state.
* **hooks.ts:** Within this file, we will set up new hooks for use with TypeScript in Redux.
* **store.ts:** In this file, we will configure the global store and consolidate the various slices created to make them accessible globally.


Sources
* [Redux Toolkit with Typescript and Next.js 14](https://dev.to/dguglielmigit/redux-toolkit-with-typescript-and-nextjs-14-4k0c)
* [⚛️ Folder Structures in React Projects](https://dev.to/itswillt/folder-structures-in-react-projects-3dp8)