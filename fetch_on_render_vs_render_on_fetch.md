
# Fetch-on-render

## Client Side

1. User Fetches HTML
2. User Parses HTML, fetches JS
3. JS renders component, requests `userInfo` from the server
    - Requests `userInfo` data from the server.

---

## Server Side

4. **Server** identifies the user from the `userInfo` request.
    - Sends back `userInfo` to the Client Side.

---

## Client Side (continued)

5. `<AppShell>` completes rendering, `<FriendsList>` render starts.
    - Requests `FriendsList` data from the server.

---

## Server Side

6. **Server** identifies user again and fetches the `FriendsList` data.
    - Sends back `FriendsList` to the Client Side.

---

## Client Side (continued)

7. `<FriendsList>` finishes rendering, individual `<Friend />` components start rendering.
    - Requests each friend's data from the server.

---

## Server Side

8. **Server** identifies user once more and fetches individual `Friend` data.
    - Sends back `Individual Friends` data.

---

## Client Side (final)

9. Renders individual friends, completing the render process.

---

**Finally, finish render!**

## Pros:
- **Simplicity**: Easy to understand and implement since data fetching happens after the component renders.
- **Clear separation of concerns**: UI rendering and data fetching are cleanly separated, making it easier to manage changes independently.
- **Incremental updates**: Useful when you want to load pieces of data in a step-by-step manner (e.g., rendering a shell first, then filling in details).

## Cons:
- **Increased Latency**: Fetching data only after rendering introduces additional delays, as the user has to wait for the first render, then for the data to load.
- **More network requests**: If you're rendering multiple child components (like `FriendItem`), each can trigger its own network request, adding load to the server and increasing overall latency.
- **Waterfall effect**: Data dependencies are fetched one after another, which can lead to a slower experience as users wait for the entire process to complete.

---

# Render-while-fetch

## Client Side

1. User Fetches HTML
2. User Parses HTML, fetches JS, and waits for data.
    - Requests `userInfo` from the server.

---

## Server Side

3. **Server** identifies the user.
    - Sends back `userInfo` to the Client Side.

---

## Client Side (continued)

4. JS renders `<AppShell />`
5. Begins rendering `<FriendsList />` with all friends.

---

## Server Side

6. **Server** sends back `FriendsList` and also the data for individual friends.
    - `FriendsList` data fetched.
    - Individual Friends data fetched.

---

## Client Side (final)

7. Render `<FriendsList />` with all friends too.

---

**Finally, finish render!**

## Pros:
- **Faster User Experience**: By starting the fetch process early and rendering data progressively, it feels faster to the user as some data is available earlier.
- **Better parallelization**: Fetches are initiated as early as possible and can occur in parallel, reducing overall loading time.
- **Reduced Latency**: Rendering and fetching happen together, decreasing the time until the user sees something meaningful on the page.

## Cons:
- **Complexity**: Managing multiple states for loading, fetching, and rendering simultaneously requires more advanced logic and state management.
- **Inconsistent states**: Since rendering happens before fetching completes, there might be cases where parts of the UI render with incomplete or outdated data.
- **Error handling**: Dealing with errors during progressive fetching can be tricky as different parts of the UI might be fetching different data at the same time.

---


# References
* [The "Wrong Way" To Use React](https://www.youtube.com/watch?v=lcLbYictX3k)
* [Component, colocation, composition: A note on the state of React](https://bobaekang.com/blog/component-colocation-composition/)-
