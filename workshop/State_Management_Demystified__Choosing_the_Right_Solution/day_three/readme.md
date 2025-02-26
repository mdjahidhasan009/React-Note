# Unidirectional State Management

## What is a Unidirectional State?

Unidirectional state means that data flows in one direction, following a predictable pattern. In React and other state 
management libraries like Redux, Zustand. This concept ensures that changes in state always follow a clear, structured
path.

## How Does Unidirectional State Work?

* **Data Flows Down**
    * The state is stored in a single source of truth (like Redux store, Zustand store).
    * This state is passed down to child components.
* **Actions Trigger State Updates**
    * A user interacts with the UI (e.g., clicking a button).
    * The event dispatches an action (like Redux dispatch).
    * The state updates and the changes flow back down to the UI.
* **Immutable State Updates**
    * The state is updated immutably (e.g., using the spread operator or using `immer`).
    * This ensures that the original state is not mutated.

There are many popular unidirectional global state management solutions available, such as Redux and Zustand. Let’s see 
how they work in code with a simple user state.

### Zustand

Zustand is a fast, scalable, and minimalistic state management library for React. Unlike Redux, it doesn’t require 
reducers, actions, or a lot of boilerplate. It allows you to create a global state using a simple hook-based API.

#### Zustand Store

```typescript
import { User } from "../type";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

type Store = {
  user: User | null;
  demoString: string | null;
};

type Actions = {
  logIn: (user: User) => void;
  logOut: () => void;
  updateDemoString: (demoString: string) => void;
};

type ComposeStateType = Store & Actions;

// Store
export const useUserStore = create<ComposeStateType>((set) => ({
  user: null,
  demoString: null,
  logIn: (user: User) => {
    set({ user });
  },
  logOut: () => {
    set({ user: null });
  },
  updateDemoString: (demoString: string) => {
    set((state) => ({ ...state, demoString }));
  },
}));

// Store Example with persist and immer middleware
export const useUserStore2 = create(
  persist(
    immer<ComposeStateType>((set) => ({
      user: null,
      demoString: null,
      logIn: (user: User) => {
        set((state) => {
          state.user = user;
        });
      },
      logOut: () => {
        //   set({ user: null });
        set((state) => {
          state.user = null;
        });
      },
      updateDemoString: (demoString: string) => {
        // set((state) => {});
        set((state) => {
          state.demoString = demoString;
        });
      },
    })),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

#### Zustand Client code
```ts
import { useUserStore } from "./useStore";

export const ZustandUserDetails = () => {
  // if we use state like without selector then if any state changed in store then all the component which using the 
  // store will re-render dispite of the state there is not change on the state which is used in the component  
  //   const { user, logIn, logOut, updateDemoString } = useUserStore(); 
  
  // as we use selector so only if user, logIn, logOut, updateDemoString state changed then only this component will 
  // re-render  
  const user = useUserStore((state) => state.user);
  const logIn = useUserStore((state) => state.logIn);
  const logOut = useUserStore((state) => state.logOut);
  const updateDemoString = useUserStore((state) => state.updateDemoString);

  const handleLogin = async (userId: string) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const user = await response.json();
    logIn(user);
  };

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <br />
      <button onClick={() => handleLogin("1")}>Log In</button>
      <button onClick={logOut}>Log Out</button>
      <br />
      <button onClick={() => updateDemoString("Hello world" + Math.random())}>
        Update Demo String
      </button>
    </div>
  );
};
```

### Redux
#### Redux client Code
```ts
// Redux Provider Component
import React, { FC } from "react";
import { Provider } from "react-redux";
import store from "./useStore";

type ReducerWrapperType = {
  children: React.ReactNode;
};

export const ReduxWrapper: FC<ReducerWrapperType> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

// UserDetail.tsx
import React from "react";
import { logIn, logOut, useAppDispatch, useAppSelector } from "./useStore";

export const ReduxUserDetails = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    const response = await fetch(
      "[https://jsonplaceholder.typicode.com/users/1](https://jsonplaceholder.typicode.com/users/1)"
    );
    const userData = await response.json();
    dispatch(logIn(userData));
  };

  return (
    <div>
      {JSON.stringify(user, null, 2)}
      <button onClick={handleLogin}>Log In</button>
      <button onClick={() => dispatch(logOut())}>Log Out</button>
    </div>
  );
};

// App.tsx
<ReduxWrapper>
  <ReduxUserDetails />
</ReduxWrapper>
```

### Redux vs. Zustand:

| Feature                 | Redux                                 | Zustand                            |
|:------------------------|:--------------------------------------|:-----------------------------------|
| Store Structure         | Uses a single global store            | Supports multiple stores           |
| Provider                | Required (<Provider>)                 | Not required                       |
| API Complexity          | Uses Redux Toolkit for simplification | Has a streamlined API              |
| Remote State Management | Supports with RTK Query               | ❌ Not built-in                     |
| State Updates           | Dispatch actions                      | Uses set() callback                |
| Selectors               | Uses useSelector()                    | Uses selectors directly            |








# Atomic State

## What is an Atomic State?

An atomic state is a small, independent piece of state that can be composed together to build complex state management. 
These atoms are globally accessible, meaning any component can import, read, and write data without causing unnecessary 
re-renders in unrelated parts of the application.

### When to Use Atomic State (Recoil, Jotai)?

* Granular State Updates – Only update the necessary pieces of state without re-rendering the whole component tree.
* Independent, Composable State – Small, isolated state units (atoms) that can be combined dynamically.
* Globally Accessible State – Any component can read/write atoms without prop drilling or context.
* Shared UI State – Great for managing UI-related states like modals, filters, themes, or form steps.

**Note**: 

Like Excel cells while we are typing in one cell it shows that in the function bar(fx) and also in the cell. For 
this, we can use the atomic state so only the cell which is typing and the function bar at the top will re-render not 
the whole sheet.

In draw.io when we change anything there is a badge in the top right corner which shows `unsaved changes. Click here to
save`.We need to use atomic state for this so only the badge will re-render not drawing area.

There are two popular libraries to manage Atomic State:

* Jotai
* Recoil

Their goal is the same: to maintain an atomic state, but the underlying implementations differ. Let’s see how they work 
in code with a simple user state.

## Jotai

Jotai is a primitive and flexible atomic state management library for React, designed to be simple yet powerful. 
Inspired by Recoil, it provides fine-grained reactivity while keeping things minimal and easy to use.

### Jotai Store

```typescript
// userAtom.ts
import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { User } from "../../type";

// Notmal Store
export const userAtom = atom<User | null>(null);

// Persited
export const darkModeAtom = atomWithStorage("darkMode", false);
```

### Jotai Client Code

```ts
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React from "react";
import { userAtom } from "./userAtoms";

export const JotaiUserDetails = () => {
  // normal approach look like react useState
  // const [user, setuser] = useAtom(userAtom);

  // with selector
  const user = useAtomValue(userAtom);
  const setuser = useSetAtom(userAtom);

  const updateuserHandler = () => {
    setuser({ id: 1, name: "rasel", email: "exmaple@example.com" });
  };

  return (
    <div>
      user: {JSON.stringify(user, null, 2)}
      <br />
      <button onClick={updateuserHandler}> Update User</button>
    </div>
  );
};
```

## Recoil
Recoil is a state management library for React that is designed to handle shared state across components efficiently. It 
introduces the concept of atoms (units of state) and selectors (derived state), allowing fine-grained reactivity with
minimal re-renders. 

### Recoil Store
```ts
import { atom } from "recoil";
import type { User } from "./types";

export const userAtom = atom<User | null>({
  key: "userState",
  default: null, // Initially, no user is logged in
});
```

### Recoil Client Code
```ts
import { useRecoilState } from "recoil";
import { userAtom } from "./userAtom";
import type { User } from "./types"; // Import the User type

const UserProfile = () => {
  const [user, setUser] = useRecoilState(userAtom);

  const login = () => {
    const newUser: User = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      role: "admin",
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div>
      <h2>User: {user ? user.name : "Guest"}</h2>
      <p>Email: {user?.email || "Not logged in"}</p>
      <p>Role: {user?.role || "N/A"}</p>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
};

export default UserProfile;
```

| Feature                 | Recoil                                  | Jotai                                |
|:------------------------|:----------------------------------------|:-------------------------------------|
| Re-render Behavior      | Tracks dependencies using a graph       | Uses shallow comparison to re-render |
| Provider Requirement    | Required (RecoilRoot)                   | Not required (but can be used)       |
| Persistence             | Has built-in persistence                | Has built-in persistence             |
| API Complexity          | More structured but slightly complex    | Minimalistic and simple              |
| Selectors               | Supports selectors                      | Supports selectors                   |




# Proxy-State

**Proxy state** is a **reactive state management** approach where the state is wrapped inside a **JavaScript Proxy**. 
Instead of directly modifying the state, a proxy intercepts the changes and ensures updates are efficiently handled 
without unnecessary re-renders. Like if one component use `user.name` and another component use `user.email` and if we
change the `user.name` then only the component which is using `user.name` will re-render not the `user.email` component.
Which is not possible in the global state management like Zustand, Redux and atomic state management like Recoil, Jotai.

## When to Use Proxy State?

* Large, deeply nested objects – E.g., game states, dashboards, or forms.
* Fine-grained reactivity – When you want **only affected components** to update, avoiding unnecessary re-renders.
* Mutable-friendly workflows – When you prefer **direct state mutation** over immutable patterns.
* Real-time, collaborative apps – For **real-time updates** and **optimistic UI** where state changes are frequent like
  in millisecond.

There are two popular libraries to manage Atomic State

* Mobx
* Valtio

In this example, we will see how we can handle the proxy state using Valtio

## Valtio

Valtio is a proxy-based state management library for React that allows you to manage state in a mutable yet reactive
way. It uses JavaScript Proxy to automatically track state changes and trigger re-renders only where needed.

### Voltio Store

```typescript
// useStore.tsx
import { User } from "../../type";
import { proxy } from "valtio";

type UserState = {
  user: User | null;
};

export const userState = proxy<UserState>({
  user: null,
});

export const updateAuthUser = (payload: User, type: "login" | "logout") => {
  switch (type) {
    case "login": {
      userState.user = payload;
      break;
    }
    case "logout": {
      userState.user = null;
      break;
    }
    default:
      break;
  }
};

export const updateUserName = (userName: string) => {
  if (!userState.user) return;
  userState.user.name = userName;
};
```

### client Code

```ts
import React from "react";
import { useSnapshot } from "valtio";
import { updateAuthUser, updateUserName, userState } from "./useStore";

export const ValtiouserDetails = () => {
  const { user } = useSnapshot(userState);

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button
        onClick={() => {
          updateAuthUser(
            {
              id: 1,
              name: "John Doe",
              email: "john@doe.com",
            },
            "login"
          );
        }}
      >
        Log In
      </button>
      <button onClick={() => updateAuthUser({}, "logout")}>Log Out</button>
    </div>
  );
};
```

### When Should You Use Valtio?

**For Mutability-Friendly Workflows**

Unlike Redux or Zustand (which require immutability), Valtio allows direct state mutation while still being reactive.

**For Real-Time, Game, or Collaborative Apps**

Its proxy-based nature makes it great for real-time updates.
