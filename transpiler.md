# React Transpiler (Babel & Alternatives)

## Does React Use a Transpiler?
Yes, React uses a transpiler to convert modern JavaScript (including JSX) into browser-compatible code. Historically, **Babel** has been the primary transpiler used in React projects.

## Babel in Create React App (CRA)
- **Create React App (CRA)** used Babel for transpiling JSX and modern JavaScript.
- Babel dependencies are **not explicitly listed** in `package.json` because CRA manages them internally via
  **`react-scripts`**.
- If you eject CRA (`npm run eject`), you'll see Babel dependencies like:
  ```json
  "@babel/core": "^7.x.x",
  "@babel/preset-react": "^7.x.x",
  "@babel/preset-env": "^7.x.x"
  ```

## Newer Alternatives to Babel
- **Next.js** uses **SWC (Speedy Web Compiler)** instead of Babel for better performance.
- **Vite** and other modern bundlers prefer **esbuild**, which is much faster than Babel.
- Babel is still widely used, but newer tools are optimizing performance by replacing it.

## Key Takeaways
- CRA used Babel, but it was hidden inside `react-scripts`.
- Ejecting CRA reveals the Babel dependencies.
- Newer frameworks (Next.js, Vite) are moving to faster alternatives like **SWC** and **esbuild**.

### References
* [reactjs-interview-questions - github](www.github.com/sudheerj/reactjs-interview-questions)