'use strict';

var chai = require('chai'),
  expect = chai.expect,
  sinon = require('sinon'),
  ChunkChute = require('../src');

chai.use(require('chai-as-promised'));

describe('join', function () {

  describe('sync', function () {
    var source1, chute1, source2, chute2, source3, chute3, chute4, source5, chute5;

    before(function () {
      source1 = sinon.spy(function () {
        this.push('item', 1);
        this.push('item', 1);
        this.resolve();
      });
      chute1 = new ChunkChute(source1);
      source2 = sinon.spy(function () {
        this.push('item', 2);
        this.push('item', 2);
        this.resolve();
      });
      chute2 = new ChunkChute(source2);
      source3 = sinon.spy(function () {
        this.push('item', 3);
        this.push('item', 3);
        this.resolve();
      });
      chute3 = new ChunkChute(source3);
      chute4 = ChunkChute.join(chute1, chute2, chute3);
      source5 = sinon.spy(function () {
        return true;
      });
      chute5 = chute4.pipe(source5);
      sinon.spy(chute1, 'push');
      sinon.spy(chute1, 'pull');
      sinon.spy(chute2, 'push');
      sinon.spy(chute2, 'pull');
      sinon.spy(chute3, 'push');
      sinon.spy(chute3, 'pull');
      sinon.spy(chute4, 'push');
      sinon.spy(chute4, 'pull');
      sinon.spy(chute5, 'push');
      sinon.spy(chute5, 'pull');
      chute4.pull();
      return chute4.then();
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

    it('should exec source2', function () {
      expect(source2.args).to.deep.equal([
        []
      ]);
    });

    it('should not push into chain2', function () {
      expect(chute2.push.args).to.deep.equal([]);
    });

    it('should pull from chain2', function () {
      expect(chute2.pull.args).to.deep.equal([
        []
      ]);
    });

    it('should exec source3', function () {
      expect(source3.args).to.deep.equal([
        []
      ]);
    });

    it('should not push into chain3', function () {
      expect(chute3.push.args).to.deep.equal([]);
    });

    it('should pull from chain3', function () {
      expect(chute3.pull.args).to.deep.equal([
        []
      ]);
    });

    it('should push into chain', function () {
      expect(chute4.push.args).to.deep.equal([
        ['item', 1],
        ['item', 2],
        ['item', 3],
        ['item', 1],
        ['item', 2],
        ['item', 3]
      ]);
    });

    it('should pull from chain', function () {
      expect(chute4.pull.args).to.deep.equal([
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ]);
    });

    it('should exec source5', function () {
      expect(source5.args).to.deep.equal([
        ['item', 1],
        ['item', 2],
        ['item', 3],
        ['item', 1],
        ['item', 2],
        ['item', 3]
      ]);
    });

    it('should push into chain5', function () {
      expect(chute5.push.args).to.deep.equal([
        ['item', 1],
        ['item', 2],
        ['item', 3],
        ['item', 1],
        ['item', 2],
        ['item', 3]
      ]);
    });

    it('should pull from chain5', function () {
      expect(chute5.pull.args).to.deep.equal([
        [],
        [],
        [],
        [],
        [],
        []
      ]);
    });

    it('should resolve chute1', function () {
      expect(chute1.resolved).to.equal(true);
    });

    it('should resolve chute2', function () {
      expect(chute2.resolved).to.equal(true);
    });

    it('should resolve chute3', function () {
      expect(chute3.resolved).to.equal(true);
    });

    it('should resolve chute4', function () {
      expect(chute4.resolved).to.equal(true);
    });

    it('should resolve chute5', function () {
      expect(chute5.resolved).to.equal(true);
    });
  });

  describe('async', function () {
    var source1, chute1, resolve1, source2, chute2, resolve2, source3, chute3, resolve3, chute4, source5, chute5;

    before(function () {
      var index1 = 0;
      source1 = sinon.spy(function () {
        if (index1++) {
          return this.resolve();
        }
        this.push('item', 1);
        this.push('item', 1);
        return new Promise(function (res) {
          resolve1 = res;
        });
      });
      chute1 = new ChunkChute(source1);
      var index2 = 0;
      source2 = sinon.spy(function () {
        if (index2++) {
          return this.resolve();
        }
        this.push('item', 2);
        this.push('item', 2);
        return new Promise(function (res) {
          resolve2 = res;
        });
      });
      chute2 = new ChunkChute(source2);
      var index3 = 0;
      source3 = sinon.spy(function () {
        if (index3++) {
          return this.resolve();
        }
        this.push('item', 3);
        this.push('item', 3);
        return new Promise(function (res) {
          resolve3 = res;
        });
      });
      chute3 = new ChunkChute(source3);
      chute4 = ChunkChute.join(chute1, chute2, chute3);
      source5 = sinon.spy(function () {
        return true;
      });
      chute5 = chute4.pipe(source5);
      sinon.spy(chute1, 'push');
      sinon.spy(chute1, 'pull');
      sinon.spy(chute2, 'push');
      sinon.spy(chute2, 'pull');
      sinon.spy(chute3, 'push');
      sinon.spy(chute3, 'pull');
      sinon.spy(chute4, 'push');
      sinon.spy(chute4, 'pull');
      sinon.spy(chute5, 'push');
      sinon.spy(chute5, 'pull');
      chute5.pull();
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

    it('should exec source2', function () {
      expect(source2.args).to.deep.equal([
        []
      ]);
    });

    it('should not push into chain2', function () {
      expect(chute2.push.args).to.deep.equal([]);
    });

    it('should pull from chain2', function () {
      expect(chute2.pull.args).to.deep.equal([
        []
      ]);
    });

    it('should exec source3', function () {
      expect(source3.args).to.deep.equal([
        []
      ]);
    });

    it('should not push into chain3', function () {
      expect(chute3.push.args).to.deep.equal([]);
    });

    it('should pull from chain3', function () {
      expect(chute3.pull.args).to.deep.equal([
        []
      ]);
    });

    it('should push into chain4', function () {
      expect(chute4.push.args).to.deep.equal([]);
    });

    it('should pull from chain4', function () {
      expect(chute4.pull.args).to.deep.equal([
        []
      ]);
    });

    it('should not exec source5', function () {
      expect(source5.args).to.deep.equal([]);
    });

    it('should not push into chain5', function () {
      expect(chute5.push.args).to.deep.equal([]);
    });

    it('should pull from chain5', function () {
      expect(chute5.pull.args).to.deep.equal([
        []
      ]);
    });

    it('should not resolve chute1', function () {
      expect(chute1.resolved || chute1.rejected).to.equal(false);
    });

    it('should not resolve chute2', function () {
      expect(chute2.resolved || chute2.rejected).to.equal(false);
    });

    it('should not resolve chute3', function () {
      expect(chute3.resolved || chute3.rejected).to.equal(false);
    });

    it('should not resolve chute5', function () {
      expect(chute4.resolved || chute4.rejected).to.equal(false);
    });

    it('should not resolve chute5', function () {
      expect(chute5.resolved || chute5.rejected).to.equal(false);
    });

    describe('resolve 1', function () {

      before(function () {
        resolve1();
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
          []
        ]);
      });

      it('should exec source2', function () {
        expect(source2.args).to.deep.equal([
          []
        ]);
      });

      it('should not push into chain2', function () {
        expect(chute2.push.args).to.deep.equal([]);
      });

      it('should pull from chain2', function () {
        expect(chute2.pull.args).to.deep.equal([
          []
        ]);
      });

      it('should exec source3', function () {
        expect(source3.args).to.deep.equal([
          []
        ]);
      });

      it('should not push into chain3', function () {
        expect(chute3.push.args).to.deep.equal([]);
      });

      it('should pull from chain3', function () {
        expect(chute3.pull.args).to.deep.equal([
          []
        ]);
      });

      it('should push into chain4', function () {
        expect(chute4.push.args).to.deep.equal([
          ['item', 1],
          ['item', 1]
        ]);
      });

      it('should pull from chain4', function () {
        expect(chute4.pull.args).to.deep.equal([
          [],
          [],
          []
        ]);
      });

      it('should exec source5', function () {
        expect(source5.args).to.deep.equal([
          ['item', 1],
          ['item', 1]
        ]);
      });

      it('should push into chain5', function () {
        expect(chute5.push.args).to.deep.equal([
          ['item', 1],
          ['item', 1]
        ]);
      });

      it('should pull from chain5', function () {
        expect(chute5.pull.args).to.deep.equal([
          [],
          [],
          []
        ]);
      });

      it('should resolve chute1', function () {
        expect(chute1.resolved).to.equal(true);
      });

      it('should not resolve chute2', function () {
        expect(chute2.resolved || chute2.rejected).to.equal(false);
      });

      it('should not resolve chute3', function () {
        expect(chute3.resolved || chute3.rejected).to.equal(false);
      });

      it('should not resolve chute4', function () {
        expect(chute4.resolved || chute4.rejected).to.equal(false);
      });

      it('should not resolve chute5', function () {
        expect(chute5.resolved || chute5.rejected).to.equal(false);
      });

      describe('resolve 2', function () {

        before(function () {
          resolve2();
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
            []
          ]);
        });

        it('should exec source2', function () {
          expect(source2.args).to.deep.equal([
            [],
            []
          ]);
        });

        it('should not push into chain2', function () {
          expect(chute2.push.args).to.deep.equal([]);
        });

        it('should pull from chain2', function () {
          expect(chute2.pull.args).to.deep.equal([
            [],
            []
          ]);
        });

        it('should exec source3', function () {
          expect(source3.args).to.deep.equal([
            []
          ]);
        });

        it('should not push into chain3', function () {
          expect(chute3.push.args).to.deep.equal([]);
        });

        it('should pull from chain3', function () {
          expect(chute3.pull.args).to.deep.equal([
            []
          ]);
        });

        it('should push into chain4', function () {
          expect(chute4.push.args).to.deep.equal([
            ['item', 1],
            ['item', 1],
            ['item', 2],
            ['item', 2]
          ]);
        });

        it('should pull from chain4', function () {
          expect(chute4.pull.args).to.deep.equal([
            [],
            [],
            [],
            [],
            []
          ]);
        });

        it('should exec source5', function () {
          expect(source5.args).to.deep.equal([
            ['item', 1],
            ['item', 1],
            ['item', 2],
            ['item', 2]
          ]);
        });

        it('should push into chain5', function () {
          expect(chute5.push.args).to.deep.equal([
            ['item', 1],
            ['item', 1],
            ['item', 2],
            ['item', 2]
          ]);
        });

        it('should pull from chain5', function () {
          expect(chute5.pull.args).to.deep.equal([
            [],
            [],
            [],
            [],
            []
          ]);
        });

        it('should resolve chute1', function () {
          expect(chute1.resolved).to.equal(true);
        });

        it('should resolve chute2', function () {
          expect(chute2.resolved).to.equal(true);
        });

        it('should not resolve chute3', function () {
          expect(chute3.resolved || chute3.rejected).to.equal(false);
        });

        it('should not resolve chute4', function () {
          expect(chute4.resolved || chute4.rejected).to.equal(false);
        });

        it('should not resolve chute5', function () {
          expect(chute5.resolved || chute5.rejected).to.equal(false);
        });

        describe('resolve 3', function () {

          before(function () {
            resolve3();
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
              []
            ]);
          });

          it('should exec source2', function () {
            expect(source2.args).to.deep.equal([
              [],
              []
            ]);
          });

          it('should not push into chain2', function () {
            expect(chute2.push.args).to.deep.equal([]);
          });

          it('should pull from chain2', function () {
            expect(chute2.pull.args).to.deep.equal([
              [],
              []
            ]);
          });

          it('should exec source3', function () {
            expect(source3.args).to.deep.equal([
              [],
              []
            ]);
          });

          it('should not push into chain3', function () {
            expect(chute3.push.args).to.deep.equal([]);
          });

          it('should pull from chain3', function () {
            expect(chute3.pull.args).to.deep.equal([
              [],
              []
            ]);
          });

          it('should push into chain4', function () {
            expect(chute4.push.args).to.deep.equal([
              ['item', 1],
              ['item', 1],
              ['item', 2],
              ['item', 2],
              ['item', 3],
              ['item', 3]
            ]);
          });

          it('should pull from chain4', function () {
            expect(chute4.pull.args).to.deep.equal([
              [],
              [],
              [],
              [],
              [],
              [],
              []
            ]);
          });

          it('should exec source5', function () {
            expect(source5.args).to.deep.equal([
              ['item', 1],
              ['item', 1],
              ['item', 2],
              ['item', 2],
              ['item', 3],
              ['item', 3]
            ]);
          });

          it('should push into chain5', function () {
            expect(chute5.push.args).to.deep.equal([
              ['item', 1],
              ['item', 1],
              ['item', 2],
              ['item', 2],
              ['item', 3],
              ['item', 3]
            ]);
          });

          it('should pull from chain5', function () {
            expect(chute5.pull.args).to.deep.equal([
              [],
              [],
              [],
              [],
              [],
              [],
              []
            ]);
          });

          it('should resolve chute1', function () {
            expect(chute1.resolved).to.equal(true);
          });

          it('should resolve chute2', function () {
            expect(chute2.resolved).to.equal(true);
          });

          it('should resolve chute3', function () {
            expect(chute3.resolved).to.equal(true);
          });

          it('should resolve chute4', function () {
            expect(chute4.resolved).to.equal(true);
          });

          it('should resolve chute5', function () {
            expect(chute5.resolved).to.equal(true);
          });
        });
      });
    });
  });
});