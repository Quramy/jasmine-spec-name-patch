describe("Foo", function() {

  afterEach(function (done, x) {
    setTimeout(() => {
      console.log(x.fullName);
      done();
    }, 200);
  });

  it("should something", function() { });
});

describe('Piyo', function() {
  afterEach(function () {
    console.log(this.fullName);
  });

  [30, 10, 50].forEach(i => {
    it('should something ' + i, (done) => {
      setTimeout(() => done(), i);
    });
  });
});
