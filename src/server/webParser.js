const cheerio = require('cheerio')
const url = require('url')

const normalizeUrl = (item, src) => {
  if (!src || src === '#') {
    return
  }
  if (src.startsWith('//')) {
    return `http:${src}`
  } else if (src.startsWith('/')) {
    const baseUrl = url.parse(item.url)
    return `${baseUrl.protocol}//${baseUrl.host}${src}`
  }
  return src
}
const parseHtml = (html, item) => {
  const $ = cheerio.load(html, {
    normalizeWhitespace: false
  })
  const result = []
  const title = $('head > title').text()
  $(item.selector || 'body').map((i, e) => {
    const collectText = (i, e) => {
      if (e.type === 'text') {
        return e.data.trim()
      }
      const title = e.attribs && e.attribs.title
      if (title) {
        return title.trim()
      }
      return $(e).contents().map(collectText).get()
    }
    const text = $(e).map(collectText).get().join(' ')
    const anchor = e.name === 'a' ? $(e) : $(e).find('a')
    const href = anchor && normalizeUrl(item, anchor.attr('href'))
    const img = e.name === 'img' ? $(e) : $(e).find('img')
    const imgSrc = img && normalizeUrl(item, img.attr('src'))
    if (text || href) {
      return result.push({
        text,
        href,
        imgSrc
      })
    }
  })
  return {
    title,
    result
  }
}

module.exports = { parseHtml }
