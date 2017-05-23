'use strict';

var chai = require('chai'),
  expect = chai.expect,
  sinon = require('sinon'),
  ChunkChute = require('../src');

chai.use(require('chai-as-promised'));

describe('follower', function () {

  describe('sync', function () {

    describe('0 items', function () {

      describe('resolve chute1', function () {
        var source1, chute1, source2, chute2, source3, chute3;

        before(function () {
          source1 = sinon.spy(function () {
            this.resolve('done');
          });
          chute1 = new ChunkChute(source1);
          source2 = sinon.spy();
          chute2 = chute1.pipe(source2);
          source3 = sinon.spy(function(){
            return true;
          });
          chute3 = chute2.pipe(source3);
          sinon.spy(chute1, 'push');
          sinon.spy(chute1, 'pull');
          sinon.spy(chute2, 'push');
          sinon.spy(chute2, 'pull');
          sinon.spy(chute3, 'push');
          sinon.spy(chute3, 'pull');
          return chute3.pull();
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

        it('should not exec source2', function () {
          expect(source2.args).to.deep.equal([]);
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

        it('should not exec source3', function () {
          expect(source3.args).to.deep.equal([]);
        });

        it('should not push into chain3', function () {
          expect(chute3.push.args).to.deep.equal([]);
        });

        it('should pull from chain3', function () {
          expect(chute3.pull.args).to.deep.equal([
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
      });

      describe('resolve chute2', function () {
        var source1, chute1, source2, chute2, source3, chute3;

        before(function () {
          source1 = sinon.spy(function () {
            this.push('hello', 'world', 1);
          });
          chute1 = new ChunkChute(source1);
          source2 = sinon.spy(function () {
            this.resolve('done');
          });
          chute2 = chute1.pipe(source2);
          source3 = sinon.spy(function(){
            return true;
          });
          chute3 = chute2.pipe(source3);
          sinon.spy(chute1, 'push');
          sinon.spy(chute1, 'pull');
          sinon.spy(chute2, 'push');
          sinon.spy(chute2, 'pull');
          sinon.spy(chute3, 'push');
          sinon.spy(chute3, 'pull');
          return chute3.pull();
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
            ['hello', 'world', 1]
          ]);
        });

        it('should push into chain2', function () {
          expect(chute2.push.args).to.deep.equal([
            ['hello', 'world', 1]
          ]);
        });

        it('should pull from chain2', function () {
          expect(chute2.pull.args).to.deep.equal([
            [],
            []
          ]);
        });

        it('should not exec source3', function () {
          expect(source3.args).to.deep.equal([]);
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

        it('should not resolve chute1', function () {
          expect(chute1.resolved || chute1.rejected).to.equal(false);
        });

        it('should resolve chute2', function () {
          expect(chute2.resolved).to.equal(true);
        });

        it('should resolve chute3', function () {
          expect(chute3.resolved).to.equal(true);
        });
      });

      describe('resolve chute3', function () {
        var source1, chute1, source2, chute2, source3, chute3;

        before(function () {
          source1 = sinon.spy(function () {
            this.push('hello', 'world', 1);
          });
          chute1 = new ChunkChute(source1);
          source2 = sinon.spy(function () {
            this.push('hello', 'world', 2);
          });
          chute2 = chute1.pipe(source2);
          source3 = sinon.spy(function () {
            this.resolve('done');
          });
          chute3 = chute2.pipe(source3);
          sinon.spy(chute1, 'push');
          sinon.spy(chute1, 'pull');
          sinon.spy(chute2, 'push');
          sinon.spy(chute2, 'pull');
          sinon.spy(chute3, 'push');
          sinon.spy(chute3, 'pull');
          return chute3.pull();
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
            ['hello', 'world', 1]
          ]);
        });

        it('should push into chain2', function () {
          expect(chute2.push.args).to.deep.equal([
            ['hello', 'world', 1]
          ]);
        });

        it('should pull from chain2', function () {
          expect(chute2.pull.args).to.deep.equal([
            [],
            []
          ]);
        });

        it('should exec source3', function () {
          expect(source3.args).to.deep.equal([
            ['hello', 'world', 2]
          ]);
        });

        it('should push into chain3', function () {
          expect(chute3.push.args).to.deep.equal([
            ['hello', 'world', 2]
          ]);
        });

        it('should pull from chain3', function () {
          expect(chute3.pull.args).to.deep.equal([
            [],
            []
          ]);
        });

        it('should not resolve chute1', function () {
          expect(chute1.resolved || chute1.rejected).to.equal(false);
        });

        it('should not resolve chute2', function () {
          expect(chute2.resolved || chute2.rejected).to.equal(false);
        });

        it('should resolve chute3', function () {
          expect(chute3.resolved).to.equal(true);
        });
      });
    });

    describe('3 items', function () {

      describe('resolve chute1', function () {
        var source1, chute1, source2, chute2, source3, chute3;

        before(function () {
          var index = 0;
          source1 = sinon.spy(function () {
            this.push('item', 1, index);
            this.push('item', 1, index);
            index += 1;
            if (index === 3) {
              this.resolve('done');
            }
          });
          chute1 = new ChunkChute(source1);
          source2 = sinon.spy(function (name) {
            this.push(name, 2, index);
            this.push(name, 2, index);
          });
          chute2 = chute1.pipe(source2);
          source3 = sinon.spy(function(){
            return true;
          });
          chute3 = chute2.pipe(source3);
          sinon.spy(chute1, 'push');
          sinon.spy(chute1, 'pull');
          sinon.spy(chute2, 'push');
          sinon.spy(chute2, 'pull');
          sinon.spy(chute3, 'push');
          sinon.spy(chute3, 'pull');
          return chute3.pull();
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
            []
          ]);
        });

        it('should exec source2', function () {
          expect(source2.args).to.deep.equal([
            ['item', 1, 0],
            ['item', 1, 0],
            ['item', 1, 1],
            ['item', 1, 1],
            ['item', 1, 2],
            ['item', 1, 2]
          ]);
        });

        it('should push into chain2', function () {
          expect(chute2.push.args).to.deep.equal([
            ['item', 1, 0],
            ['item', 1, 0],
            ['item', 1, 1],
            ['item', 1, 1],
            ['item', 1, 2],
            ['item', 1, 2]
          ]);
        });

        it('should pull from chain2', function () {
          expect(chute2.pull.args).to.deep.equal([
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

        it('should exec source3', function () {
          expect(source3.args).to.deep.equal([
            ['item', 2, 1],
            ['item', 2, 1],
            ['item', 2, 1],
            ['item', 2, 1],
            ['item', 2, 2],
            ['item', 2, 2],
            ['item', 2, 2],
            ['item', 2, 2],
            ['item', 2, 3],
            ['item', 2, 3],
            ['item', 2, 3],
            ['item', 2, 3]
          ]);
        });

        it('should push into chain3', function () {
          expect(chute3.push.args).to.deep.equal([
            ['item', 2, 1],
            ['item', 2, 1],
            ['item', 2, 1],
            ['item', 2, 1],
            ['item', 2, 2],
            ['item', 2, 2],
            ['item', 2, 2],
            ['item', 2, 2],
            ['item', 2, 3],
            ['item', 2, 3],
            ['item', 2, 3],
            ['item', 2, 3]
          ]);
        });

        it('should pull from chain3', function () {
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

        it('should resolve chute1', function () {
          expect(chute1.resolved).to.equal(true);
        });

        it('should resolve chute2', function () {
          expect(chute2.resolved).to.equal(true);
        });

        it('should resolve chute3', function () {
          expect(chute3.resolved).to.equal(true);
        });
      });

      describe('resolve chute2', function () {
        var source1, chute1, source2, chute2, source3, chute3;

        before(function () {
          var index = 0;
          source1 = sinon.spy(function () {
            this.push('item', 1, index);
            this.push('item', 1, index);
          });
          chute1 = new ChunkChute(source1);
          source2 = sinon.spy(function (name) {
            this.push(name, 2, index);
            this.push(name, 2, index);
            index++;
            if (index === 3) {
              this.resolve('done');
            }
          });
          chute2 = chute1.pipe(source2);
          source3 = sinon.spy(function(){
            return true;
          });
          chute3 = chute2.pipe(source3);
          sinon.spy(chute1, 'push');
          sinon.spy(chute1, 'pull');
          sinon.spy(chute2, 'push');
          sinon.spy(chute2, 'pull');
          sinon.spy(chute3, 'push');
          sinon.spy(chute3, 'pull');
          return chute3.pull();
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
            ['item', 1, 0],
            ['item', 1, 0],
            ['item', 1, 2]
          ]);
        });

        it('should push into chain2', function () {
          expect(chute2.push.args).to.deep.equal([
            ['item', 1, 0],
            ['item', 1, 0],
            ['item', 1, 2],
            ['item', 1, 2]
          ]);
        });

        it('should pull from chain2', function () {
          expect(chute2.pull.args).to.deep.equal([
            [],
            [],
            [],
            [],
            []
          ]);
        });

        it('should exec source3', function () {
          expect(source3.args).to.deep.equal([
            ['item', 2, 0],
            ['item', 2, 0],
            ['item', 2, 1],
            ['item', 2, 1],
            ['item', 2, 2],
            ['item', 2, 2]
          ]);
        });

        it('should push into chain3', function () {
          expect(chute3.push.args).to.deep.equal([
            ['item', 2, 0],
            ['item', 2, 0],
            ['item', 2, 1],
            ['item', 2, 1],
            ['item', 2, 2],
            ['item', 2, 2]
          ]);
        });

        it('should pull from chain3', function () {
          expect(chute3.pull.args).to.deep.equal([
            [],
            [],
            [],
            []
          ]);
        });

        it('should not resolve chute1', function () {
          expect(chute1.resolved || chute1.rejected).to.equal(false);
        });

        it('should resolve chute2', function () {
          expect(chute2.resolved).to.equal(true);
        });

        it('should resolve chute3', function () {
          expect(chute3.resolved).to.equal(true);
        });
      });

      describe('resolve chute3', function () {
        var source1, chute1, source2, chute2, source3, chute3;

        before(function () {
          var index = 0;
          source1 = sinon.spy(function () {
            this.push('item', 1, index);
            this.push('item', 1, index);
          });
          chute1 = new ChunkChute(source1);
          source2 = sinon.spy(function (name) {
            this.push(name, 2, index);
            this.push(name, 2, index);
          });
          chute2 = chute1.pipe(source2);
          source3 = sinon.spy(function () {
            index++;
            if (index === 3) {
              return this.resolve('done');
            }
            return true;
          });
          chute3 = chute2.pipe(source3);
          sinon.spy(chute1, 'push');
          sinon.spy(chute1, 'pull');
          sinon.spy(chute2, 'push');
          sinon.spy(chute2, 'pull');
          sinon.spy(chute3, 'push');
          sinon.spy(chute3, 'pull');
          return chute3.pull();
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
            ['item', 1, 0],
            ['item', 1, 0]
          ]);
        });

        it('should push into chain2', function () {
          expect(chute2.push.args).to.deep.equal([
            ['item', 1, 0],
            ['item', 1, 0]
          ]);
        });

        it('should pull from chain2', function () {
          expect(chute2.pull.args).to.deep.equal([
            [],
            [],
            []
          ]);
        });

        it('should exec source3', function () {
          expect(source3.args).to.deep.equal([
            ['item', 2, 0],
            ['item', 2, 0],
            ['item', 2, 2]
          ]);
        });

        it('should push into chain3', function () {
          expect(chute3.push.args).to.deep.equal([
            ['item', 2, 0],
            ['item', 2, 0],
            ['item', 2, 2],
            ['item', 2, 2]
          ]);
        });

        it('should pull from chain3', function () {
          expect(chute3.pull.args).to.deep.equal([
            [],
            [],
            []
          ]);
        });

        it('should not resolve chute1', function () {
          expect(chute1.resolved || chute1.rejected).to.equal(false);
        });

        it('should not resolve chute2', function () {
          expect(chute2.resolved || chute2.rejected).to.equal(false);
        });

        it('should resolve chute3', function () {
          expect(chute3.resolved).to.equal(true);
        });
      });
    });
  });

  describe('async', function () {

    describe('0 times', function () {

      describe('resolve chute1', function () {
        var source1, chute1, source2, chute2, source3, chute3, resolve;

        before(function () {
          source1 = sinon.spy(function () {
            var context = this;
            return new Promise(function (res) {
              resolve = res;
            }).then(function () {
              context.resolve('done');
            });
          });
          chute1 = new ChunkChute(source1);
          source2 = sinon.spy();
          chute2 = chute1.pipe(source2);
          source3 = sinon.spy();
          chute3 = chute2.pipe(source3);
          sinon.spy(chute1, 'push');
          sinon.spy(chute1, 'pull');
          sinon.spy(chute2, 'push');
          sinon.spy(chute2, 'pull');
          sinon.spy(chute3, 'push');
          sinon.spy(chute3, 'pull');
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

        it('should not exec source2', function () {
          expect(source2.args).to.deep.equal([]);
        });

        it('should not push into chain2', function () {
          expect(chute2.push.args).to.deep.equal([]);
        });

        it('should pull from chain2', function () {
          expect(chute2.pull.args).to.deep.equal([
            []
          ]);
        });

        it('should not exec source3', function () {
          expect(source3.args).to.deep.equal([]);
        });

        it('should not push into chain3', function () {
          expect(chute3.push.args).to.deep.equal([]);
        });

        it('should pull from chain3', function () {
          expect(chute3.pull.args).to.deep.equal([
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

        describe('resolve', function () {
          var resolved, rejected;

          before(function () {
            resolved = sinon.spy();
            rejected = sinon.spy();
            chute3.then(resolved, rejected);
            resolve('item 1');
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

          it('should not exec source2', function () {
            expect(source2.args).to.deep.equal([]);
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

          it('should not exec source3', function () {
            expect(source3.args).to.deep.equal([]);
          });

          it('should not push into chain3', function () {
            expect(chute3.push.args).to.deep.equal([]);
          });

          it('should pull from chain3', function () {
            expect(chute3.pull.args).to.deep.equal([
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

          it('should resolve', function () {
            expect(resolved.args).to.deep.equal([
              ['done']
            ]);
          });

          it('should not reject', function () {
            expect(rejected.args).to.deep.equal([]);
          });
        });
      });

      describe('resolve chute2', function () {
        var source1, chute1, source2, chute2, source3, chute3, resolve;

        before(function () {
          source1 = sinon.spy(function () {
            return new Promise(function (res) {
              resolve = res;
            }).then(this.push);
          });
          chute1 = new ChunkChute(source1);
          source2 = sinon.spy(function () {
            var context = this;
            return new Promise(function (res) {
              resolve = res;
            }).then(function () {
              context.resolve('done');
            });
          });
          chute2 = chute1.pipe(source2);
          source3 = sinon.spy();
          chute3 = chute2.pipe(source3);
          sinon.spy(chute1, 'push');
          sinon.spy(chute1, 'pull');
          sinon.spy(chute2, 'push');
          sinon.spy(chute2, 'pull');
          sinon.spy(chute3, 'push');
          sinon.spy(chute3, 'pull');
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

        it('should not exec source2', function () {
          expect(source2.args).to.deep.equal([]);
        });

        it('should not push into chain2', function () {
          expect(chute2.push.args).to.deep.equal([]);
        });

        it('should pull from chain2', function () {
          expect(chute2.pull.args).to.deep.equal([
            []
          ]);
        });

        it('should not exec source3', function () {
          expect(source3.args).to.deep.equal([]);
        });

        it('should not push into chain3', function () {
          expect(chute3.push.args).to.deep.equal([]);
        });

        it('should pull from chain3', function () {
          expect(chute3.pull.args).to.deep.equal([
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

        describe('resolve', function () {

          before(function () {
            resolve('item 1');
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
              ['item 1']
            ]);
          });

          it('should push into chain2', function () {
            expect(chute2.push.args).to.deep.equal([
              ['item 1']
            ]);
          });

          it('should pull from chain2', function () {
            expect(chute2.pull.args).to.deep.equal([
              [],
              []
            ]);
          });

          it('should not exec source3', function () {
            expect(source3.args).to.deep.equal([]);
          });

          it('should not push into chain3', function () {
            expect(chute3.push.args).to.deep.equal([]);
          });

          it('should pull from chain3', function () {
            expect(chute3.pull.args).to.deep.equal([
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

          describe('resolve', function () {
            var resolved, rejected;

            before(function () {
              resolved = sinon.spy();
              rejected = sinon.spy();
              chute3.then(resolved, rejected);
              resolve('item 2');
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
                ['item 1']
              ]);
            });

            it('should not push into chain2', function () {
              expect(chute2.push.args).to.deep.equal([
                ['item 1']
              ]);
            });

            it('should pull from chain2', function () {
              expect(chute2.pull.args).to.deep.equal([
                [],
                []
              ]);
            });

            it('should not exec source3', function () {
              expect(source3.args).to.deep.equal([]);
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

            it('should not resolve chute1', function () {
              expect(chute1.resolved || chute1.rejected).to.equal(false);
            });

            it('should resolve chute2', function () {
              expect(chute2.resolved).to.equal(true);
            });

            it('should resolve chute3', function () {
              expect(chute3.resolved).to.equal(true);
            });

            it('should resolve', function () {
              expect(resolved.args).to.deep.equal([
                ['done']
              ]);
            });

            it('should not reject', function () {
              expect(rejected.args).to.deep.equal([]);
            });
          });
        });
      });

      describe('resolve chute3', function () {
        var source1, chute1, source2, chute2, source3, chute3, resolve;

        before(function () {
          source1 = sinon.spy(function () {
            return new Promise(function (res) {
              resolve = res;
            }).then(this.push);
          });
          chute1 = new ChunkChute(source1);
          source2 = sinon.spy(function () {
            return new Promise(function (res) {
              resolve = res;
            }).then(this.push);
          });
          chute2 = chute1.pipe(source2);
          source3 = sinon.spy(function () {
            var context = this;
            return new Promise(function (res) {
              resolve = res;
            }).then(function () {
              context.resolve('done');
            });
          });
          chute3 = chute2.pipe(source3);
          sinon.spy(chute1, 'push');
          sinon.spy(chute1, 'pull');
          sinon.spy(chute2, 'push');
          sinon.spy(chute2, 'pull');
          sinon.spy(chute3, 'push');
          sinon.spy(chute3, 'pull');
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

        it('should not exec source2', function () {
          expect(source2.args).to.deep.equal([]);
        });

        it('should not push into chain2', function () {
          expect(chute2.push.args).to.deep.equal([]);
        });

        it('should pull from chain2', function () {
          expect(chute2.pull.args).to.deep.equal([
            []
          ]);
        });

        it('should not exec source3', function () {
          expect(source3.args).to.deep.equal([]);
        });

        it('should not push into chain3', function () {
          expect(chute3.push.args).to.deep.equal([]);
        });

        it('should pull from chain3', function () {
          expect(chute3.pull.args).to.deep.equal([
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

        describe('resolve', function () {

          before(function () {
            resolve('item 1');
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
              ['item 1']
            ]);
          });

          it('should push into chain2', function () {
            expect(chute2.push.args).to.deep.equal([
              ['item 1']
            ]);
          });

          it('should pull from chain2', function () {
            expect(chute2.pull.args).to.deep.equal([
              [],
              []
            ]);
          });

          it('should not exec source3', function () {
            expect(source3.args).to.deep.equal([]);
          });

          it('should not push into chain3', function () {
            expect(chute3.push.args).to.deep.equal([]);
          });

          it('should pull from chain3', function () {
            expect(chute3.pull.args).to.deep.equal([
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

          describe('resolve', function () {

            before(function () {
              resolve('item 2');
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
                ['item 1']
              ]);
            });

            it('should not push into chain2', function () {
              expect(chute2.push.args).to.deep.equal([
                ['item 1']
              ]);
            });

            it('should pull from chain2', function () {
              expect(chute2.pull.args).to.deep.equal([
                [],
                []
              ]);
            });

            it('should exec source3', function () {
              expect(source3.args).to.deep.equal([
                ['item 2']
              ]);
            });

            it('should push into chain3', function () {
              expect(chute3.push.args).to.deep.equal([
                ['item 2']
              ]);
            });

            it('should pull from chain3', function () {
              expect(chute3.pull.args).to.deep.equal([
                [],
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

            describe('resolve', function () {
              var resolved, rejected;

              before(function () {
                resolved = sinon.spy();
                rejected = sinon.spy();
                chute3.then(resolved, rejected);
                resolve('item 3');
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
                  ['item 1']
                ]);
              });

              it('should not push into chain2', function () {
                expect(chute2.push.args).to.deep.equal([
                  ['item 1']
                ]);
              });

              it('should pull from chain2', function () {
                expect(chute2.pull.args).to.deep.equal([
                  [],
                  []
                ]);
              });

              it('should not exec source3', function () {
                expect(source3.args).to.deep.equal([
                  ['item 2']
                ]);
              });

              it('should not push into chain3', function () {
                expect(chute3.push.args).to.deep.equal([
                  ['item 2']
                ]);
              });

              it('should pull from chain3', function () {
                expect(chute3.pull.args).to.deep.equal([
                  [],
                  []
                ]);
              });

              it('should not resolve chute1', function () {
                expect(chute1.resolved || chute1.rejected).to.equal(false);
              });

              it('should not resolve chute2', function () {
                expect(chute2.resolved || chute2.rejected).to.equal(false);
              });

              it('should resolve chute3', function () {
                expect(chute3.resolved).to.equal(true);
              });

              it('should resolve', function () {
                expect(resolved.args).to.deep.equal([
                  ['done']
                ]);
              });

              it('should not reject', function () {
                expect(rejected.args).to.deep.equal([]);
              });
            });
          });
        });
      });
    });

    describe('3 times', function () {

      describe('resolve chute1', function () {
        var source1, chute1, source2, chute2, source3, chute3, resolve;

        before(function () {
          var index = 0;
          source1 = sinon.spy(function () {
            var context = this;
            return new Promise(function (res) {
              resolve = res;
            }).then(function () {
              context.push('item', 1, index);
              context.push('item', 1, index);
              index += 1;
              if (index === 3) {
                context.resolve();
              }
            });
          });
          chute1 = new ChunkChute(source1);
          source2 = sinon.spy();
          chute2 = chute1.pipe(source2);
          source3 = sinon.spy(function(){
            return true;
          });
          chute3 = chute2.pipe(source3);
          sinon.spy(chute1, 'push');
          sinon.spy(chute1, 'pull');
          sinon.spy(chute2, 'push');
          sinon.spy(chute2, 'pull');
          sinon.spy(chute3, 'push');
          sinon.spy(chute3, 'pull');
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

        it('should not exec source2', function () {
          expect(source2.args).to.deep.equal([]);
        });

        it('should not push into chain2', function () {
          expect(chute2.push.args).to.deep.equal([]);
        });

        it('should pull from chain2', function () {
          expect(chute2.pull.args).to.deep.equal([
            []
          ]);
        });

        it('should not exec source3', function () {
          expect(source3.args).to.deep.equal([]);
        });

        it('should not push into chain3', function () {
          expect(chute3.push.args).to.deep.equal([]);
        });

        it('should pull from chain3', function () {
          expect(chute3.pull.args).to.deep.equal([
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

        describe('resolve', function () {

          before(function () {
            resolve('item 1');
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
              ['item', 1, 0],
              ['item', 1, 0]
            ]);
          });

          it('should push into chain2', function () {
            expect(chute2.push.args).to.deep.equal([
              ['item', 1, 0],
              ['item', 1, 0]
            ]);
          });

          it('should pull from chain2', function () {
            expect(chute2.pull.args).to.deep.equal([
              [],
              [],
              [],
              []
            ]);
          });

          it('should not exec source3', function () {
            expect(source3.args).to.deep.equal([]);
          });

          it('should not push into chain3', function () {
            expect(chute3.push.args).to.deep.equal([]);
          });

          it('should pull from chain3', function () {
            expect(chute3.pull.args).to.deep.equal([
              [],
              [],
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

          describe('resolve', function () {

            before(function () {
              resolve('item 1');
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
                []
              ]);
            });

            it('should exec source2', function () {
              expect(source2.args).to.deep.equal([
                ['item', 1, 0],
                ['item', 1, 0],
                ['item', 1, 1],
                ['item', 1, 1]
              ]);
            });

            it('should push into chain2', function () {
              expect(chute2.push.args).to.deep.equal([
                ['item', 1, 0],
                ['item', 1, 0],
                ['item', 1, 1],
                ['item', 1, 1]
              ]);
            });

            it('should pull from chain2', function () {
              expect(chute2.pull.args).to.deep.equal([
                [],
                [],
                [],
                [],
                [],
                [],
                []
              ]);
            });

            it('should not exec source3', function () {
              expect(source3.args).to.deep.equal([]);
            });

            it('should not push into chain3', function () {
              expect(chute3.push.args).to.deep.equal([]);
            });

            it('should pull from chain3', function () {
              expect(chute3.pull.args).to.deep.equal([
                [],
                [],
                [],
                [],
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

            describe('resolve', function () {
              var resolved, rejected;

              before(function () {
                resolved = sinon.spy();
                rejected = sinon.spy();
                chute3.then(resolved, rejected);
                resolve('item 1');
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
                  []
                ]);
              });

              it('should exec source2', function () {
                expect(source2.args).to.deep.equal([
                  ['item', 1, 0],
                  ['item', 1, 0],
                  ['item', 1, 1],
                  ['item', 1, 1],
                  ['item', 1, 2],
                  ['item', 1, 2]
                ]);
              });

              it('should push into chain2', function () {
                expect(chute2.push.args).to.deep.equal([
                  ['item', 1, 0],
                  ['item', 1, 0],
                  ['item', 1, 1],
                  ['item', 1, 1],
                  ['item', 1, 2],
                  ['item', 1, 2]
                ]);
              });

              it('should pull from chain2', function () {
                expect(chute2.pull.args).to.deep.equal([
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

              it('should not exec source3', function () {
                expect(source3.args).to.deep.equal([]);
              });

              it('should not push into chain3', function () {
                expect(chute3.push.args).to.deep.equal([]);
              });

              it('should pull from chain3', function () {
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

              it('should resolve chute1', function () {
                expect(chute1.resolved).to.equal(true);
              });

              it('should resolve chute2', function () {
                expect(chute2.resolved).to.equal(true);
              });

              it('should resolve chute3', function () {
                expect(chute3.resolved).to.equal(true);
              });

              it('should resolve', function () {
                expect(resolved.args).to.deep.equal([
                  [undefined]
                ]);
              });

              it('should not reject', function () {
                expect(rejected.args).to.deep.equal([]);
              });
            });
          });
        });
      });

      describe('resolve chute2', function () {
        var source1, chute1, source2, chute2, source3, chute3, resolve;

        before(function () {
          var index = 0;
          source1 = sinon.spy(function () {
            var context = this;
            return new Promise(function (res) {
              resolve = res;
            }).then(function () {
              context.push('item', 1, index);
              context.push('item', 1, index);
            });
          });
          chute1 = new ChunkChute(source1);
          source2 = sinon.spy(function () {
            var context = this;
            return new Promise(function (res) {
              resolve = res;
            }).then(function () {
              context.push('item', 2, index);
              context.push('item', 2, index);
              index += 1;
              if (index === 3) {
                context.resolve();
              }
            });
          });
          chute2 = chute1.pipe(source2);
          source3 = sinon.spy(function(){
            return true;
          });
          chute3 = chute2.pipe(source3);
          sinon.spy(chute1, 'push');
          sinon.spy(chute1, 'pull');
          sinon.spy(chute2, 'push');
          sinon.spy(chute2, 'pull');
          sinon.spy(chute3, 'push');
          sinon.spy(chute3, 'pull');
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

        it('should not exec source2', function () {
          expect(source2.args).to.deep.equal([]);
        });

        it('should not push into chain2', function () {
          expect(chute2.push.args).to.deep.equal([]);
        });

        it('should pull from chain2', function () {
          expect(chute2.pull.args).to.deep.equal([
            []
          ]);
        });

        it('should not exec source3', function () {
          expect(source3.args).to.deep.equal([]);
        });

        it('should not push into chain3', function () {
          expect(chute3.push.args).to.deep.equal([]);
        });

        it('should pull from chain3', function () {
          expect(chute3.pull.args).to.deep.equal([
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

        describe('resolve', function () {

          before(function () {
            resolve('item 1');
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
              ['item', 1, 0]
            ]);
          });

          it('should push into chain2', function () {
            expect(chute2.push.args).to.deep.equal([
              ['item', 1, 0],
              ['item', 1, 0]
            ]);
          });

          it('should pull from chain2', function () {
            expect(chute2.pull.args).to.deep.equal([
              [],
              []
            ]);
          });

          it('should not exec source3', function () {
            expect(source3.args).to.deep.equal([]);
          });

          it('should not push into chain3', function () {
            expect(chute3.push.args).to.deep.equal([]);
          });

          it('should pull from chain3', function () {
            expect(chute3.pull.args).to.deep.equal([
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

          describe('resolve', function () {

            before(function () {
              resolve('item 1');
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
                ['item', 1, 0],
                ['item', 1, 0]
              ]);
            });

            it('should push into chain2', function () {
              expect(chute2.push.args).to.deep.equal([
                ['item', 1, 0],
                ['item', 1, 0]
              ]);
            });

            it('should pull from chain2', function () {
              expect(chute2.pull.args).to.deep.equal([
                [],
                [],
                []
              ]);
            });

            it('should exec source3', function () {
              expect(source3.args).to.deep.equal([
                ['item', 2, 0],
                ['item', 2, 0]
              ]);
            });

            it('should push into chain3', function () {
              expect(chute3.push.args).to.deep.equal([
                ['item', 2, 0],
                ['item', 2, 0]
              ]);
            });

            it('should pull from chain3', function () {
              expect(chute3.pull.args).to.deep.equal([
                [],
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

            describe('resolve', function () {

              before(function () {
                resolve('item 1');
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
                  ['item', 1, 0],
                  ['item', 1, 0]
                ]);
              });

              it('should push into chain2', function () {
                expect(chute2.push.args).to.deep.equal([
                  ['item', 1, 0],
                  ['item', 1, 0]
                ]);
              });

              it('should pull from chain2', function () {
                expect(chute2.pull.args).to.deep.equal([
                  [],
                  [],
                  [],
                  []
                ]);
              });

              it('should not exec source3', function () {
                expect(source3.args).to.deep.equal([
                  ['item', 2, 0],
                  ['item', 2, 0],
                  ['item', 2, 1],
                  ['item', 2, 1]
                ]);
              });

              it('should push into chain3', function () {
                expect(chute3.push.args).to.deep.equal([
                  ['item', 2, 0],
                  ['item', 2, 0],
                  ['item', 2, 1],
                  ['item', 2, 1]
                ]);
              });

              it('should pull from chain3', function () {
                expect(chute3.pull.args).to.deep.equal([
                  [],
                  [],
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

              describe('resolve', function () {

                before(function () {
                  resolve('item 1');
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
                    ['item', 1, 0],
                    ['item', 1, 0],
                    ['item', 1, 2]
                  ]);
                });

                it('should push into chain2', function () {
                  expect(chute2.push.args).to.deep.equal([
                    ['item', 1, 0],
                    ['item', 1, 0],
                    ['item', 1, 2],
                    ['item', 1, 2]
                  ]);
                });

                it('should pull from chain2', function () {
                  expect(chute2.pull.args).to.deep.equal([
                    [],
                    [],
                    [],
                    [],
                    []
                  ]);
                });

                it('should not exec source3', function () {
                  expect(source3.args).to.deep.equal([
                    ['item', 2, 0],
                    ['item', 2, 0],
                    ['item', 2, 1],
                    ['item', 2, 1]
                  ]);
                });

                it('should push into chain3', function () {
                  expect(chute3.push.args).to.deep.equal([
                    ['item', 2, 0],
                    ['item', 2, 0],
                    ['item', 2, 1],
                    ['item', 2, 1]
                  ]);
                });

                it('should pull from chain3', function () {
                  expect(chute3.pull.args).to.deep.equal([
                    [],
                    [],
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

                describe('resolve', function () {
                  var resolved, rejected;

                  before(function () {
                    resolved = sinon.spy();
                    rejected = sinon.spy();
                    chute3.then(resolved, rejected);
                    resolve('item 1');
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
                      ['item', 1, 0],
                      ['item', 1, 0],
                      ['item', 1, 2]
                    ]);
                  });

                  it('should push into chain2', function () {
                    expect(chute2.push.args).to.deep.equal([
                      ['item', 1, 0],
                      ['item', 1, 0],
                      ['item', 1, 2],
                      ['item', 1, 2]
                    ]);
                  });

                  it('should pull from chain2', function () {
                    expect(chute2.pull.args).to.deep.equal([
                      [],
                      [],
                      [],
                      [],
                      []
                    ]);
                  });

                  it('should not exec source3', function () {
                    expect(source3.args).to.deep.equal([
                      ['item', 2, 0],
                      ['item', 2, 0],
                      ['item', 2, 1],
                      ['item', 2, 1],
                      ['item', 2, 2],
                      ['item', 2, 2]
                    ]);
                  });

                  it('should push into chain3', function () {
                    expect(chute3.push.args).to.deep.equal([
                      ['item', 2, 0],
                      ['item', 2, 0],
                      ['item', 2, 1],
                      ['item', 2, 1],
                      ['item', 2, 2],
                      ['item', 2, 2]
                    ]);
                  });

                  it('should pull from chain3', function () {
                    expect(chute3.pull.args).to.deep.equal([
                      [],
                      [],
                      [],
                      []
                    ]);
                  });

                  it('should not resolve chute1', function () {
                    expect(chute1.resolved || chute1.rejected).to.equal(false);
                  });

                  it('should resolve chute2', function () {
                    expect(chute2.resolved).to.equal(true);
                  });

                  it('should resolve chute3', function () {
                    expect(chute3.resolved).to.equal(true);
                  });

                  it('should resolve', function () {
                    expect(resolved.args).to.deep.equal([
                      [undefined]
                    ]);
                  });

                  it('should not reject', function () {
                    expect(rejected.args).to.deep.equal([]);
                  });
                });
              });
            });
          });
        });
      });

      describe('resolve chute3', function () {
        var source1, chute1, source2, chute2, source3, chute3, resolve;

        before(function () {
          var index = 0;
          source1 = sinon.spy(function () {
            var context = this;
            return new Promise(function (res) {
              resolve = res;
            }).then(function () {
              context.push('item', 1, index);
              context.push('item', 1, index);
            });
          });
          chute1 = new ChunkChute(source1);
          source2 = sinon.spy(function () {
            var context = this;
            return new Promise(function (res) {
              resolve = res;
            }).then(function () {
              context.push('item', 2, index);
              context.push('item', 2, index);
            });
          });
          chute2 = chute1.pipe(source2);
          source3 = sinon.spy(function () {
            var context = this;
            return new Promise(function (res) {
              resolve = res;
            }).then(function () {
              index += 1;
              if (index === 3) {
                context.resolve('done');
              }
              return true;
            });
          });
          chute3 = chute2.pipe(source3);
          sinon.spy(chute1, 'push');
          sinon.spy(chute1, 'pull');
          sinon.spy(chute2, 'push');
          sinon.spy(chute2, 'pull');
          sinon.spy(chute3, 'push');
          sinon.spy(chute3, 'pull');
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

        it('should not exec source2', function () {
          expect(source2.args).to.deep.equal([]);
        });

        it('should not push into chain2', function () {
          expect(chute2.push.args).to.deep.equal([]);
        });

        it('should pull from chain2', function () {
          expect(chute2.pull.args).to.deep.equal([
            []
          ]);
        });

        it('should not exec source3', function () {
          expect(source3.args).to.deep.equal([]);
        });

        it('should not push into chain3', function () {
          expect(chute3.push.args).to.deep.equal([]);
        });

        it('should pull from chain3', function () {
          expect(chute3.pull.args).to.deep.equal([
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

        describe('resolve', function () {

          before(function () {
            resolve('item 1');
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
              ['item', 1, 0]
            ]);
          });

          it('should push into chain2', function () {
            expect(chute2.push.args).to.deep.equal([
              ['item', 1, 0],
              ['item', 1, 0]
            ]);
          });

          it('should pull from chain2', function () {
            expect(chute2.pull.args).to.deep.equal([
              [],
              []
            ]);
          });

          it('should not exec source3', function () {
            expect(source3.args).to.deep.equal([]);
          });

          it('should not push into chain3', function () {
            expect(chute3.push.args).to.deep.equal([]);
          });

          it('should pull from chain3', function () {
            expect(chute3.pull.args).to.deep.equal([
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

          describe('resolve', function () {

            before(function () {
              resolve('item 1');
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
                ['item', 1, 0]
              ]);
            });

            it('should push into chain2', function () {
              expect(chute2.push.args).to.deep.equal([
                ['item', 1, 0],
                ['item', 1, 0]
              ]);
            });

            it('should pull from chain2', function () {
              expect(chute2.pull.args).to.deep.equal([
                [],
                []
              ]);
            });

            it('should exec source3', function () {
              expect(source3.args).to.deep.equal([
                ['item', 2, 0]
              ]);
            });

            it('should push into chain3', function () {
              expect(chute3.push.args).to.deep.equal([
                ['item', 2, 0],
                ['item', 2, 0]
              ]);
            });

            it('should pull from chain3', function () {
              expect(chute3.pull.args).to.deep.equal([
                [],
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

            describe('resolve', function () {

              before(function () {
                resolve('item 1');
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
                  ['item', 1, 0]
                ]);
              });

              it('should push into chain2', function () {
                expect(chute2.push.args).to.deep.equal([
                  ['item', 1, 0],
                  ['item', 1, 0]
                ]);
              });

              it('should pull from chain2', function () {
                expect(chute2.pull.args).to.deep.equal([
                  [],
                  []
                ]);
              });

              it('should not exec source3', function () {
                expect(source3.args).to.deep.equal([
                  ['item', 2, 0],
                  ['item', 2, 0]
                ]);
              });

              it('should push into chain3', function () {
                expect(chute3.push.args).to.deep.equal([
                  ['item', 2, 0],
                  ['item', 2, 0]
                ]);
              });

              it('should pull from chain3', function () {
                expect(chute3.pull.args).to.deep.equal([
                  [],
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

              describe('resolve', function () {

                before(function () {
                  resolve('item 1');
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
                    ['item', 1, 0],
                    ['item', 1, 0]
                  ]);
                });

                it('should push into chain2', function () {
                  expect(chute2.push.args).to.deep.equal([
                    ['item', 1, 0],
                    ['item', 1, 0]
                  ]);
                });

                it('should pull from chain2', function () {
                  expect(chute2.pull.args).to.deep.equal([
                    [],
                    [],
                    []
                  ]);
                });

                it('should not exec source3', function () {
                  expect(source3.args).to.deep.equal([
                    ['item', 2, 0],
                    ['item', 2, 0]
                  ]);
                });

                it('should push into chain3', function () {
                  expect(chute3.push.args).to.deep.equal([
                    ['item', 2, 0],
                    ['item', 2, 0]
                  ]);
                });

                it('should pull from chain3', function () {
                  expect(chute3.pull.args).to.deep.equal([
                    [],
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

                describe('resolve', function () {

                  before(function () {
                    resolve('item 1');
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
                      ['item', 1, 0],
                      ['item', 1, 0]
                    ]);
                  });

                  it('should push into chain2', function () {
                    expect(chute2.push.args).to.deep.equal([
                      ['item', 1, 0],
                      ['item', 1, 0]
                    ]);
                  });

                  it('should pull from chain2', function () {
                    expect(chute2.pull.args).to.deep.equal([
                      [],
                      [],
                      []
                    ]);
                  });

                  it('should not exec source3', function () {
                    expect(source3.args).to.deep.equal([
                      ['item', 2, 0],
                      ['item', 2, 0],
                      ['item', 2, 2]
                    ]);
                  });

                  it('should push into chain3', function () {
                    expect(chute3.push.args).to.deep.equal([
                      ['item', 2, 0],
                      ['item', 2, 0],
                      ['item', 2, 2],
                      ['item', 2, 2]
                    ]);
                  });

                  it('should pull from chain3', function () {
                    expect(chute3.pull.args).to.deep.equal([
                      [],
                      [],
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

                  describe('resolve', function () {
                    var resolved, rejected;

                    before(function () {
                      resolved = sinon.spy();
                      rejected = sinon.spy();
                      chute3.then(resolved, rejected);
                      resolve('item 1');
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
                        ['item', 1, 0],
                        ['item', 1, 0]
                      ]);
                    });

                    it('should push into chain2', function () {
                      expect(chute2.push.args).to.deep.equal([
                        ['item', 1, 0],
                        ['item', 1, 0]
                      ]);
                    });

                    it('should pull from chain2', function () {
                      expect(chute2.pull.args).to.deep.equal([
                        [],
                        [],
                        []
                      ]);
                    });

                    it('should not exec source3', function () {
                      expect(source3.args).to.deep.equal([
                        ['item', 2, 0],
                        ['item', 2, 0],
                        ['item', 2, 2]
                      ]);
                    });

                    it('should push into chain3', function () {
                      expect(chute3.push.args).to.deep.equal([
                        ['item', 2, 0],
                        ['item', 2, 0],
                        ['item', 2, 2],
                        ['item', 2, 2]
                      ]);
                    });

                    it('should pull from chain3', function () {
                      expect(chute3.pull.args).to.deep.equal([
                        [],
                        [],
                        []
                      ]);
                    });

                    it('should not resolve chute1', function () {
                      expect(chute1.resolved || chute1.rejected).to.equal(false);
                    });

                    it('should not resolve chute2', function () {
                      expect(chute2.resolved || chute2.rejected).to.equal(false);
                    });

                    it('should resolve chute3', function () {
                      expect(chute3.resolved).to.equal(true);
                    });

                    it('should resolve', function () {
                      expect(resolved.args).to.deep.equal([
                        ['done']
                      ]);
                    });

                    it('should not reject', function () {
                      expect(rejected.args).to.deep.equal([]);
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});