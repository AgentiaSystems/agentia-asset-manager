![agentia-ping-handler logo][logo-image]
---
[![Build Status][travis-image]][travis-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
[![Test Coverage][coverage-image]][coverage-url]

A lazy dependency-injection framework for Node.js

## Installation
[![NPM version][npm-image]][npm-url]

**agentia-asset-manager** is available on [npm][npm-url].

```js
npm install --save agentia-asset-manager
```

## Usage
```js
var AssetManager = require('agentia-asset-manager');
var container = AssetManger.create();

```

## Concepts
**agentia-asset-manager** allows you to create an asset container where you can register assets. Some assets (ie. dependency-injectable function or factory) can require/depend on other assets. Since dependencies are lazily resolved, assets can be registered in any order, so long as all required dependencies are registered prior to asset resolution.

Within **agentia-asset-manager** there are four (4) times assets that can be registered:

Asset Type | Description
---------- | -----------
`function` | This can be either a dependecy-injectable function (factory) or a simple non-injenctable function. This is determined by the `injectable` parameter during asset registration.
`module` | Any requirable Node.js module.<br>If the module returns a function, it can also be treated as a factory or a simple function (see `function` above.)<br>If the module returns anything other than a function, it will be registered as a `instance` (see below).
`hash` | Any object hash, the properties of which will be treated and registered as individually registered.<br>If the property is a `function` it be treated as a function asset (see explanation above), otherwise it will be treated as an `instance` asset (see explanation below).
`instance` | Anything other than what is listed above (ie. `string`, `number`, `date`,  `array` or `object`). Objects registered as an `instance` will be registered as a single asset, unlike a `hash` which will register every property as a distinct asset.

> NOTE: Simple (non-injectable) function assets will always resolve to the actual function, where as factory (injectable) function assets will be injected with their required dependencies prior to resolution, will always resolve to their returned value.

## Static API

### .create()
Create a new AssetManager container instance

```js
AssetManager.create([compatibility])
```

param | type | description | default
----- | :--: | ----------- | -------
compatibility | `boolean` | Determines whether compatibility methods will also be added | false

#### Example

```js
var instanceA = AssetManager.create(); // <-- without compatibility methods
var instanceB = AssetManager.create(true); // <-- with compatiblity methods
```

### .mixin()
Add AssetManager functionality to an existing object

```js
AssetManager.mixin(instance,[compatibility])
```

param | type | description | default
----- | :--: | ----------- | -------
instance | `object` | Object instance onto which AssetManager functionality will be added | none
compatibility | `boolean` | Determines whether compatibility methods will also be added | false

#### Example

```js
var instance = {
  fnA: function() {},
  fnB: function() {},
  key: 'value'
};

AssetManager.mixin(instance); // <-- without compatibility methods

// --- OR ---

AssetManager.mixin(instance, true); // <-- with compatibility methods
```

### .attach()
Attach AssetManager functionality to an existing class

```js
AssetManager.attach(class,[compatibility])
```

param | type | description | default
----- | :--: | ----------- | -------
class | `function` | Class onto which AssetManager functionality will be added | none
compatibility | `boolean` | Determines whether compatibility methods will also be added | false

#### Example

```js
function MyClass() {
  this.__key = 'value';
  return this;
}
MyClass.prototype.fnA = function() {};
MyClass.prototype.fnB = function() {};

AssetManager.attach(MyClass); // <-- without compatibility methods

// --- OR ---

AssetManager.attach(MyClass); // <-- with compatibility methods
```

## Core API

### .registerFunction()
Used to register a `function` asset.

```js
container.registerFunction(id, fn[, injectable]);
```

param | type | description | default
----- | :--: | ----------- | -------
id | `string` | Used to identify the registered the asset. | none
fn | `function` | Function to be registered as an asset  | none
injectable | `boolean` | When true, the asset will be treated as a factory, otherwise it will be treated as a simple function | `false`

#### Example

```js
var fn = function(a, b) {
  return a + b;
};

// register as a dependency injectable factory
container.registerFunction('myFactory', fn, true);

// register as a non-injectable function
container.registerFunction('myFunction', fn, false);
```

### .registerHash()
Used to register a `hash` asset.

```js
container.registerHash(hash[, injectable]);
```

param | type | description | default
----- | :--: | ----------- | -------
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

container.registerHash(hash, true); // <-- with di enabled
// assetA --> registered as `instance` assets
// assetB --> registered as `instance` assets
// assetC --> registered as `instance` assets
// assetD --> registered as a factory `function` asset

container.registerHash(fn, false); // <-- with di disabled
// assetA --> registered as `instance` assets
// assetB --> registered as `instance` assets
// assetC --> registered as `instance` assets
// assetD --> registered as a simple `function` asset
```

### .registerModule()
Registers any Node.js requirable module as an asset. If it can be required using `require()` it can be registered using `.registerModule()`.

```js
container.registerModule([id,] module[, injectable]);
```

param | type | description | default
----- | :--: | ----------- | -------
id<br>*(optional)*  | `string` | Used to identify the registered the asset. When not specified, the `module` name (or its basename if it is path to a file), will be converted to camel case and used as the `id`  | none
module | `string` | Path to module to be registered  | none
injectable<br>*(optional)* | `boolean` | When true, the asset will be treated as a factory, otherwise it will be treated as a simple function. | `false`

> NOTE: `injectable` is applicable when the registered module returns a function. It will otherwise be ignored.

#### Example

```js
// register as a dependency injectable module
var pathToModuleA = require.resole('./path/to/my/module');
container.registerModule('moduleA', pathToModuleA, true);

// register as a non-injectable function
container.registerModule('moduleB', 'npm-module', false);

var pathToModuleC = require.resolve('./path/to/my/my-fancy-module');
container.registerModule(pathToModuleC); // <-- will use myFancyModule as the asset id

// register as a non-injectable function
container.registerModule('npm-module'); // <-- will use npmModule as the asset id
```

> NOTE: You should typically (if not always) turn off dependency injection, when registering an NPM module.

### .registerInstance()
Register any `string`, `number`, `date`, `array`, or `object` as an `instance` asset.

```js
container.registerInstance(id, instance);
```

param | type | description | default
----- | :--: | ----------- | -------
id | `string` | Used to identify the registered the asset. | none
instance | any | Asset to be registered. Can be a `string`, `number`, `date`, `array`, or `object`. | none

#### Example

```js
container.registerInstance('a', 'string');
container.registerInstance('b', 12345678);
container.registerInstance('c', new Date());
container.registerInstance('d', { key: 'value' });
container.registerInstance('e', ['value1', 'value2']);
```

### .registerFiles()
Searches for any `.js` files in a folder and registers each as a module .

```js
container.registerFiles(pattern[, injectable);
```

param | type | description | default
----- | :--: | ----------- | -------
pattern | `string` | A glob pattern string specifying files to register | none
injectable<br>*(optional)* | `boolean` | When true, the asset will be treated as a factory, otherwise it will be treated as a simple function. | `false`

#### Example

```js
var pathToFolder = path.join(__dirname, './path/to/folder')
container.registerFiles(pathToFolder, true); // <-- will treat exported functions as factories
```

### .inject()
Inejcts a function with dependencies and returns its value. F

```js
container.inject(ifn[, overrides][, context]);
```

param | type | description | default
----- | :--: | ----------- | -------
fn | `function` | Function to inject with dependencies and resolve. | none
overrides *(optional)* | `object` | Optional object hash providing values with which to override dependencies | none
context *(optional)* | `object` | Optional object that will be used as a context when resolving the asset, when the asset is a factory | none

```js
var fn1 = function(a, b) {
  return a + b;
};

var fn2 = function(a, b) {
  return a + b + this.c;
};

// register assets
container.registerInstance('a', 5);             // <-- instance asset
container.registerInstance('b', 10);            // <-- instance asset
var

// resolve assets
var result = container.inject(fn1); // <-- resolved to 15
var withOverride = container.inject(fn1, { a: 1, b: 2}); // <-- resolves to 3
var withContext = container.inject(fn2, { a: 1, b: 2}, { c: 3 }); // <-- resolves to 6
```

### .resolve()
Resolve a registered asset. For dependency-injectable factories (functions and modules), it resolves all it's dependencies before calling the factory function, resolving to it's return value. All other assets are returned "as-is".

```js
container.resolve(id[, overrides][, context]);
```

param | type | description | default
----- | :--: | ----------- | -------
id | `string` | Used to identify the registered the asset. | none
overrides *(optional)* | `object` | Optional object hash providing values with which to override dependencies | none
context *(optional)* | `object` | Optional object that will be used as a context when resolving the asset, when the asset is a factory | none

```js
var fn1 = function(a, b) {
  return a + b;
};

var fn2 = function(a, b, sum) {
  return a * b + sum;
};

// register assets
container.registerFunction('sum', fn, true);    // <-- factory asset
container.registerInstance('a', 5);             // <-- instance asset
container.registerInstance('b', 10);            // <-- instance asset
container.registerFunction('fn1', fn1, false);  // <-- simple function asset

// resolve assets
var resultA = container.resolve('a');     // <-- resolves to 5
var resultB = container.resolve('b');     // <-- resolves to 10
var resultSum = container.resolve('sum'); // <-- resolved to 15
var resultFn1 = container.resolve('fn1'); // <-- resolve to function "fn"
var resultFn2 = container.resolve(fn2);   // <-- resolves to 65
var override = container.resolve(fn1, { a: 1, b: 2}); // <-- resolves to 3
```

## Helpers

### .isRegistered()
Determines if an asset is registered.

```js
container.isRegisterd(id);
```

param | type | description | default
----- | :--: | ----------- | -------
id | `string` | Used to identify the registered the asset. | none

#### Example

```js
container.registerInstance('id', 'data');
if (container.isRegisted('id')) {
  doSomething();
}
```

### .isInjectable()
Determines if an asset is a dependency-injectable factory.

```js
container.isInjectable(id);
```

param | type | description | default
----- | :--: | ----------- | -------
id | `string` | Used to identify the registered the asset. | none

#### Example

```js
var fn = function(a, b) {
  returns a + b;
};
container.registerInstance('factory', fn, true);
if (container.isInjectable('factory')) {
  doSomething();
}
```

### .isInstance()
Determines if an asset is an `instance`.

```js
container.isInstance(id);
```

param | type | description | default
----- | :--: | ----------- | -------
id | `string` | Used to identify the registered the asset. | none

#### Example

```js
container.registerInstance('id', 'data');
if (container.isInstance('id')) {
  doSomething();
}
```

### .isFunction()
Determines if an asset is a function. It returns `true` for both factories and non-injectable functions.

```js
container.isFunction(id);
```

param | type | description | default
----- | :--: | ----------- | -------
id | `string` | Used to identify the registered the asset. | none

#### Example

```js
var fn = function(a, b) {
  returns a + b;
};
container.isFunction('myFunction', fn);
if (container.isFunction('myFunction')) {
  doSomething();
}
```

### .isModule()
Determines if an asset is module.

```js
container.isModule(id);
```

param | type | description | default
----- | :--: | ----------- | -------
id | `string` | Used to identify the registered the asset. | none

#### Example

```js
container.registerModule('module', 'npm-module');
if (container.isModule('module')) {
  doSomething();
}
```

## Compatibility API
The following API was include solely to maintain compatibility with `dependable`. These methods may be deprecated in future versions.

> WARNING: I DO NOT guarantee that these methods are IDENTICAL to their `dependable` counterparts. They are only provided to ease the transition from `dependable` to `agentia-asset-manager`. If you're a `dependable` consumer, I suggest you transition to our core API as soon as possible.

### .register()
Register assets. This is functionally equivalent to the `.register()` method in `dependable`.

> Note: .register() as dependency-injection enabled by default, to mimic it behavior in `dependable`

```js
container.register(id, fn);
container.register(id, value);
container.register(hash);
```

When called with | Functionally equivalent to
---------------- | --------------------------
`.register(id, fn)` | `container.registerFunction(id, fn, true)`.
`.register(id, value)` | `container.registerInstance(id, instance)`
`.register(hash)` | `container.registerHash(hash, true)`

### .get()
Returns a resolve asset by id.

```js
container.get(id[, overrides]);
```

This method is functionally equivalent to `container.resolve(id[, overrides]);`.

### .load()
Registers a file, or all the files in a folder.

> Note: .load() as dependency-injection enabled by default, to mimic it behavior in `dependable`

```js
container.load(file|pattern);
```

When called with | Functionally equivalent to
---------------- | --------------------------
`.load(file)` | `container.registerModule('file', 'file', true)`.
`.load(folder)` | `container.registerFiles(path.join(folder, '*.js'), true))`


## Attributions
**agentia-asset-manager** is loosely based, and greatly inspired by [dependable][dependable-url].

> [dependable][dependable-url]<br>
Copyright (c) 2013 [i.TV LLC][idottv-url]<br>
https://github.com/idottv/dependable

Since the dependable project appears to be abandoned, I've decided to make the initial version of **agentia-asset-manager** backwards compatible (as much as possible) with the last version of dependable. This way existing dependable consumers can easily transition to **agentia-asset-manager**.


## License
**agentia-asset-manager** is free and open source under the MIT License.

Copyright (c) 2015 [Johnny Estilles](https://github.com/JohnnyEstilles), [http://www.agentia.asia](http://www.agentia.asia)


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[logo-image]: media/logo.png

[npm-image]: https://badge.fury.io/js/agentia-asset-manager.svg
[npm-url]: https://npmjs.org/package/agentia-asset-manager

[travis-image]: https://travis-ci.org/AgentiaSystems/agentia-asset-manager.svg?branch=master
[travis-url]: https://travis-ci.org/AgentiaSystems/agentia-asset-manager

[daviddm-image]: https://david-dm.org/AgentiaSystems/agentia-asset-manager.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/AgentiaSystems/agentia-asset-manager

[codeclimate-image]: https://codeclimate.com/github/AgentiaSystems/agentia-asset-manager/badges/gpa.svg
[codeclimate-url]: https://codeclimate.com/github/AgentiaSystems/agentia-asset-manager

[coverage-image]: https://codeclimate.com/github/AgentiaSystems/agentia-asset-manager/badges/coverage.svg
[coverage-url]: https://codeclimate.com/github/AgentiaSystems/agentia-asset-manager

[dependable-url]: https://github.com/idottv/dependable
[idottv-url]: https://github.com/idottv)
