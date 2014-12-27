var expect = require('chai').expect,
    db     = require('../../mongo').db,
    Train  = require('../../core/models/train'),
    MongoRepository = require('../../core/repositories/mongo_repository'),
    repository = require('../../core/repositories/train_repository');

describe("TrainRepository", function() {
  it('is a mongo repository', function() {
    expect(repository).to.be.an.instanceof(MongoRepository);
  });

  it('has a train collection', function() {
    expect(repository.collection).to.eql('trains')
  });

  it('has a Train model reference', function() {
    expect(repository.model).to.eql(Train);
  });
});
