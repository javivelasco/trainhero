var expect   = require('chai').expect,
    assert   = require('chai').assert,
    Model    = require("../../core/models/model");

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

    it("has embebbed model if specified", function() {
      var EmbebbedModel = Model.extend({attributes: ['baz']});
      var TestModel = Model.extend({attributes: ['foo'], embebbed: {bar: EmbebbedModel}});
      var model = new TestModel({foo: 1, bar: {baz: 3}});
      expect(model.bar).to.be.an.instanceof(EmbebbedModel);
      expect(model.bar).to.be.an.instanceof(Model);
      expect(model.isValid()).to.eql(true);
    });

    it("validates embebbed model", function() {
      var EmbebbedModel = Model.extend({attributes: ['baz'], constraints: { baz: { presence: true }}});
      var TestModel = Model.extend({attributes: ['foo'], embebbed: {bar: EmbebbedModel}});
      var model = new TestModel({foo: 1, bar: {baz: null}});
      expect(model.bar).to.be.an.instanceof(EmbebbedModel);
      expect(model.isValid()).to.eql(false);
    })
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

    it("includes the embebbed models when they have data", function(){
      var hash = { foo: 1, bar: { baz: 2 }};
      var EmbebbedModel = Model.extend({attributes: ['baz']});
      var TestModel = Model.extend({attributes: ['foo'], embebbed: {bar: EmbebbedModel}});
      var model = new TestModel(hash);
      expect(model.toJSON()).to.eql(hash);
    });

    it("not include the embebbed models when they dont have data", function(){
      var hash = { foo: 1 };
      var EmbebbedModel = Model.extend({attributes: ['baz']});
      var TestModel = Model.extend({attributes: ['foo'], embebbed: {bar: EmbebbedModel}});
      var model = new TestModel(hash);
      expect(model.toJSON()).to.eql(hash);
    });
  });
});
