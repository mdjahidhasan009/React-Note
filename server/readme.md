# `ReactDOMServer`
The `ReactDOMServer` object enables you to render components to static markup (typically used on node server). This
object is mainly used for server-side rendering (SSR). The following methods can be used in both the server and browser 
environments:

* `renderToString()`
* `renderToStaticMarkup()`

For example, you generally run a Node-based web server like Express, Hapi, or Koa, and you call `renderToString` to 
render your root component to a string, which you then send as response.

```jsx
// using Express
import { renderToString } from "react-dom/server";
import MyPage from "./MyPage";

app.get("/", (req, res) => {
  res.write(
    "<!DOCTYPE html><html><head><title>My Page</title></head><body>"
  );
  res.write('<div id="content">');
  res.write(renderToString(<MyPage />));
  res.write("</div></body></html>");
  res.end();
});
```


### Rendering React on Node Server
React is already equipped to handle rendering on Node servers. A special version of the DOM renderer is available, which
follows the same pattern as on the client side.

```jsx
import ReactDOMServer from "react-dom/server";
import App from "./App";

ReactDOMServer.renderToString(<App />);
```
This method will output the regular HTML as a string, which can be then placed inside a page body as part of the server
response. On the client side, React detects the pre-rendered content and seamlessly picks up where it left off.

### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions?tab=readme-ov-file#what-is-react)