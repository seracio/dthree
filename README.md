# dthree

[![Build Status](https://travis-ci.org/seracio/dthree.svg?branch=master)](https://travis-ci.org/seracio/dthree)

`dthree` is a small helper inspired by [d3] selection module. 
It splits a data array into 3 distinct pools : `enter`, `update` and `exit`.
Unlike its [d3] counterpart, it doesn't bind the data to the DOM, which could 
   be useful in a non DOM context (WebGL for instance)
    
It's not well tested yet.  
   
Internally, it uses ES6 Map, so you'll have to bring a [polyfill](https://github.com/paulmillr/es6-shim) to manage ES5 environments.   

## Install

```
yarn add @seracio/dthree
```

## Usage

```javascript
import dthree from '@seracio/dthree';

// create a new selection
const mySelection = dthree.selectAll('myNamespace');

// bind data
mySelection.data([0,1,2,3]);
assert.deepEqual(mySelection.enter(), [0,1,2,3]);
assert.deepEqual(mySelection.update(), []);
assert.deepEqual(mySelection.exit(), []);

// re-bind data
mySelection.data([0,1,2]);
assert.deepEqual(mySelection.enter(), []);
assert.deepEqual(mySelection.update(), [0,1,2]);
assert.deepEqual(mySelection.exit(), [3]);
```

## API

### dthree

* **dthree.selectAll(namespace: string): Selection**
 
Create or get a selection
  
### Selection

* **selection.data(data: Iterable<any>, getKey: ?(value, index) => string): Selection**
  
Update data, if getKey is not provided, we'll use the array indexes as key
 
* **selection.enter(): Array<any>**
  
Returns the newly created data 

* **selection.update(): Array<any>**
  
Returns the newly updated data 

* **selection.exit(): Array<any>**
  
Returns the newly removed data 

* **selection.all(): Array<any>**
  
Returns the `enter` + `update` data 

[d3]: https://d3js.org

## License

MIT License

Copyright (c) 2017 serac.io

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
