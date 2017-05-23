'use strict';

var chai = require('chai'),
  expect = chai.expect,
  ChunkChute = require('../src');

chai.use(require('chai-as-promised'));

describe('creation', function () {

  it('should create with new', function () {
    var chute = new ChunkChute();
    expect(chute instanceof ChunkChute).to.equal(true);
  });

  it('should create without new', function () {
    var chute = ChunkChute();
    expect(chute instanceof ChunkChute).to.equal(true);
  });
});