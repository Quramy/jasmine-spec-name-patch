function wrapAfterEach(cb) {
  if (typeof jasmine !== 'object') return;
  const jasmineEnv = jasmine.getEnv();
  const original = jasmineEnv.it;

  if (!jasmineEnv.it.__patchedAfter__) {
    jasmineEnv.it = function () {
      const spec = original.apply(this, arguments);
      const origBeforeAndAfterFns = spec.beforeAndAfterFns;
      spec.beforeAndAfterFns = function () {
        const result = origBeforeAndAfterFns.apply(this, arguments);
        if (result.afters) {
          const afters = result.afters.map(after => {
            const orig = after.fn;
            const fn = function wrappedAfter(done) {
              const self = this;
              self.fullName = spec.result.fullName;
              if (cb) {
                cb(self, done, orig);
              } else {
                orig.apply(self, [done, { fullName: self.fullName }]);
                if (orig.length === 0) done();
              }
            };
            return { fn, timeout: after.timeout };
          });
          return { afters, befores: result.befores };
        } else {
          return result;
        }
      };
      return spec;
    };
    jasmineEnv.it.__patchedAfter__ = true;
  }
}

module.exports = wrapAfterEach;
