const fs = require('fs')
const cheerio = require('cheerio')
const isSVG = require('is-svg')
const uniq = require('lodash.uniq')

module.exports = function svgPalette(input) {

  if (!isSVG(input)) {
    input = fs.readFileSync(input, 'utf8')
  }

  const $ = cheerio.load(input)

  const fills = $('[fill]').map(function (i, el) {
    return $(this).attr('fill')
  }).get()

  const strokes = $('[stroke]').map(function (i, el) {
    return $(this).attr('stroke')
  }).get()

  return {
    fills: uniq(fills),
    strokes: uniq(strokes)
  }

}
