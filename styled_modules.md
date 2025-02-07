# Style Modules
Style modules are a way to organize your styles in a modular way. This is especially useful when you have a large 
project with many components and styles.

## How to Structure Style Modules
The structure of style modules is similar to the structure of components. You can structure your style modules in the 
following way:

```
src/
├── styles/
│   ├── base/
│   │   ├── _base.scss
│   │   ├── _typography.scss
│   │   └── _variables.scss
│   ├── components/
│   │   ├── _button.scss
│   │   ├── _input.scss
│   │   └── _modal.scss
│   ├── layout/
│   │   ├── _grid.scss
│   │   ├── _header.scss
│   │   └── _footer.scss
│   ├── themes/
│   │   ├── _dark.scss
│   │   └── _light.scss
│   └── main.scss
```

### References
* [reactjs-interview-questions - github](https://github.com/sudheerj/reactjs-interview-questions)