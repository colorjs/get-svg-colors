/* globals describe, it */

const fs = require('fs')
const assert = require('assert')
const getColors = require('..')

describe('get-svg-colors', function(){

  it('is a function', function() {
    assert.equal(typeof getColors, "function")
  })

  it('accepts a filepath and returns an object', function() {
    var colors = getColors(__dirname + '/fixtures/australia.svg')
    assert(Array.isArray(colors.fills))
    assert(Array.isArray(colors.strokes))
  })

  it('accepts an SVG string as input', function() {
    var colors = getColors(fs.readFileSync(__dirname + '/fixtures/australia.svg', 'utf8'))
    assert(Array.isArray(colors.fills))
    assert(colors.fills.length)
    assert(Array.isArray(colors.strokes))
    assert(colors.strokes.length)
  })

  it('returns chroma-js color objects', function() {
    var colors = getColors(__dirname + '/fixtures/australia.svg')
    var hexy = /^#[0-9a-f]{3,6}$/i
    assert(colors.strokes[0].hex().match(hexy))
    assert(colors.fills[0].hex().match(hexy))
  })



})
