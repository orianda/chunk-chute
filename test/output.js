'use strict';

var chai = require('chai'),
  expect = chai.expect,
  sinon = require('sinon'),
  ChunkChute = require('../src');

function noop() {
}

chai.use(require('chai-as-promised'));

describe('output', function () {

  describe('chute', function () {

    describe('resolve', function () {

      describe('chute 1', function () {
        var source1, chute1, source2, chute2, source3, chute3;

        before(function () {
          source1 = sinon.spy(function () {
            this.resolve('output1');
          });
          chute1 = new ChunkChute(source1);
          sinon.spy(chute1, 'push');
          sinon.spy(chute1, 'pull');
          source2 = sinon.spy(function () {
            this.resolve('output2');
          });
          chute2 = chute1.pipe(source2);
          sinon.spy(chute2, 'push');
          sinon.spy(chute2, 'pull');
          source3 = sinon.spy(function () {
            this.resolve('output3');
          });
          chute3 = chute1.pipe(source3);
          sinon.spy(chute3, 'push');
          sinon.spy(chute3, 'pull');
          chute3.pull();
          return chute3;
        });

        it('should exec source1', function () {
          expect(source1.args).to.deep.equal([
            []
          ]);
        });

        it('should not push into chute1', function () {
          expect(chute1.push.args).to.deep.equal([]);
        });

        it('should pull from chute1', function () {
          expect(chute1.pull.args).to.deep.equal([
            []
          ]);
        });

        it('should resolve chute1', function () {
          return expect(chute1).to.eventually.be.fulfilled.and.equals('output1');
        });

        it('should not exec source2', function () {
          expect(source2.args).to.deep.equal([]);
        });

        it('should not push into chute2', function () {
          expect(chute2.push.args).to.deep.equal([]);
        });

        it('should pull from chute2', function () {
          expect(chute2.pull.args).to.deep.equal([
            []
          ]);
        });

        it('should resolve chute2', function () {
          return expect(chute2).to.eventually.be.fulfilled.and.equals('output1');
        });

        it('should not exec source3', function () {
          expect(source3.args).to.deep.equal([]);
        });

        it('should not push into chute3', function () {
          expect(chute3.push.args).to.deep.equal([]);
        });

        it('should pull from chute3', function () {
          expect(chute3.pull.args).to.deep.equal([
            [],
            []
          ]);
        });

        it('should resolve chute3', function () {
          return expect(chute3).to.eventually.be.fulfilled.and.equals('output1');
        });
      });

      describe('chute 2', function () {
        var source1, chute1, source2, chute2, source3, chute3;

        before(function () {
          source1 = sinon.spy(function () {
            this.push();
            this.resolve('output1');
          });
          chute1 = new ChunkChute(source1);
          sinon.spy(chute1, 'push');
          sinon.spy(chute1, 'pull');
          source2 = sinon.spy(function () {
            this.resolve('output2');
          });
          chute2 = chute1.pipe(source2);
          sinon.spy(chute2, 'push');
          sinon.spy(chute2, 'pull');
          source3 = sinon.spy(function () {
            this.resolve('output3');
          });
          chute3 = chute2.pipe(source3);
          sinon.spy(chute3, 'push');
          sinon.spy(chute3, 'pull');
          chute3.pull();
          return chute3;
        });

        it('should exec source1', function () {
          expect(source1.args).to.deep.equal([
            []
          ]);
        });

        it('should not push into chute1', function () {
          expect(chute1.push.args).to.deep.equal([]);
        });

        it('should pull from chute1', function () {
          expect(chute1.pull.args).to.deep.equal([
            []
          ]);
        });

        it('should resolve chute1', function () {
          return expect(chute1).to.eventually.be.fulfilled.and.equals('output1');
        });

        it('should exec source2', function () {
          expect(source2.args).to.deep.equal([
            []
          ]);
        });

        it('should push into chute2', function () {
          expect(chute2.push.args).to.deep.equal([
            []
          ]);
        });

        it('should pull from chute2', function () {
          expect(chute2.pull.args).to.deep.equal([
            [],
            []
          ]);
        });

        it('should resolve chute2', function () {
          return expect(chute2).to.eventually.be.fulfilled.and.equals('output2');
        });

        it('should not exec source3', function () {
          expect(source3.args).to.deep.equal([]);
        });

        it('should not push into chute3', function () {
          expect(chute3.push.args).to.deep.equal([]);
        });

        it('should pull from chute3', function () {
          expect(chute3.pull.args).to.deep.equal([
            [],
            []
          ]);
        });

        it('should resolve chute3', function () {
          return expect(chute3).to.eventually.be.fulfilled.and.equals('output2');
        });
      });

      describe('chute 3', function () {
        var source1, chute1, source2, chute2, source3, chute3;

        before(function () {
          source1 = sinon.spy(function () {
            this.push();
            this.resolve('output1');
          });
          chute1 = new ChunkChute(source1);
          sinon.spy(chute1, 'push');
          sinon.spy(chute1, 'pull');
          source2 = sinon.spy(function () {
            this.push();
            this.resolve('output2');
          });
          chute2 = chute1.pipe(source2);
          sinon.spy(chute2, 'push');
          sinon.spy(chute2, 'pull');
          source3 = sinon.spy(function () {
            this.resolve('output3');
          });
          chute3 = chute2.pipe(source3);
          sinon.spy(chute3, 'push');
          sinon.spy(chute3, 'pull');
          chute3.pull();
          return chute3;
        });

        it('should exec source1', function () {
          expect(source1.args).to.deep.equal([
            []
          ]);
        });

        it('should not push into chute1', function () {
          expect(chute1.push.args).to.deep.equal([]);
        });

        it('should pull from chute1', function () {
          expect(chute1.pull.args).to.deep.equal([
            []
          ]);
        });

        it('should resolve chute1', function () {
          return expect(chute1).to.eventually.be.fulfilled.and.equals('output1');
        });

        it('should exec source2', function () {
          expect(source2.args).to.deep.equal([
            []
          ]);
        });

        it('should push into chute2', function () {
          expect(chute2.push.args).to.deep.equal([
            []
          ]);
        });

        it('should pull from chute2', function () {
          expect(chute2.pull.args).to.deep.equal([
            [],
            []
          ]);
        });

        it('should resolve chute2', function () {
          return expect(chute2).to.eventually.be.fulfilled.and.equals('output2');
        });

        it('should exec source3', function () {
          expect(source3.args).to.deep.equal([
            []
          ]);
        });

        it('should push into chute3', function () {
          expect(chute3.push.args).to.deep.equal([
            []
          ]);
        });

        it('should pull from chute3', function () {
          expect(chute3.pull.args).to.deep.equal([
            [],
            []
          ]);
        });

        it('should resolve chute3', function () {
          return expect(chute3).to.eventually.be.fulfilled.and.equals('output3');
        });
      });
    });

    describe('reject', function () {

      describe('chute 1', function () {
        var source1, chute1, source2, chute2, source3, chute3;

        before(function () {
          source1 = sinon.spy(function () {
            this.reject('output1');
          });
          chute1 = new ChunkChute(source1);
          sinon.spy(chute1, 'push');
          sinon.spy(chute1, 'pull');
          source2 = sinon.spy(function () {
            this.reject('output2');
          });
          chute2 = chute1.pipe(source2);
          sinon.spy(chute2, 'push');
          sinon.spy(chute2, 'pull');
          source3 = sinon.spy(function () {
            this.reject('output3');
          });
          chute3 = chute1.pipe(source3);
          sinon.spy(chute3, 'push');
          sinon.spy(chute3, 'pull');
          chute3.pull();
          return chute3.then(noop, noop);
        });

        it('should exec source1', function () {
          expect(source1.args).to.deep.equal([
            []
          ]);
        });

        it('should not push into chute1', function () {
          expect(chute1.push.args).to.deep.equal([]);
        });

        it('should pull from chute1', function () {
          expect(chute1.pull.args).to.deep.equal([
            []
          ]);
        });

        it('should resolve chute1', function () {
          return expect(chute1).to.eventually.be.rejected.and.equals('output1');
        });

        it('should not exec source2', function () {
          expect(source2.args).to.deep.equal([]);
        });

        it('should not push into chute2', function () {
          expect(chute2.push.args).to.deep.equal([]);
        });

        it('should pull from chute2', function () {
          expect(chute2.pull.args).to.deep.equal([
            []
          ]);
        });

        it('should resolve chute2', function () {
          return expect(chute2).to.eventually.be.rejected.and.equals('output1');
        });

        it('should not exec source3', function () {
          expect(source3.args).to.deep.equal([]);
        });

        it('should not push into chute3', function () {
          expect(chute3.push.args).to.deep.equal([]);
        });

        it('should pull from chute3', function () {
          expect(chute3.pull.args).to.deep.equal([
            [],
            []
          ]);
        });

        it('should resolve chute3', function () {
          return expect(chute3).to.eventually.be.rejected.and.equals('output1');
        });
      });

      describe('chute 2', function () {
        var source1, chute1, source2, chute2, source3, chute3;

        before(function () {
          source1 = sinon.spy(function () {
            this.push();
            this.reject('output1');
          });
          chute1 = new ChunkChute(source1);
          sinon.spy(chute1, 'push');
          sinon.spy(chute1, 'pull');
          source2 = sinon.spy(function () {
            this.reject('output2');
          });
          chute2 = chute1.pipe(source2);
          sinon.spy(chute2, 'push');
          sinon.spy(chute2, 'pull');
          source3 = sinon.spy(function () {
            this.reject('output3');
          });
          chute3 = chute2.pipe(source3);
          sinon.spy(chute3, 'push');
          sinon.spy(chute3, 'pull');
          chute3.pull();
          return chute3.then(noop, noop);
        });

        it('should exec source1', function () {
          expect(source1.args).to.deep.equal([
            []
          ]);
        });

        it('should not push into chute1', function () {
          expect(chute1.push.args).to.deep.equal([]);
        });

        it('should pull from chute1', function () {
          expect(chute1.pull.args).to.deep.equal([
            []
          ]);
        });

        it('should resolve chute1', function () {
          return expect(chute1).to.eventually.be.rejected.and.equals('output1');
        });

        it('should exec source2', function () {
          expect(source2.args).to.deep.equal([
            []
          ]);
        });

        it('should push into chute2', function () {
          expect(chute2.push.args).to.deep.equal([
            []
          ]);
        });

        it('should pull from chute2', function () {
          expect(chute2.pull.args).to.deep.equal([
            [],
            []
          ]);
        });

        it('should resolve chute2', function () {
          return expect(chute2).to.eventually.be.rejected.and.equals('output2');
        });

        it('should not exec source3', function () {
          expect(source3.args).to.deep.equal([]);
        });

        it('should not push into chute3', function () {
          expect(chute3.push.args).to.deep.equal([]);
        });

        it('should pull from chute3', function () {
          expect(chute3.pull.args).to.deep.equal([
            [],
            []
          ]);
        });

        it('should resolve chute3', function () {
          return expect(chute3).to.eventually.be.rejected.and.equals('output2');
        });
      });

      describe('chute 3', function () {
        var source1, chute1, source2, chute2, source3, chute3;

        before(function () {
          source1 = sinon.spy(function () {
            this.push();
            this.reject('output1');
          });
          chute1 = new ChunkChute(source1);
          sinon.spy(chute1, 'push');
          sinon.spy(chute1, 'pull');
          source2 = sinon.spy(function () {
            this.push();
            this.reject('output2');
          });
          chute2 = chute1.pipe(source2);
          sinon.spy(chute2, 'push');
          sinon.spy(chute2, 'pull');
          source3 = sinon.spy(function () {
            this.reject('output3');
          });
          chute3 = chute2.pipe(source3);
          sinon.spy(chute3, 'push');
          sinon.spy(chute3, 'pull');
          chute3.pull();
          return chute3.then(noop, noop);
        });

        it('should exec source1', function () {
          expect(source1.args).to.deep.equal([
            []
          ]);
        });

        it('should not push into chute1', function () {
          expect(chute1.push.args).to.deep.equal([]);
        });

        it('should pull from chute1', function () {
          expect(chute1.pull.args).to.deep.equal([
            []
          ]);
        });

        it('should resolve chute1', function () {
          return expect(chute1).to.eventually.be.rejected.and.equals('output1');
        });

        it('should exec source2', function () {
          expect(source2.args).to.deep.equal([
            []
          ]);
        });

        it('should push into chute2', function () {
          expect(chute2.push.args).to.deep.equal([
            []
          ]);
        });

        it('should pull from chute2', function () {
          expect(chute2.pull.args).to.deep.equal([
            [],
            []
          ]);
        });

        it('should resolve chute2', function () {
          return expect(chute2).to.eventually.be.rejected.and.equals('output2');
        });

        it('should exec source3', function () {
          expect(source3.args).to.deep.equal([
            []
          ]);
        });

        it('should push into chute3', function () {
          expect(chute3.push.args).to.deep.equal([
            []
          ]);
        });

        it('should pull from chute3', function () {
          expect(chute3.pull.args).to.deep.equal([
            [],
            []
          ]);
        });

        it('should resolve chute3', function () {
          return expect(chute3).to.eventually.be.rejected.and.equals('output3');
        });
      });
    });
  });

  describe('chunk', function () {

    describe('no promise',function(){
      var pull;

      before(function () {
        var index = 0;
        pull = new ChunkChute(function () {
          if (index++) {
            this.resolve();
          } else {
            this.push('output1');
          }
          return true;
        }).pull();
        return pull;
      });

      it('should output', function () {
        return expect(pull).to.eventually.be.fulfilled.and.is.undefined;
      });
    });

    describe('promise',function(){
      var pull;

      before(function () {
        var index = 0;
        pull = new ChunkChute(function () {
          if (index++) {
            this.resolve();
          } else {
            return Promise.resolve();
          }
        }).pull();
        return pull;
      });

      it('should output', function () {
        return expect(pull).to.eventually.be.fulfilled.and.is.undefined;
      });
    });
  });
});