# Introducing Remote / Server State

## What is Remote / Server State in React?

Remote (or Server) State in React refers to data that is fetched from an external source, such as an API, database, or
third-party service. Unlike local state (managed by `useState` or `useReducer`), remote state:

* **Lives outside your application** (e.g., in a backend server).
* **Changes asynchronously**, often affected by multiple users or systems.
* **Requires synchronization** between the client and the server to prevent stale data.

### Challenges of Managing Remote State Manually

Before libraries like SWR and React Query, handling remote state in React was tedious and error-prone. Some common
issues were:

* **Loading, Error & Success Handling** – Every API call required manual state handling (loading, error, data).
* **Cache Management** – Developers had to implement caching manually to avoid unnecessary API calls.
* **Stale Data** – Keeping data fresh while reducing network requests was tricky.
* **Manual Synchronization** – Updating UI when data changes on the server required event listeners or polling.
* **Global State Overuse** – Developers often used state management libraries (Redux, MobX) to store API data, even when
  caching solutions were more appropriate.

Instead of treating API responses as part of the global state, libraries like SWR (by Vercel) and React Query (by 
TanStack) introduce a more efficient way to manage remote state with:

* Automatic Caching & Background Syncing
* Stale-While-Revalidate Strategy (Fetching fresh data while using cached data)
* Refetching on Focus / Reconnect
* Optimistic Updates & Mutation Management

**Case Studies:**

* https://www.qovery.com/blog/why-we-replaced-redux-by-react-query/
* https://tanstack.com/query/v4/docs/framework/react/guides/does-this-replace-client-state

**SWR vs. React Query: When to Pick What?**

| Criteria                                   | SWR (Vercel) – Lightweight & Simple                                      | React Query (TanStack) – Feature-Rich Powerhouse                                |
|:-------------------------------------------|:-------------------------------------------------------------------------|:--------------------------------------------------------------------------------|
| Simplicity & Ease of Use                   | Extremely easy to set up, minimal API surface                            | More configuration required, but highly customizable                            |
| Bundle Size & Performance                  | Smaller & lightweight, perfect for performance-sensitive apps            | Slightly larger due to advanced features                                        |
| DevTools & Debugging                       | No built-in DevTools                                                     | Comes with powerful DevTools for monitoring queries                             |
| Data Fetching (GET Requests)               | Best for simple GET requests with caching                                | Handles all data fetching patterns, including polling & streaming               |
| API Support (POST, PUT, DELETE)            | Basic support for mutations                                              | Advanced mutation support with optimistic updates & retries                     |
| Cache Management                           | Basic auto-caching & revalidation                                        | More granular cache control, background refetching, persistence                 |
| Automatic Refetching                       | Stale-while-revalidate (background refresh)                              | More control over refetching (on window focus, intervals, etc.)                 |
| Pagination & Infinite Queries              | Supported, but requires more manual handling                             | Fully featured pagination, infinite queries & auto-fetching                     |
| Optimistic UI Updates                      | Requires manual implementation                                           | Built-in support for optimistic updates                                         |
| Server State Management                    | Lightweight server-state handling                                        | Advanced server-state management with more fine-tuned control                   |
| SSR (Next.js / Remix / RSC)                | Built by Vercel, works seamlessly with Next.js                           | Works well with SSR but requires extra setup                                    |
| Offline Support & Persistence              | No built-in offline support                                              | Advanced offline support & query persistence                                    |
| Complex Global State Replacements          | Good for replacing simple global states                                  | Best for replacing Redux/Zustand in large apps                                  |
| When NOT to Use?                           | Avoid if you need mutations, optimistic updates, or complex state        | Overkill for simple API fetching needs                                          |

### Query Params as State

Can we preserve the state?
Can we share the current state with anyone?
If we change route and click back or forward button or we refresh the page, can we have our state back?
Can we share state across multiple components without props drilling or any state management system/library?
Yes we can. There is a powerful concept. Which is Query Params.

#### Pros

* **No Props Drilling**
    * Explanation:
        * Since query parameters are accessible globally through the router (useSearchParams in React Router or 
          next/router in Next.js), you don't need to pass state as props through multiple components.
        * This eliminates prop drilling, making the state easier to access from any component in the hierarchy.
* **No Subscription for Updating State**
    * Explanation:
        * Unlike global state management tools like Redux or Context, where components subscribe to changes (which can 
          cause unnecessary re-renders), query parameters update only when needed through the router.
        * This avoids overhead from subscribing to global state.
* **It Can Be Produced From the Router**
    * Explanation:
        * The state is not stored separately; it can be derived directly from the router, making the application more 
          predictable.
        * You can always reconstruct the state from the URL without needing extra setup.
* **Transferable**
    * Explanation:
        * Query parameters persist in the URL, making them transferable across:
            * Different devices
            * Different users
            * Server-side and client-side logic
        * Example:
            * A user applying filters (?category=shoes&price=low) can share the link, and another user can open the same filtered view without extra interactions.
            * If switching between devices, users retain their preferences as long as they have the URL.

#### Cons

* **By Mistake, Sensitive Data Can Be Shared**
    * Explanation:
        * Query parameters are visible in the URL, meaning any sensitive data included can be:
            * Shared accidentally (e.g., copying and pasting the URL)
            * Stored in browser history
            * Logged in server request logs
            * Captured by third-party analytics tools
        * If a user shares the URL, they might leak authentication tokens, user IDs, or private info.
        * Cookies & headers are better for handling sensitive data instead of query params.
    * Solution:
        * Never store authentication tokens, passwords, or PII in query parameters.
        * Use secure headers (like Authorization in HTTP requests).
        * Use hashed or encrypted identifiers instead of plain values.
* **Need to Trim Query Parameter Names (Obfuscation)**
    * Explanation:
        * If query params contain business logic or implementation details, they can be reverse-engineered easily.
        * Hackers or competitors could analyze them to understand how your app works.
        * Example (BAD practice)
            * https://example.com/search?filter=highValueCustomers
            * This exposes that there’s a special filter for high-value customers, which competitors or attackers might exploit.
    * Solution:
        * Use shortened or coded parameter names to prevent easy understanding.
        * Example (Better approach)
            * https://example.com/search?f=hvc
            * This makes it harder to guess the purpose of the param while still maintaining functionality.
* **URL Has a 2048-Character Limit (Not Unlimited)**
    * Explanation:
        * Most browsers (especially older ones like Internet Explorer) have a 2048-character limit for URLs.
        * Storing too much data in query parameters breaks the URL and can lead to truncated or lost data.
        * Example (Too long )
            * https://example.com/search?query=this-is-a-really-really-long-text-blah-blah-blah...&filters=category,electronics,clothing,furniture,beauty,health,sports
            * This will fail in some browsers if it exceeds the limit.
    * Solution:
        * Store large data in state, localStorage, or IndexedDB instead of query parameters.
        * Use short keys & values to keep the query string minimal.
        * Use POST requests instead of GET if the data is too large to fit in the URL.
