'use strict';

var chai = require('chai'),
  expect = chai.expect,
  sinon = require('sinon'),
  ChunkChute = require('../src');

chai.use(require('chai-as-promised'));

function noop() {
}

describe('singleton', function () {

  describe('init', function () {
    var chute, source;

    before(function () {
      source = sinon.spy();
      chute = new ChunkChute(source);
    });

    it('should be idle', function () {
      expect(chute.resolved).to.equal(false);
      expect(chute.rejected).to.equal(false);
    });

    it('should not change state', function () {
      chute.resolved = 'some';
      chute.rejected = 'some';
      expect(chute.resolved).to.equal(false);
      expect(chute.rejected).to.equal(false);
    });

    it('should not have been called', function () {
      expect(source.args).to.deep.equal([]);
    });
  });

  describe('resolve', function () {
    var chute, source, resolved, rejected;

    before(function () {
      source = sinon.spy(function () {
        this.resolve('done');
      });
      resolved = sinon.spy();
      rejected = sinon.spy();
      chute = new ChunkChute(source);
      chute.then(resolved, rejected);
      chute.pull();
      return chute;
    });

    it('should have been called once', function () {
      expect(source.args).to.deep.equal([
        []
      ]);
    });

    it('should be resolved', function () {
      expect(chute.resolved).to.equal(true);
    });

    it('should not be rejected', function () {
      expect(chute.rejected).to.equal(false);
    });

    it('should have resolved', function () {
      expect(resolved.args).to.deep.equal([
        ['done']
      ]);
    });

    it('should not have rejected', function () {
      expect(rejected.args).to.deep.equal([]);
    });
  });

  describe('reject', function () {
    var chute, source, resolved, rejected;

    before(function () {
      source = sinon.spy(function () {
        this.reject('fail');
      });
      resolved = sinon.spy();
      rejected = sinon.spy();
      chute = new ChunkChute(source);
      chute.then(resolved, rejected);
      chute.pull();
      return chute.then(noop, noop);
    });

    it('should have been called once', function () {
      expect(source.args).to.deep.equal([
        []
      ]);
    });

    it('should not be resolved', function () {
      expect(chute.resolved).to.equal(false);
    });

    it('should be rejected', function () {
      expect(chute.rejected).to.equal(true);
    });

    it('should not have resolved', function () {
      expect(resolved.args).to.deep.equal([]);
    });

    it('should have rejected', function () {
      expect(rejected.args).to.deep.equal([
        ['fail']
      ]);
    });
  });

  describe('3 items', function () {
    var chute, source;

    beforeEach(function () {
      var index = 0;
      source = sinon.spy(function () {
        if (index < 3) {
          this.push(index++);
        } else {
          this.resolve('done');
        }
        return true;
      });
      chute = new ChunkChute(source);
      chute.pull();
      return chute;
    });

    it('should have been called', function () {
      expect(source.args).to.deep.equal([
        [],
        [],
        [],
        []
      ]);
    });
  });
});