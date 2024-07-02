# Fiber Tree
Fiber tree is a tree structure that represents the structure of the UI elements in the application. It is a lightweight version of the React element tree. The fiber tree is used by the reconciler to perform the diffing algorithm and update the UI.


# Fiber Node
Fiber node is a JavaScript object that represents a single element in the fiber tree. It contains information about the element, such as its type, props, and children. The fiber node also contains information about the element's state, such as whether it is mounted or unmounted, and whether it needs to be updated.

# Fiber Reconciliation
Fiber reconciliation is the process of comparing two versions of the fiber tree and determining the differences between them. This process is used by React to efficiently update the UI in response to changes in the application state. The reconciler uses a diffing algorithm to compare the two versions of the fiber tree and determine which elements need to be added, removed, or updated.

# Fiber Diffing Algorithm
The fiber diffing algorithm is the algorithm used by the reconciler to compare two versions of the fiber tree and determine the differences between them. The algorithm is based on the concept of "diffing" or "diffing" the two versions of the tree to determine which elements need to be added, removed, or updated. The algorithm is designed to be efficient and performant, so that updates to the UI can be made quickly and without unnecessary re-renders.

# Fiber Reconciler
The fiber reconciler is the part of React that is responsible for updating the UI in response to changes in the application state. The reconciler uses the fiber tree and the fiber diffing algorithm to determine which elements need to be added, removed, or updated, and then updates the UI accordingly. The reconciler is designed to be efficient and performant, so that updates to the UI can be made quickly and without unnecessary re-renders.

# Fiber Scheduler
The fiber scheduler is the part of React that is responsible for scheduling updates to the UI. The scheduler uses a priority-based system to determine which updates should be processed first, based on the urgency of the update and the resources available. The scheduler is designed to be efficient and performant, so that updates to the UI can be made quickly and without unnecessary re-renders.

# Fiber Root
The fiber root is the root of the fiber tree. It represents the top-level element in the application and contains information about the entire application, such as the root element, the container element, and the current version of the fiber tree. The fiber root is used by the reconciler to update the UI in response to changes in the application state.

# Fiber Work Loop
The fiber work loop is the process by which the reconciler updates the UI in response to changes in the application state. The work loop is an iterative process that runs continuously, processing updates to the UI in a prioritized order. The work loop is designed to be efficient and performant, so that updates to the UI can be made quickly and without unnecessary re-renders.

# Fiber Commit Phase
The fiber commit phase is the final phase of the reconciliation process. In this phase, the reconciler applies the changes to the DOM and updates the UI to reflect the changes in the application state. The commit phase is designed to be efficient and performant, so that updates to the UI can be made quickly and without unnecessary re-renders.









React does `Object.is(ElementBeforeRender, ElementAfterRender)` to determine if the element has changed. If it has 
changed(means `false`), React will update the element in the DOM. If it hasn't changed(means `true`), React will not 
update the element in the DOM. React do not compare the children of the element. React will update the children of the 
element if the parent element has changed. React will not update the children of the element if the parent element has 
not changed. Also, React done shallow comparison not deep comparison.

When the comparison return `false`, first it will check type
* **Same Type:** Will re-render the component so the state will be preserved.
* **Different Type:** Will unmount the old component and mount the new component in the DOM so old state will be lost.
  and the new component will be mounted in the DOM.


# Fiber Reconciliation Phases
The fiber reconciliation process is divided into several phases, each of which performs a specific task in the reconciliation process. The phases are:

1. **Render Phase**: In this phase, the reconciler creates a new version of the fiber tree based on the current state of the application. This phase is where the diffing algorithm is used to determine the differences between the two versions of the tree.
2. **Commit Phase**: In this phase, the reconciler applies the changes to the DOM and updates the UI to reflect the changes in the application state. This phase is where the changes are actually made to the UI.
3. **Layout Phase**: In this phase, the reconciler calculates the layout of the elements in the UI and determines their position and size. This phase is where the layout of the UI is determined.
4. **Paint Phase**: In this phase, the reconciler paints the elements on the screen and renders the final version of the UI. This phase is where the final version of the UI is rendered on the screen.
5. **Commit Phase**: In this phase, the reconciler applies the changes to the DOM and updates the UI to reflect the changes in the application state. This phase is where the changes are actually made to the UI.
6. **Cleanup Phase**: In this phase, the reconciler cleans up any resources that were used during the reconciliation process. This phase is where any resources that are no longer needed are released.
7. **Idle Phase**: In this phase, the reconciler waits for the next update to the UI. This phase is where the reconciler waits for the next update to the UI.
8. **Timeout Phase**: In this phase, the reconciler handles any updates that have timed out. This phase is where the reconciler handles any updates that have taken too long to process.
9. **Error Phase**: In this phase, the reconciler handles any errors that occur during the reconciliation process. This phase is where the reconciler handles any errors that occur during the reconciliation process.
10. **Suspense Phase**: In this phase, the reconciler handles any suspense that occurs during the reconciliation process. This phase is where the reconciler handles any suspense that occurs during the reconciliation process.
11. **Fallback Phase**: In this phase, the reconciler handles any fallbacks that occur during the reconciliation process. This phase is where the reconciler handles any fallbacks that occur during the reconciliation process.
12. **Retry Phase**: In this phase, the reconciler handles any retries that occur during the reconciliation process. This phase is where the reconciler handles any retries that occur during the reconciliation process.
13. **Abort Phase**: In this phase, the reconciler handles any aborts that occur during the reconciliation process. This phase is where the reconciler handles any aborts that occur during the reconciliation process.
14. **Complete Phase**: In this phase, the reconciler completes the reconciliation process and updates the UI to reflect the changes in the application state. This phase is where the reconciliation process is completed and the UI is updated.

# Fiber Reconciliation Strategies
The fiber reconciler uses several strategies to optimize the reconciliation process and make it more efficient. Some of the strategies used by the reconciler include:

1. **Batching Updates**: The reconciler batches updates to the UI to reduce the number of re-renders and make the process more efficient.
2. **Incremental Rendering**: The reconciler uses incremental rendering to update the UI in small, incremental steps, rather than all at once.
3. **Priority Scheduling**: The reconciler uses priority scheduling to determine which updates should be processed first, based on the urgency of the update and the resources available.
4. **Concurrent Mode**: The reconciler uses concurrent mode to process updates to the UI in a non-blocking manner, allowing the user to interact with the UI while updates are being processed.
5. **Memoization**: The reconciler uses memoization to cache the results of expensive computations and avoid unnecessary re-computation.
6. **Component Reuse**: The reconciler reuses components whenever possible to reduce the number of re-renders and make the process more efficient.
7. **Virtual DOM**: The reconciler uses a virtual DOM to represent the UI elements in memory and update the DOM only when necessary.
8. **Component State**: The reconciler uses component state to track the state of the UI elements and update them in response to changes in the application state.
9. **Component Lifecycle Methods**: The reconciler uses component lifecycle methods to perform tasks at specific points in the reconciliation process, such as before the component is mounted or unmounted.
10. **Component Refs**: The reconciler uses component refs to reference elements in the UI and interact with them directly.
11. **Component Context**: The reconciler uses component context to share data between components and avoid prop drilling.
12. **Component Props**: The reconciler uses component props to pass data from parent components to child components and update the UI in response to changes in the application state.
13. **Component Children**: The reconciler uses component children to render nested components and create complex UI structures.
14. **Component Default Props**: The reconciler uses component default props to provide default values for props that are not specified by the parent component.
15. **Component Display Name**: The reconciler uses component display name to provide a human-readable name for the component in debugging tools.
16. **Component Error Boundary**: The reconciler uses component error boundaries to catch and handle errors that occur during the reconciliation process.
17. **Component Suspense**: The reconciler uses component suspense to suspend rendering and display a loading indicator while data is being fetched.
18. **Component Fallback**: The reconciler uses component fallback to display a fallback UI when an error occurs during the reconciliation process.
19. **Component Retry**: The reconciler uses component retry to retry rendering when an error occurs during the reconciliation process.
20. **Component Abort**: The reconciler uses component abort to cancel rendering when an error occurs during the reconciliation process.
21. **Component Complete**: The reconciler uses component complete to complete the reconciliation process and update the UI to reflect the changes in the application state.
22. **Component Update**: The reconciler uses component update to update the UI in response to changes in the application state.
23. **Component Mount**: The reconciler uses component mount to mount the component in the DOM and render it on the screen.
24. **Component Unmount**: The reconciler uses component unmount to unmount the component from the DOM and remove it from the screen.
25. **Component Update Queue**: The reconciler uses component update queue to queue updates to the UI and process them in a prioritized order.
26. **Component Update Priority**: The reconciler uses component update priority to determine the priority of updates to the UI and process them accordingly.
27. **Component Update Timeout**: The reconciler uses component update timeout to handle updates that have timed out and process them accordingly.
28. **Component Update Error**: The reconciler uses component update error to handle errors that occur during the reconciliation process and process them accordingly.
29. **Component Update Suspense**: The reconciler uses component update suspense to handle suspense that occurs during the reconciliation process and process it accordingly.
30. **Component Update Fallback**: The reconciler uses component update fallback to handle fallbacks that occur during the reconciliation process and process them accordingly.
31. **Component Update Retry**: The reconciler uses component update retry to handle retries that occur during the reconciliation process and process them accordingly.
32. **Component Update Abort**: The reconciler uses component update abort to handle aborts that occur during the reconciliation process and process them accordingly.
33. **Component Update Complete**: The reconciler uses component update complete to handle complete the reconciliation process and update the UI to reflect the changes in the application state.
34. **Component Update Layout**: The reconciler uses component update layout to calculate the layout of the elements in the UI and determine their position and size.
35. **Component Update Paint**: The reconciler uses component update paint to paint the elements on the screen and render the final version of the UI.
36. **Component Update Cleanup**: The reconciler uses component update cleanup to clean up any resources that were used during the reconciliation process.
37. **Component Update Idle**: The reconciler uses component update idle to wait for the next update to the UI.

# Fiber Diffing Algorithm Strategies
The fiber diffing algorithm uses several strategies to optimize the diffing process and make it more efficient. Some of the strategies used by the diffing algorithm include:

1. **Tree Reconciliation**: The diffing algorithm uses tree reconciliation to compare two versions of the fiber tree and determine the differences between them.
2. **Element Comparison**: The diffing algorithm uses element comparison to compare individual elements in the fiber tree and determine which elements need to be added, removed, or updated.
3. **Keyed Diffing**: The diffing algorithm uses keyed diffing to compare elements based on their keys and determine which elements need to be added, removed, or updated.
4. **Component Reconciliation**: The diffing algorithm uses component reconciliation to compare components in the fiber tree and determine which components need to be added, removed, or updated.
5. **Component Comparison**: The diffing algorithm uses component comparison to compare individual components in the fiber tree and determine which components need to be added, removed, or updated.
6. **Component Keyed Diffing**: The diffing algorithm uses component keyed diffing to compare components based on their keys and determine which components need to be added, removed, or updated.
7. **Element Reconciliation**: The diffing algorithm uses element reconciliation to compare elements in the fiber tree and determine which elements need to be added, removed, or updated.
8. **Element Comparison**: The diffing algorithm uses element comparison to compare individual elements in the fiber tree and determine which elements need to be added, removed, or updated.
9. **Element Keyed Diffing**: The diffing algorithm uses element keyed diffing to compare elements based on their keys and determine which elements need to be added, removed, or updated.

# Fiber Diffing Algorithm Phases
The fiber diffing algorithm is divided into several phases, each of which performs a specific task in the diffing process. The phases are:

1. **Element Reconciliation Phase**: In this phase, the diffing algorithm compares elements in the fiber tree and determines which elements need to be added, removed, or updated.
2. **Component Reconciliation Phase**: In this phase, the diffing algorithm compares components in the fiber tree and determines which components need to be added, removed, or updated.
3. **Tree Reconciliation Phase**: In this phase, the diffing algorithm compares two versions of the fiber tree and determines the differences between them.
4. **Keyed Diffing Phase**: In this phase, the diffing algorithm compares elements based on their keys and determines which elements need to be added, removed, or updated.
5. **Element Comparison Phase**: In this phase, the diffing algorithm compares individual elements in the fiber tree and determines which elements need to be added, removed, or updated.
6. **Component Comparison Phase**: In this phase, the diffing algorithm compares individual components in the fiber tree and determines which components need to be added, removed, or updated.
7. **Element Keyed Diffing Phase**: In this phase, the diffing algorithm compares elements based on their keys and determines which elements need to be added, removed, or updated.
8. **Component Keyed Diffing Phase**: In this phase, the diffing algorithm compares components based on their keys and determines which components need to be added, removed, or updated.
9. **Element Update Phase**: In this phase, the diffing algorithm updates elements in the fiber tree to reflect the changes in the application state.
10. **Component Update Phase**: In this phase, the diffing algorithm updates components in the fiber tree to reflect the changes in the application state.
11. **Tree Update Phase**: In this phase, the diffing algorithm updates the fiber tree to reflect the changes in the application state.
12. **Keyed Update Phase**: In this phase, the diffing algorithm updates elements based on their keys to reflect the changes in the application state.
13. **Element Update Queue Phase**: In this phase, the diffing algorithm queues updates to elements in the fiber tree and processes them in a prioritized order.
14. **Component Update Queue Phase**: In this phase, the diffing algorithm queues updates to components in the fiber tree and processes them in a prioritized order.
15. **Tree Update Queue Phase**: In this phase, the diffing algorithm queues updates to the fiber tree and processes them in a prioritized order.
16. **Keyed Update Queue Phase**: In this phase, the diffing algorithm queues updates to elements based on their keys and processes them in a prioritized order.
17. **Element Update Priority Phase**: In this phase, the diffing algorithm determines the priority of updates to elements in the fiber tree and processes them accordingly.
18. **Component Update Priority Phase**: In this phase, the diffing algorithm determines the priority of updates to components in the fiber tree and processes them accordingly.
19. **Tree Update Priority Phase**: In this phase, the diffing algorithm determines the priority of updates to the fiber tree and processes them accordingly.
20. **Keyed Update Priority Phase**: In this phase, the diffing algorithm determines the priority of updates to elements based on their keys and processes them accordingly.
21. **Element Update Timeout Phase**: In this phase, the diffing algorithm handles updates to elements that have timed out and processes them accordingly.
22. **Component Update Timeout Phase**: In this phase, the diffing algorithm handles updates to components that have timed out and processes them accordingly.
23. **Tree Update Timeout Phase**: In this phase, the diffing algorithm handles updates to the fiber tree that have timed out and processes them accordingly.
24. **Keyed Update Timeout Phase**: In this phase, the diffing algorithm handles updates to elements based on their keys that have timed out and processes them accordingly.
25. **Element Update Error Phase**: In this phase, the diffing algorithm handles errors that occur during the update process and processes them accordingly.
26. **Component Update Error Phase**: In this phase, the diffing algorithm handles errors that occur during the update process and processes them accordingly.
27. **Tree Update Error Phase**: In this phase, the diffing algorithm handles errors that occur during the update process and processes them accordingly.
28. **Keyed Update Error Phase**: In this phase, the diffing algorithm handles errors that occur during the update process and processes them accordingly.
29. **Element Update Suspense Phase**: In this phase, the diffing algorithm handles suspense that occurs during the update process and processes it accordingly.
30. **Component Update Suspense Phase**: In this phase, the diffing algorithm handles suspense that occurs during the update process and processes it accordingly.
31. **Tree Update Suspense Phase**: In this phase, the diffing algorithm handles suspense that occurs during the update process and processes it accordingly.
32. **Keyed Update Suspense Phase**: In this phase, the diffing algorithm handles suspense that occurs during the update process and processes it accordingly.
33. **Element Update Fallback Phase**: In this phase, the diffing algorithm handles fallbacks that occur during the update process and processes them accordingly.
34. **Component Update Fallback Phase**: In this phase, the diffing algorithm handles fallbacks that occur during the update process and processes them accordingly.

