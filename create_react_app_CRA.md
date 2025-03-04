The create-react-app CLI tool allows you to quickly create & run React applications with no configuration step.

Let's create Todo App using CRA:
```shell
# Installation
$ npm install -g create-react-app

# Create new project
$ create-react-app todo-app
$ cd todo-app

# Build, test and run
$ npm run build
$ npm run test
$ npm start
```

It includes everything we need to build a React app:

* React, JSX, ES6, and Flow syntax support.
* Language extras beyond ES6 like the object spread operator.
* Autoprefixed CSS, so you don’t need -webkit- or other prefixes.
* CSS Reset/Normalize
* A fast interactive unit test runner with built-in support for coverage reporting.
* A live development server that warns about common mistakes.
* A build script to bundle JS, CSS, and images for production, with hashes and sourcemaps.
* An offline-first service worker and a web app manifest, meeting all the Progressive Web App criteria.



# Approaches to Include Polyfills in Create-React-App

There are approaches to include polyfills in create-react-app:

**Manual import from core-js:**

Create a file called (something like) `polyfills.js` and import it into the root `index.js` file. Run `npm install core-js` or `yarn add core-js` and import your specific required features.

```javascript
import "core-js/fn/array/find";
import "core-js/fn/array/includes";
import "core-js/fn/number/is-nan";
```

**Using Polyfill service:**

Use the polyfill.io CDN to retrieve custom, browser-specific polyfills by adding this line to `index.html`:

```html
<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Array.prototype.includes"></script>
```

In the above script, we had to explicitly request the `Array.prototype.includes` feature as it is not included in the default feature set.




# How to Use HTTPS Instead of HTTP in Create-React-App

You just need to use the `HTTPS=true` configuration. You can edit your `package.json` scripts section:

```json
"scripts": {
  "start": "set HTTPS=true && react-scripts start"
}
```

Or just run `set HTTPS=true && npm start`.



# How to Avoid Using Relative Path Imports in Create-React-App

Create a file called `.env` in the project root and write the import path:

```
NODE_PATH=src/app
```

After that, restart the development server. Now you should be able to import anything inside `src/app` without relative paths.


### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions?tab=readme-ov-file#what-is-react)