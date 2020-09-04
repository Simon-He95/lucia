<img src="https://github.com/luciadotjs/lucia/raw/master/.github/img/logo.svg" width="80px" align="right" />

# [Lucia](https://lucia.js.org) &middot; ![NPM Version](https://img.shields.io/npm/v/lucia?color=%23C454FF&style=flat-square) ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?color=%23E676AA&style=flat-square) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?color=%23FA8A7C&style=flat-square)

> Currently in heavy development (learning project). Do not use in production.

Lucia is a tiny JavaScript library for web applications.

- **Declarative:** Lucia makes it painless to create interactive UIs. Declarative views make your code more predictable, simpler to understand, and easier to debug.
- **Reactive:** When a data point is changed, the Virtual DOM will react and will update and render the points in realtime.
- **Data-Driven:** Instead of using traditional direct DOM manipulation, Lucia provides an interface to change data to mutate the DOM. 

## Installation

Put this within your `<head>` tags in html.

```html
<!-- development version, includes helpful console warnings -->
<script src="https://unpkg.com/lucia/dist/lucia.js"></script>
```

```html
<!-- production version, optimized for size and speed -->
<script src="https://unpkg.com/lucia"></script>
```

## Usage

### Declarative Rendering

At the core of Lucia is a system that enables us to declaratively render data to the DOM using straightforward template syntax:

```html
<div id="app">
  <p>{{ hello }}</p>
  <p>{{ hello === 'world' }}</p>
</div>
```

```js
const app = new Lucia({
  el: '#app',
  data: {
    hello: 'world',
  },
});

// Change data
app.data.hello = 'there';
```

You can also use the `l-html` directive for more advanced content manipulation.

```html
<div id="app">
  <p l-html="hello"></p>
</div>
```

```js
const app = new Lucia({
  el: '#app',
  data: {
    hello: '<button>Hello World</button>',
  },
});

// Change data
app.data.hello = 'there';
```

### Conditionals

It’s easy to toggle the presence of an element, too:

```html
<div id="app">
  <button l-if="show">You can't see me</button>
  <button l-if="show === show">Is it equal though?</button>
</div>
```

```js
const app = new Lucia({
  el: '#app',
  data: {
    show: false,
  },
});
```

### Event Handlers

To let users interact with your app, we can use the `l-on` directive to attach event listeners that invoke methods on our Lucia instances:

```html
<div id="app">
  <button l-on:click="announce()">{{ message }}</button>
</div>
```

```js
const app = new Lucia({
  el: '#app',
  data: {
    message: 'Hello world!',
    announce() {
      alert(this.message);
    }
  },
});
```

### Attribute Binding

In addition to text interpolation, we can also bind element attributes like this:

```html
<div id="app">
  <h1 l-bind:class="{ hello: show }">Classes are cool</h1>
  <h1 l-bind:style="color">Styles are sassy</h1>
</div>
```

```js
const app = new Lucia({
  el: '#app',
  data: {
    show: true,
    // You can also reference data vs inputing an object in the directive itself
    color: { color: 'purple' }, 
  },
});
```

## License

Lucia falls under the [MIT License](LICENSE.md).