<img src=".github/img/logo.svg" width="80px" align="right" />

# Lucia

> Currently in heavy development. Do not use in production

Tiny javascript library for web applications.

## Install

Put this at the end of your body or in your head tags.

```html
<script src="https://unpkg.com/lucia"></script>
```

## Usage

Templating:

```html
<div id="app">
  <p>{{ hello }}</p>
  <p>{{ hello === 'world' }}</p>
</div>
<script src="https://unpkg.com/lucia"></script>
<script>
  const lucia = new Lucia({
    el: '#app',
    data: {
      hello: 'world',
    },
  });

  lucia.$data.hello = 'there'; // Change data
</script>
```

Event Handlers:

```html
<div id="app">
  <button l-on:click="alert(message)">{{ message }}</button>
  <button l-on:click="alert(message)">{{ message }}</button>
</div>
<script src="https://unpkg.com/lucia"></script>
<script>
  const lucia = new Lucia({
    el: '#app',
    data: {
      message: 'hello world',
    },
  });
</script>
```

Visibility:

```html
<div id="app">
  <button l-if="show">You can't see me</button>
  <button l-if="equal === equal">Is it equal though?</button>
</div>
<script src="https://unpkg.com/lucia"></script>
<script>
  const lucia = new Lucia({
    el: '#app',
    data: {
      equal: true,
      show: false,
    },
  });
</script>
```

Binding:

```html
<div id="app">
  <h1 l-bind:class="{ hello: show }">Classes are cool</h1>
  <h1 l-bind:style="color">Styles are sassy</h1>
</div>
<script src="https://unpkg.com/lucia"></script>
<script>
  const lucia = new Lucia({
    el: '#app',
    data: {
      show: true,
      color: { color: 'purple' },
    },
  });
</script>
```
