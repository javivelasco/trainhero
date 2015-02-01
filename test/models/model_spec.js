var expect   = require('chai').expect,
    assert   = require('chai').assert,
    Model    = require("../../core/models/model");

describe("models/model.js", function() {
  describe("#constructor", function() {
    it("has no attributes when no attributes specified", function() {
      var TestModel = Model.extend({});
      var model = new TestModel();
      assert.isArray(model.attributes);
      assert.lengthOf(model.attributes, 0);
    });

    it("has attributes when specified", function() {
      var TestModel = Model.extend({attributes: ['foo', 'bar']});
      var model = new TestModel();
      assert.isArray(model.attributes);
      assert.lengthOf(model.attributes, 2);
    });

    it("has no properties for attributes when no values given", function() {
      var TestModel = Model.extend({attributes: ['foo', 'bar']});
      var model = new TestModel();
      assert.notProperty(model, 'foo');
      assert.notProperty(model, 'bar');
    });

    it("has properties for attributes when values given", function() {
      var TestModel = Model.extend({attributes: ['foo', 'bar']});
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

    it("has an array of embbebed model if specified", function() {
      var EmbebbedModel = Model.extend({attributes: ['baz']});
      var TestModel = Model.extend({attributes: ['foo'], embebbed: {bars: [EmbebbedModel]}});
      var model = new TestModel({foo: 1, bars: [{baz: 3}, {baz: 4}]});
      expect(model.bars.length).to.eql(2);
      expect(model.bars[0]).to.be.an.instanceof(EmbebbedModel);
      expect(model.bars[0]).to.be.an.instanceof(Model);
      expect(model.isValid()).to.eql(true);
    });

    it("validates embebbed model", function() {
      var EmbebbedModel = Model.extend({attributes: ['baz'], constraints: { baz: { presence: true }}});
      var TestModel = Model.extend({attributes: ['foo'], embebbed: {bar: EmbebbedModel}});
      var model = new TestModel({foo: 1, bar: {baz: null}});
      expect(model.bar).to.be.an.instanceof(EmbebbedModel);
      expect(model.isValid()).to.eql(false);
    });
  });

  describe("#validate", function() {
    it("assign validation value to errors internal variable", function() {
      var TestModel = Model.extend();
      var model = new TestModel();
      model.validate();
      expect(model.isValid()).to.eql(true);
    });
  });

  describe("#isValid", function() {
    it("returns true is there is no error", function() {
      var TestModel = Model.extend();
      var model = new TestModel();
      expect(model.isValid()).to.eql(true);
    });

    it("returns false if there are errors", function() {
      var TestModel = Model.extend();
      var model = new TestModel();
      model.errors = {attr: ["Error"]};
      expect(model.isValid()).to.eql(false);
    });
  });

  describe('#generateId', function() {
    it("generates a different it each time", function() {
      var TestModel = Model.extend();
      var model     = new TestModel();
      var firstId   = model.generateId();
      expect(firstId).to.exist();
      expect(firstId).to.not.eql(model.generateId());
    });
  });

  describe("#toJSON", function() {
    it("returns empty object if model has no attributes", function() {
      var TestModel = Model.extend();
      var model = new TestModel();
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

    it("includes the embebbed models when they are arrays", function() {
      var hash = { foo: 1, bar: [{baz: 2}, {baz: 3}]};
      var EmbebbedModel = Model.extend({attributes: ['baz']});
      var TestModel = Model.extend({attributes: ['foo'], embebbed: {bar: [EmbebbedModel]}});
      var model = new TestModel(hash);
      expect(model.toJSON()).to.eql(hash);
    });

    it("include the embebbed models empty array when they are arrays and dont have data", function(){
      var hash = { foo: 1 };
      var EmbebbedModel = Model.extend({attributes: ['baz']});
      var TestModel = Model.extend({attributes: ['foo'], embebbed: {bar: [EmbebbedModel]}});
      var model = new TestModel(hash);
      hash.bar = [];
      expect(model.toJSON()).to.eql(hash);
    });
  });
});
