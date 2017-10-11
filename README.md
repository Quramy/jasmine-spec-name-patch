# jasmine spec name patch

Allows to use spec's name in Jasmine `afterEach` callback.

## How to use

```sh
npm i jasmine-spec-name-patch
```

```js
require('jasmine-spec-name-patch');

describe('My awesome function', function() {
  it('should returns...', function() { /* test code */ });

  afterEach(function() {
    console.log(this.fullName);  // -> My awesome function should returns ...
  });

  // or

  afterEach((done, { fullName }) => {
    console.log(fullName);  // -> My awesome function should returns ...
    done();
  });
});
```

## Decorate after each fn
You can also intercept `afterEach` function.

```js
const wrap = require('jasmine-spec-name-patch/after-each');

wrap(function(context, complete, delegate) {
  // something you want,,,
  if (delegate.length === 0) {
    delegate.apply(context);
    complete();
  } else {
    delegate.apply(context, [complete]);
  }
});
```

## License
MIT
