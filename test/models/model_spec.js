var expect   = require('chai').expect,
    assert   = require('chai').assert,
    sinon    = require('sinon'),
    Model    = require("../../core/models/model")
    validate = require("../../core/validators");

describe("models/model.js", function() {
  describe("#constructor", function() {
    it("has no attributes when no attributes specified", function() {
      var model = new (Model.extend({}))
      assert.isArray(model.attributes);
      assert.lengthOf(model.attributes, 0);
    });

    it("has attributes when specified", function() {
      var model = new (Model.extend({attributes: ['foo', 'bar']}));
      assert.isArray(model.attributes);
      assert.lengthOf(model.attributes, 2);
    });

    it("has no properties for attributes when no values given", function() {
      var model = new (Model.extend({attributes: ['foo', 'bar']}));
      assert.notProperty(model, 'foo');
      assert.notProperty(model, 'bar');
    });

    it("has properties for attributes when values given", function() {
      var TestModel = Model.extend({attributes: ['foo', 'bar']})
      var model     = new TestModel({foo: 1, bar: 2});

      assert.isArray(model.attributes);
      assert.equal(model.foo, 1);
      assert.equal(model.bar, 2);
    });
  });

  describe("#validate", function() {
    it("assign validation value to errors internal variable", function() {
      var model = new (Model.extend());
      model.validate();
      expect(model.isValid()).to.eql(true);
    });
  });

  describe("#isValid", function() {
    it("returns true is there is no error", function() {
      var model = new (Model.extend());
      expect(model.isValid()).to.eql(true);
    });

    it("returns false if there are errors", function() {
      var model = new (Model.extend());
      model.errors = {attr: ["Error"]};
      expect(model.isValid()).to.eql(false);
    });
  });

  describe("#toJSON", function() {
    it("returns empty object if model has no attributes", function() {
      var model = new (Model.extend());
      expect(model.toJSON()).to.eql({});
    });

    it("returns a descriptor for the model", function() {
      var hash = {foo: 1, bar: 2};
      var MyModel = Model.extend({attributes: ['foo', 'bar']});
      var model = new MyModel(hash);
      expect(model.toJSON()).to.eql(hash);
    });
  });
});
