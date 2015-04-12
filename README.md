![agentia-ping-handler logo][logo-image]
---
[![Build Status][travis-image]][travis-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
[![Test Coverage][coverage-image]][coverage-url]

A lazy dependency-injection framework for Node.js

## Installation
[![NPM version][npm-image]][npm-url]

**agentia-modular** is available on [npm][npm-url].

```js
npm install --save agentia-modular
```

## Usage
```js
var Modular = require('agentia-modular');
var modular = new Modular();

```

## Concepts
**agentia-modular** allows you to create a modular container where you can register assets. Some assets (ie. dependency-injectable function or factory) can require/depend on other assets. Since dependencies are lazily resolved, assets can be registered in any order, so long as all required dependencies are registered prior to asset resolution.

Within **agentia-modular** there are four (4) times assets that can be registered:

Asset Type | Description
---------- | -----------
`function` | This can be either a dependecy-injectable function (factory) or a simple non-injenctable function. This is determined by the `injectable` parameter during asset registration.
`module` | Any requirable Node.js module.<br>If the module returns a function, it can also be treated as a factory or a simple finction (see `function` above.)<br>If the module returns anything other than a function, it will be registered as a `constant` (see below).
`hash` | Any object hash, the properties of which will be treated and registered as individually registered.<br>If the property is a `function` it be treated as a function asset (see explanation above), otherwise it will be treated as a constant asset (see explanation below).
`constant` | Anything other than what is listed above (ie. `string`, `number`, `date`,  `array` or `object`). Objects registered as a `constant` will be registered as a single asset, unlike a `hash` which will register every property as a distinct asset.

> NOTE: Simple (non-injectable) function assets will always resolve to the actual function, where as factory (injectable) function assets will be injected with their required dependencies prior to resolution, will always resolve to their returned value.

## Core API

### .registerFunction()
Used to register a `function` asset.

```js
modular.registerFunction(id, fn[, injectable]);
```

param | type | description | default
----- | ---- | ----------- | -------
id | `string` | Used to identify the registered the asset. | none
fn | `function` | Function to be registered as an asset  | none
injectable | `boolean` | When true, the asset will be treated as a factory, otherwise it will be treated as a simple function | `false`

#### Example

```js
var fn = function(a, b) {
  return a + b;
};

// register as a dependency injectable factory
modular.registerFunction('myFactory', fn, true);

// register as a non-injectable function
modular.registerFunction('myFuction', fn, false);
```

### .registerHash()
Used to register a `hash` asset.

```js
modular.registerHash(hash[, injectable]);
```

param | type | description | default
----- | ---- | ----------- | -------
hash | `object` | An object hash, the properties of which will all be individually registered as assets. | none
injectable<br>*(optional)* | `boolean` | When true, the asset will be treated as a factory, otherwise it will be treated as a simple function | `false`

> NOTE: `injectable` is applicable to object property   that return a function. It will be ignored for all other properties.

#### Example

```js
var hash = {
  assetA: 'string',
  assetB: 12345,
  assetC: {
    key1: 'value1',
    key2: 'value2'
  },
  assetD: function(a, b) {
    return a + b;
  }
};

modular.registerHash(hash, true); // <-- with di enabled
// assetA --> registered as `constant` assets
// assetB --> registered as `constant` assets
// assetC --> registered as `constant` assets
// assetD --> registered as a factory `function` asset

modular.registerHash(fn, false); // <-- with di disabled
// assetA --> registered as `constant` assets
// assetB --> registered as `constant` assets
// assetC --> registered as `constant` assets
// assetD --> registered as a simple `function` asset
```

### .registerModule()
Registers any Node.js requirable module as an asset. If it can be required using `require()` it can be registered using `.registerModule()`.

```js
modular.registerModule([id,] module[, injectable]);
```

param | type | description | default
----- | ---- | ----------- | -------
id<br>*(optional)*  | `string` | Used to identify the registered the asset. When not specified, the `module` name (or its basename if it is path to a file), will be converted to camel case and used as the `id`  | none
module | `function` | Path to module to be registerd  | none
injectable<br>
*(optional)* | `boolean` | When true, the asset will be treated as a factory, otherwise it will be treated as a simple function. | `false`

> NOTE: `injectable` is applicable when the registered module returns a function. It will otherwise be ignored.

#### Example

```js
// register as a dependency injectable module
var pathToModuleA = require.resole('./path/to/my/module');
modular.registerModule('moduleA', pathToModuleA, true);

// register as a non-injectable function
modular.registerFunction('moduleB', 'npm-module', false);

var pathToModuleC = require.resole('./path/to/my/my-fancy-module');
modular.registerModule(pathToModuleC); // <-- will use myFancyModule as the asset id

// register as a non-injectable function
modular.registerFunction('npm-module'); // <-- will use npmModule as the asset id
```

> NOTE: You should typically (if not always) turn off dependency injection, when registering an NPM module.

### .registerConstant()
Register any `string`, `number`, `date`, `array`, or `object` as a constant asset.

```js
modular.registerConstant(id, constant);
```

param | type | description | default
----- | ---- | ----------- | -------
id | `string` | Used to identify the registered the asset. | none
constant | any | Asset to be registered. Can be a `string`, `number`, `date`, `array`, or `object`. | none

#### Example

```js
modular.registerModule('a', 'string');
modular.registerModule('b', 12345678);
modular.registerModule('c', new Date());
modular.registerModule('d', { key: 'value' });
modular.registerModule('e', ['value1', 'value2']);
```

### .registerFolder()
Searches (non-recursively) for any `.js` files in a folder and registers each as a module (of it exports a function) or as constants (if it exports anything other than a function).

```js
modular.registerFolder(folderPath[, injectable);
```

param | type | description | default
----- | ---- | ----------- | -------
folderPath | `string` | Absolute path to the folder you wish to register | none
injectable | `boolean` | When true, the registered assets will be treated as a factory, otherwise it will be treated as a simple function. | `false`

> NOTE: `injectable` is applicable for files that exports a function. It will otherwise be ignored.

#### Example

```js
var pathToFolder = path.join(__dirname, './path/to/folder')
modular.registerFolder(pathToFolder, true); // <-- will treat exported functions as factories
```

### .resolve()
Resolve a registered asset. For dependency-injectable factories (functions and modules), it resolves all it's dependencies before calling the factory function, resolving to it's return value. All other assets are returned "as-is".

```js
modular.resolve(id|fn[, overrides]);
```

param | type | description | default
----- | ---- | ----------- | -------
id | `string` | Used to identify the registered the asset. | none
fn | `function` | Function to inject with dependencies and invoke. | none
overrides
*(optional)* | `object` | Optional object hash providing values with which to override dependencies | none

```js
var fn1 = function(a, b) {
  return a + b;
};

var fn2 = function(a, b, sum) {
  return a * b + sum;
};

// register assets
modular.registerFunction('sum', fn, true);    // <-- factory asset
modular.registerConstant('a', 5);             // <-- constant asset
modular.registerConstant('b', 10);            // <-- constant asset
modular.registerFunction('fn1', fn1, false);  // <-- simple function asset

// resolve assets
var resultA = modular.resolve('a');     // <-- resolves to 5
var resultB = modular.resolve('b');     // <-- resolves to 10
var resultSum = modular.resolve('sum'); // <-- resolved to 15
var resultFn1 = modular.resolve('fn1'); // <-- resolve to function "fn"
var resultFn2 = modular.resolve(fn2);   // <-- resolves to 65
var override = modular.resolve(fn1, { a: 1, b: 2}); // <-- resovles to 3
```

### .isRegistered()
Determines if an asset is registered.

```js
modular.isRegisterd(id);
```

param | type | description | default
----- | ---- | ----------- | -------
id | `string` | Used to identify the registered the asset. | none

#### Example

```js
modular.registerConstant('id', 'data');
if (modular.isRegisted('id')) {
  doSomething();
}
```

### .isInjectable()
Determines if an asset is a dependency-injectable factory.

```js
modular.isInjectable(id);
```

param | type | description | default
----- | ---- | ----------- | -------
id | `string` | Used to identify the registered the asset. | none

#### Example

```js
var fn = function(a, b) {
  returns a + b;
};
modular.registerConstant('factory', fn, true);
if (modular.isInjectable('factory')) {
  doSomething();
}
```

### .isConstant()
Determines if an asset is constant.

```js
modular.isConstant(id);
```

param | type | description | default
----- | ---- | ----------- | -------
id | `string` | Used to identify the registered the asset. | none

#### Example

```js
modular.registerConstant('id', 'data');
if (modular.isConstant('id')) {
  doSomething();
}
```

### .isFunction()
Determines if an asset is a function. It returns `true` for both factories and non-injectable functions.

```js
modular.isFunction(id);
```

param | type | description | default
----- | ---- | ----------- | -------
id | `string` | Used to identify the registered the asset. | none

#### Example

```js
var fn = function(a, b) {
  returns a + b;
};
modular.isFunction('myFunction', fn);
if (modular.isFunction('myFunction')) {
  doSomething();
}
```

### .isModule()
Determines if an asset is module.

```js
modular.isModule(id);
```

param | type | description | default
----- | ---- | ----------- | -------
id | `string` | Used to identify the registered the asset. | none

#### Example

```js
modular.registerModule('module', 'npm-module');
if (modular.isModule('module')) {
  doSomething();
}
```

## Compatibility API
The following API was include solely to maintain compatibility with `dependable`. These methods may be deprecated in future versions.

> WARNING: I DO NOT guarantee that these methods are IDENTICAL to their `dependable` counterparts. They are only provided to ease the transition from `dependable` to `agentia-modular`. If you're a `dependable` consumer, I suggest you transition to our core API as soon as possible.

### .register()
Register assets. This is functionally equivalent to the `.register()` method in `dependable`.

> Note: .register() as dependency-injection enabled by default, to mimic it behavior in `dependable`

```js
modular.register(id, fn);
modular.register(id, value);
modular.register(hash);
```

When called with | Functionally equivalent to
---------------- | --------------------------
`id`, `function` | `modular.registerFunction(id, fn, true)`.
`id`, `value` | `modular.registerConstant(id, constant)`
`hash` | `modular.registerHash(hash, true)`

### .get()
Returns a resolve asset by id.

```js
modular.get(id[, overrides]);
```

This method is functionally equivalent to `modular.resolve(id[, overrides]);`.

### .load()
Registers a file, or all the files in a folder.

> Note: .load() as dependency-injection enabled by default, to mimic it behavior in `dependable`

```js
modular.load(file|folder);
```

When called with | Functionally equivalent to
---------------- | --------------------------
`file` | `modular.registerModule('file', 'file', true)`.
`value` | `modular.registerFolder(folder, true)`


## Attributions
**agentia-modular** is loosely based, and greatly inspired by [dependable][dependable-url].

> [dependable][dependable-url]<br>
Copyright (c) 2013 [i.TV LLC][idottv-url]<br>
https://github.com/idottv/dependable

Since the dependable project appears to be abandoned, I've decided to make the initial version of **agentia-modular** backwards compatible (as much as possible) with the last version of dependable. This way existing dependable consumers can easily transition to **agentia-modular**.


## License
**agentia-modular** is free and open source under the MIT License.

Copyright (c) 2015 [Johnny Estilles](https://github.com/JohnnyEstilles), [http://www.agentia.asia](http://www.agentia.asia)


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[logo-image]: media/logo.png
[npm-image]: https://badge.fury.io/js/agentia-modular.svg
[npm-url]: https://npmjs.org/package/agentia-modular
[travis-image]: https://travis-ci.org/AgentiaSystems/agentia-modular.svg?branch=master
[travis-url]: https://travis-ci.org/AgentiaSystems/agentia-modular
[daviddm-image]: https://david-dm.org/AgentiaSystems/agentia-modular.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/AgentiaSystems/agentia-modular
[codeclimate-image]: https://codeclimate.com/github/AgentiaSystems/agentia-modular/badges/gpa.svg
[codeclimate-url]: https://codeclimate.com/github/AgentiaSystems/agentia-modular
[coverage-image]: https://codeclimate.com/github/AgentiaSystems/agentia-modular/badges/coverage.svg
[coverage-url]: https://codeclimate.com/github/AgentiaSystems/agentia-modular
[dependable-url]: https://github.com/idottv/dependable
[idottv-url]: https://github.com/idottv)
