const fs = require('fs')
const cheerio = require('cheerio')
const isSVG = require('is-svg')
const uniq = require('lodash.uniq')
const compact = require('lodash.compact')
const chroma = require('chroma-js')
const hexy = /^#[0-9a-f]{3,6}$/i

module.exports = function getSvgColors(input, options) {

  if (!isSVG(input)) {
    input = fs.readFileSync(input, 'utf8')
  }

  const $ = cheerio.load(input)

  // Find elements with a `stroke` attribute
  var fills = $('[fill]').map(function (i, el) {
    var color = $(this).attr('fill')
    if (color === 'none') return
    return chroma(color)
  }).get()

  // Find elements with a `fill` attribute
  var strokes = $('[stroke]').map(function (i, el) {
    var color = $(this).attr('stroke')
    if (color === 'none') return
    return chroma(color)
  }).get()

  // Find `fill` and `stroke` within inline styles
  $('[style]').each(function (i, el) {
    var fill = $(this).css('fill')
    if (fill && fill.match(hexy)) {
      fills.push(chroma(fill))
    }

    var stroke = $(this).css('stroke')
    if (stroke && stroke.match(hexy)) {
      strokes.push(chroma(stroke))
    }
  })

  if (options && options.flat) {
    return compact(uniq(fills.concat(strokes)))
  }

  return {
    fills: compact(uniq(fills)),
    strokes: compact(uniq(strokes))
  }

}
