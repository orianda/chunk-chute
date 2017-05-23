'use strict';

var chai = require('chai'),
  expect = chai.expect,
  sinon = require('sinon'),
  ChunkChute = require('../src');

chai.use(require('chai-as-promised'));

describe('fork', function () {

  describe('sync',function(){
    var source1, chute1, forkSource2, forkChute2, source2, chute2, forkSource3, forkChute3, source3, chute3;

    before(function () {
      var index = 0;
      source1 = sinon.spy(function () {
        this.push('item', 1, index);
        this.push('item', 1, index);
        index++;
        if (index === 4) {
          this.resolve();
        }
      });
      chute1 = new ChunkChute(source1);
      forkSource2 = sinon.spy(function (name, source, index) {
        return index % 2 === 0;
      });
      forkChute2 = chute1.fork(forkSource2);
      source2 = sinon.spy(function (name) {
        this.push(name, 2, index);
        this.push(name, 2, index);
        return true;
      });
      chute2 = forkChute2.pipe(source2);
      forkSource3 = sinon.spy(function (name, source, index) {
        return index % 2 === 1;
      });
      forkChute3 = chute1.fork(forkSource3);
      source3 = sinon.spy(function (name) {
        this.push(name, 3, index);
        this.push(name, 3, index);
        return true;
      });
      chute3 = forkChute3.pipe(source3);
      sinon.spy(chute1, 'push');
      sinon.spy(chute1, 'pull');
      sinon.spy(forkChute2, 'push');
      sinon.spy(forkChute2, 'pull');
      sinon.spy(chute2, 'push');
      sinon.spy(chute2, 'pull');
      sinon.spy(chute3, 'push');
      sinon.spy(chute3, 'pull');
      sinon.spy(forkChute3, 'push');
      sinon.spy(forkChute3, 'pull');
      return chute3.pull();
    });

    it('should exec source1', function () {
      expect(source1.args).to.deep.equal([
        [],
        [],
        [],
        []
      ]);
    });

    it('should not push into chain1', function () {
      expect(chute1.push.args).to.deep.equal([]);
    });

    it('should pull from chain1', function () {
      expect(chute1.pull.args).to.deep.equal([
        [],
        [],
        [],
        []
      ]);
    });

    it('should push into fork 2', function () {
      expect(forkChute2.push.args).to.deep.equal([
        ['item', 1, 0],
        ['item', 1, 0],
        ['item', 1, 1],
        ['item', 1, 1],
        ['item', 1, 2],
        ['item', 1, 2],
        ['item', 1, 3],
        ['item', 1, 3]
      ]);
    });

    it('should pull from fork 2', function () {
      expect(forkChute2.pull.args).to.deep.equal([
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ]);
    });

    it('should exec fork 2', function () {
      expect(forkSource2.args).to.deep.equal([
        ['item', 1, 0],
        ['item', 1, 0],
        ['item', 1, 1],
        ['item', 1, 1],
        ['item', 1, 2],
        ['item', 1, 2],
        ['item', 1, 3],
        ['item', 1, 3]
      ]);
    });

    it('should push into chute 2', function () {
      expect(chute2.push.args).to.deep.equal([
        ['item', 1, 0],
        ['item', 1, 0],
        ['item', 1, 2],
        ['item', 1, 2]
      ]);
    });

    it('should pull from chute 2', function () {
      expect(chute2.pull.args).to.deep.equal([
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ]);
    });

    it('should exec chute 2', function () {
      expect(source2.args).to.deep.equal([
        ['item', 1, 0],
        ['item', 1, 0],
        ['item', 1, 2],
        ['item', 1, 2]
      ]);
    });

    it('should push into fork 3', function () {
      expect(forkChute3.push.args).to.deep.equal([
        ['item', 1, 0],
        ['item', 1, 0],
        ['item', 1, 1],
        ['item', 1, 1],
        ['item', 1, 2],
        ['item', 1, 2],
        ['item', 1, 3],
        ['item', 1, 3]
      ]);
    });

    it('should pull from fork 3', function () {
      expect(forkChute3.pull.args).to.deep.equal([
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ]);
    });

    it('should exec fork 3', function () {
      expect(forkSource3.args).to.deep.equal([
        ['item', 1, 0],
        ['item', 1, 0],
        ['item', 1, 1],
        ['item', 1, 1],
        ['item', 1, 2],
        ['item', 1, 2],
        ['item', 1, 3],
        ['item', 1, 3]
      ]);
    });

    it('should push into chute 3', function () {
      expect(chute3.push.args).to.deep.equal([
        ['item', 1, 1],
        ['item', 1, 1],
        ['item', 1, 3],
        ['item', 1, 3]
      ]);
    });

    it('should pull from chute 3', function () {
      expect(chute3.pull.args).to.deep.equal([
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ]);
    });

    it('should exec chute 3', function () {
      expect(source3.args).to.deep.equal([
        ['item', 1, 1],
        ['item', 1, 1],
        ['item', 1, 3],
        ['item', 1, 3]
      ]);
    });

    it('should resolve chute1', function () {
      expect(chute1.resolved).to.equal(true);
    });

    it('should resolve fork2', function () {
      expect(forkChute2.resolved).to.equal(true);
    });

    it('should resolve chute2', function () {
      expect(chute2.resolved).to.equal(true);
    });

    it('should resolve fork3', function () {
      expect(forkChute3.resolved).to.equal(true);
    });

    it('should resolve chute3', function () {
      expect(chute3.resolved).to.equal(true);
    });
  });

  describe('async', function () {
    var resolve, source1, chute1, forkSource2, forkChute2, source2, chute2, forkSource3, forkChute3, source3,
      chute3;

    before(function () {
      var index = 0;
      source1 = sinon.spy(function () {
        var context = this;
        return new Promise(function (res) {
          resolve = res;
        }).then(function () {
          context.push('item', 1, index);
          context.push('item', 1, index);
          index++;
          if (index === 4) {
            context.resolve();
          }
        });
      });
      chute1 = new ChunkChute(source1);
      forkSource2 = sinon.spy(function (name, source, index) {
        return index % 2 === 0;
      });
      forkChute2 = chute1.fork(forkSource2);
      source2 = sinon.spy(function (name) {
        this.push(name, 2, index);
        this.push(name, 2, index);
        return true;
      });
      chute2 = forkChute2.pipe(source2);
      forkSource3 = sinon.spy(function (name, source, index) {
        return index % 2 === 1;
      });
      forkChute3 = chute1.fork(forkSource3);
      source3 = sinon.spy(function (name) {
        this.push(name, 3, index);
        this.push(name, 3, index);
        return true;
      });
      chute3 = forkChute3.pipe(source3);
      sinon.spy(chute1, 'push');
      sinon.spy(chute1, 'pull');
      sinon.spy(forkChute2, 'push');
      sinon.spy(forkChute2, 'pull');
      sinon.spy(chute2, 'push');
      sinon.spy(chute2, 'pull');
      sinon.spy(chute3, 'push');
      sinon.spy(chute3, 'pull');
      sinon.spy(forkChute3, 'push');
      sinon.spy(forkChute3, 'pull');
      chute3.pull();
    });

    it('should exec source1', function () {
      expect(source1.args).to.deep.equal([
        []
      ]);
    });

    it('should not push into chain1', function () {
      expect(chute1.push.args).to.deep.equal([]);
    });

    it('should pull from chain1', function () {
      expect(chute1.pull.args).to.deep.equal([
        []
      ]);
    });

    it('should push into fork 2', function () {
      expect(forkChute2.push.args).to.deep.equal([]);
    });

    it('should pull from fork 2', function () {
      expect(forkChute2.pull.args).to.deep.equal([]);
    });

    it('should exec fork 2', function () {
      expect(forkSource2.args).to.deep.equal([]);
    });

    it('should push into chute 2', function () {
      expect(chute2.push.args).to.deep.equal([]);
    });

    it('should pull from chute 2', function () {
      expect(chute2.pull.args).to.deep.equal([]);
    });

    it('should exec chute 2', function () {
      expect(source2.args).to.deep.equal([]);
    });

    it('should push into fork 3', function () {
      expect(forkChute3.push.args).to.deep.equal([]);
    });

    it('should pull from fork 3', function () {
      expect(forkChute3.pull.args).to.deep.equal([
        []
      ]);
    });

    it('should exec fork 3', function () {
      expect(forkSource3.args).to.deep.equal([]);
    });

    it('should push into chute 3', function () {
      expect(chute3.push.args).to.deep.equal([]);
    });

    it('should pull from chute 3', function () {
      expect(chute3.pull.args).to.deep.equal([
        []
      ]);
    });

    it('should exec chute 3', function () {
      expect(source3.args).to.deep.equal([]);
    });

    it('should resolve chute1', function () {
      expect(chute1.resolved || chute1.rejected).to.equal(false);
    });

    it('should resolve fork2', function () {
      expect(forkChute2.resolved || forkChute2.rejected).to.equal(false);
    });

    it('should resolve chute2', function () {
      expect(chute2.resolved || chute2.rejected).to.equal(false);
    });

    it('should resolve fork3', function () {
      expect(forkChute3.resolved || forkChute3.rejected).to.equal(false);
    });

    it('should resolve chute3', function () {
      expect(chute3.resolved || chute3.rejected).to.equal(false);
    });

    describe('resolve',function(){

      before(function(){
        resolve('done1');
      });

      it('should exec source1', function () {
        expect(source1.args).to.deep.equal([
          [],
          []
        ]);
      });

      it('should not push into chain1', function () {
        expect(chute1.push.args).to.deep.equal([]);
      });

      it('should pull from chain1', function () {
        expect(chute1.pull.args).to.deep.equal([
          [],
          [],
          []
        ]);
      });

      it('should push into fork 2', function () {
        expect(forkChute2.push.args).to.deep.equal([
          ['item',1,0],
          ['item',1,0]
        ]);
      });

      it('should pull from fork 2', function () {
        expect(forkChute2.pull.args).to.deep.equal([
          [],
          [],
          []
        ]);
      });

      it('should exec fork 2', function () {
        expect(forkSource2.args).to.deep.equal([
          ['item',1,0],
          ['item',1,0]
        ]);
      });

      it('should push into chute 2', function () {
        expect(chute2.push.args).to.deep.equal([
          ['item',1,0],
          ['item',1,0]
        ]);
      });

      it('should pull from chute 2', function () {
        expect(chute2.pull.args).to.deep.equal([
          [],
          []
        ]);
      });

      it('should exec chute 2', function () {
        expect(source2.args).to.deep.equal([
          ['item',1,0],
          ['item',1,0]
        ]);
      });

      it('should push into fork 3', function () {
        expect(forkChute3.push.args).to.deep.equal([
          ['item',1,0],
          ['item',1,0]
        ]);
      });

      it('should pull from fork 3', function () {
        expect(forkChute3.pull.args).to.deep.equal([
          [],
          [],
          [],
          []
        ]);
      });

      it('should exec fork 3', function () {
        expect(forkSource3.args).to.deep.equal([
          ['item',1,0],
          ['item',1,0]
        ]);
      });

      it('should push into chute 3', function () {
        expect(chute3.push.args).to.deep.equal([]);
      });

      it('should pull from chute 3', function () {
        expect(chute3.pull.args).to.deep.equal([
          [],
          [],
          []
        ]);
      });

      it('should exec chute 3', function () {
        expect(source3.args).to.deep.equal([]);
      });

      it('should resolve chute1', function () {
        expect(chute1.resolved || chute1.rejected).to.equal(false);
      });

      it('should resolve fork2', function () {
        expect(forkChute2.resolved || forkChute2.rejected).to.equal(false);
      });

      it('should resolve chute2', function () {
        expect(chute2.resolved || chute2.rejected).to.equal(false);
      });

      it('should resolve fork3', function () {
        expect(forkChute3.resolved || forkChute3.rejected).to.equal(false);
      });

      it('should resolve chute3', function () {
        expect(chute3.resolved || chute3.rejected).to.equal(false);
      });

      describe('resolve',function(){

        before(function(){
          resolve('done2');
        });

        it('should exec source1', function () {
          expect(source1.args).to.deep.equal([
            [],
            [],
            []
          ]);
        });

        it('should not push into chain1', function () {
          expect(chute1.push.args).to.deep.equal([]);
        });

        it('should pull from chain1', function () {
          expect(chute1.pull.args).to.deep.equal([
            [],
            [],
            [],
            [],
            []
          ]);
        });

        it('should push into fork 2', function () {
          expect(forkChute2.push.args).to.deep.equal([
            ['item',1,0],
            ['item',1,0],
            ['item',1,1],
            ['item',1,1]
          ]);
        });

        it('should pull from fork 2', function () {
          expect(forkChute2.pull.args).to.deep.equal([
            [],
            [],
            [],
            [],
            [],
            []
          ]);
        });

        it('should exec fork 2', function () {
          expect(forkSource2.args).to.deep.equal([
            ['item',1,0],
            ['item',1,0],
            ['item',1,1],
            ['item',1,1]
          ]);
        });

        it('should push into chute 2', function () {
          expect(chute2.push.args).to.deep.equal([
            ['item',1,0],
            ['item',1,0]
          ]);
        });

        it('should pull from chute 2', function () {
          expect(chute2.pull.args).to.deep.equal([
            [],
            [],
            [],
            []
          ]);
        });

        it('should exec chute 2', function () {
          expect(source2.args).to.deep.equal([
            ['item',1,0],
            ['item',1,0]
          ]);
        });

        it('should push into fork 3', function () {
          expect(forkChute3.push.args).to.deep.equal([
            ['item',1,0],
            ['item',1,0],
            ['item',1,1],
            ['item',1,1]
          ]);
        });

        it('should pull from fork 3', function () {
          expect(forkChute3.pull.args).to.deep.equal([
            [],
            [],
            [],
            [],
            [],
            [],
            []
          ]);
        });

        it('should exec fork 3', function () {
          expect(forkSource3.args).to.deep.equal([
            ['item',1,0],
            ['item',1,0],
            ['item',1,1],
            ['item',1,1]
          ]);
        });

        it('should push into chute 3', function () {
          expect(chute3.push.args).to.deep.equal([
            ['item',1,1],
            ['item',1,1]
          ]);
        });

        it('should pull from chute 3', function () {
          expect(chute3.pull.args).to.deep.equal([
            [],
            [],
            [],
            [],
            []
          ]);
        });

        it('should exec chute 3', function () {
          expect(source3.args).to.deep.equal([
            ['item',1,1],
            ['item',1,1]
          ]);
        });

        it('should resolve chute1', function () {
          expect(chute1.resolved || chute1.rejected).to.equal(false);
        });

        it('should resolve fork2', function () {
          expect(forkChute2.resolved || forkChute2.rejected).to.equal(false);
        });

        it('should resolve chute2', function () {
          expect(chute2.resolved || chute2.rejected).to.equal(false);
        });

        it('should resolve fork3', function () {
          expect(forkChute3.resolved || forkChute3.rejected).to.equal(false);
        });

        it('should resolve chute3', function () {
          expect(chute3.resolved || chute3.rejected).to.equal(false);
        });

        describe('resolve',function(){

          before(function(){
            resolve('done3');
          });

          it('should exec source1', function () {
            expect(source1.args).to.deep.equal([
              [],
              [],
              [],
              []
            ]);
          });

          it('should not push into chain1', function () {
            expect(chute1.push.args).to.deep.equal([]);
          });

          it('should pull from chain1', function () {
            expect(chute1.pull.args).to.deep.equal([
              [],
              [],
              [],
              [],
              [],
              [],
              []
            ]);
          });

          it('should push into fork 2', function () {
            expect(forkChute2.push.args).to.deep.equal([
              ['item',1,0],
              ['item',1,0],
              ['item',1,1],
              ['item',1,1],
              ['item',1,2],
              ['item',1,2]
            ]);
          });

          it('should pull from fork 2', function () {
            expect(forkChute2.pull.args).to.deep.equal([
              [],
              [],
              [],
              [],
              [],
              [],
              [],
              [],
              []
            ]);
          });

          it('should exec fork 2', function () {
            expect(forkSource2.args).to.deep.equal([
              ['item',1,0],
              ['item',1,0],
              ['item',1,1],
              ['item',1,1],
              ['item',1,2],
              ['item',1,2]
            ]);
          });

          it('should push into chute 2', function () {
            expect(chute2.push.args).to.deep.equal([
              ['item',1,0],
              ['item',1,0],
              ['item',1,2],
              ['item',1,2]
            ]);
          });

          it('should pull from chute 2', function () {
            expect(chute2.pull.args).to.deep.equal([
              [],
              [],
              [],
              [],
              [],
              []
            ]);
          });

          it('should exec chute 2', function () {
            expect(source2.args).to.deep.equal([
              ['item',1,0],
              ['item',1,0],
              ['item',1,2],
              ['item',1,2]
            ]);
          });

          it('should push into fork 3', function () {
            expect(forkChute3.push.args).to.deep.equal([
              ['item',1,0],
              ['item',1,0],
              ['item',1,1],
              ['item',1,1],
              ['item',1,2],
              ['item',1,2]
            ]);
          });

          it('should pull from fork 3', function () {
            expect(forkChute3.pull.args).to.deep.equal([
              [],
              [],
              [],
              [],
              [],
              [],
              [],
              [],
              [],
              []
            ]);
          });

          it('should exec fork 3', function () {
            expect(forkSource3.args).to.deep.equal([
              ['item',1,0],
              ['item',1,0],
              ['item',1,1],
              ['item',1,1],
              ['item',1,2],
              ['item',1,2]
            ]);
          });

          it('should push into chute 3', function () {
            expect(chute3.push.args).to.deep.equal([
              ['item',1,1],
              ['item',1,1]
            ]);
          });

          it('should pull from chute 3', function () {
            expect(chute3.pull.args).to.deep.equal([
              [],
              [],
              [],
              [],
              [],
              [],
              []
            ]);
          });

          it('should exec chute 3', function () {
            expect(source3.args).to.deep.equal([
              ['item',1,1],
              ['item',1,1]
            ]);
          });

          it('should resolve chute1', function () {
            expect(chute1.resolved || chute1.rejected).to.equal(false);
          });

          it('should resolve fork2', function () {
            expect(forkChute2.resolved || forkChute2.rejected).to.equal(false);
          });

          it('should resolve chute2', function () {
            expect(chute2.resolved || chute2.rejected).to.equal(false);
          });

          it('should resolve fork3', function () {
            expect(forkChute3.resolved || forkChute3.rejected).to.equal(false);
          });

          it('should resolve chute3', function () {
            expect(chute3.resolved || chute3.rejected).to.equal(false);
          });

          describe('resolve',function(){

            before(function(){
              resolve('done4');
            });

            it('should exec source1', function () {
              expect(source1.args).to.deep.equal([
                [],
                [],
                [],
                []
              ]);
            });

            it('should not push into chain1', function () {
              expect(chute1.push.args).to.deep.equal([]);
            });

            it('should pull from chain1', function () {
              expect(chute1.pull.args).to.deep.equal([
                [],
                [],
                [],
                [],
                [],
                [],
                []
              ]);
            });

            it('should push into fork 2', function () {
              expect(forkChute2.push.args).to.deep.equal([
                ['item',1,0],
                ['item',1,0],
                ['item',1,1],
                ['item',1,1],
                ['item',1,2],
                ['item',1,2],
                ['item',1,3],
                ['item',1,3]
              ]);
            });

            it('should pull from fork 2', function () {
              expect(forkChute2.pull.args).to.deep.equal([
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                []
              ]);
            });

            it('should exec fork 2', function () {
              expect(forkSource2.args).to.deep.equal([
                ['item',1,0],
                ['item',1,0],
                ['item',1,1],
                ['item',1,1],
                ['item',1,2],
                ['item',1,2],
                ['item',1,3],
                ['item',1,3]
              ]);
            });

            it('should push into chute 2', function () {
              expect(chute2.push.args).to.deep.equal([
                ['item',1,0],
                ['item',1,0],
                ['item',1,2],
                ['item',1,2]
              ]);
            });

            it('should pull from chute 2', function () {
              expect(chute2.pull.args).to.deep.equal([
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                []
              ]);
            });

            it('should exec chute 2', function () {
              expect(source2.args).to.deep.equal([
                ['item',1,0],
                ['item',1,0],
                ['item',1,2],
                ['item',1,2]
              ]);
            });

            it('should push into fork 3', function () {
              expect(forkChute3.push.args).to.deep.equal([
                ['item',1,0],
                ['item',1,0],
                ['item',1,1],
                ['item',1,1],
                ['item',1,2],
                ['item',1,2],
                ['item',1,3],
                ['item',1,3]
              ]);
            });

            it('should pull from fork 3', function () {
              expect(forkChute3.pull.args).to.deep.equal([
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                []
              ]);
            });

            it('should exec fork 3', function () {
              expect(forkSource3.args).to.deep.equal([
                ['item',1,0],
                ['item',1,0],
                ['item',1,1],
                ['item',1,1],
                ['item',1,2],
                ['item',1,2],
                ['item',1,3],
                ['item',1,3]
              ]);
            });

            it('should push into chute 3', function () {
              expect(chute3.push.args).to.deep.equal([
                ['item',1,1],
                ['item',1,1],
                ['item',1,3],
                ['item',1,3]
              ]);
            });

            it('should pull from chute 3', function () {
              expect(chute3.pull.args).to.deep.equal([
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                []
              ]);
            });

            it('should exec chute 3', function () {
              expect(source3.args).to.deep.equal([
                ['item',1,1],
                ['item',1,1],
                ['item',1,3],
                ['item',1,3]
              ]);
            });

            it('should resolve chute1', function () {
              expect(chute1.resolved).to.equal(true);
            });

            it('should resolve fork2', function () {
              expect(forkChute2.resolved).to.equal(true);
            });

            it('should resolve chute2', function () {
              expect(chute2.resolved).to.equal(true);
            });

            it('should resolve fork3', function () {
              expect(forkChute3.resolved).to.equal(true);
            });

            it('should resolve chute3', function () {
              expect(chute3.resolved).to.equal(true);
            });
          });
        });
      });
    });
  });
});