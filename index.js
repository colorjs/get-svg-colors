const fs = require('fs')
const cheerio = require('cheerio')
const isSVG = require('is-svg')
const uniq = require('lodash.uniq')
const compact = require('lodash.compact')
const chroma = require('chroma-js')

module.exports = function getSvgColors(input, options) {

  if (!isSVG(input)) {
    input = fs.readFileSync(input, 'utf8')
  }

  const $ = cheerio.load(input)

  const fills = $('[fill]').map(function (i, el) {
    var color = $(this).attr('fill')
    if (color === 'none') return
    return chroma(color)
  }).get()

  const strokes = $('[stroke]').map(function (i, el) {
    var color = $(this).attr('stroke')
    if (color === 'none') return
    return chroma(color)
  }).get()

  if (options && options.flat) {
    return compact(uniq(fills.concat(strokes)))
  }

  return {
    fills: compact(uniq(fills)),
    strokes: compact(uniq(strokes))
  }

}
