const natural = require('natural')

const tokenizer = new natural.TreebankWordTokenizer()

const textProcessor = (text) => {
  let words = text.trim().split(/\s+/i)
  words = words.map(processWord)
    .filter(validWord)
    .filter(w => w)
  words = tokenizer.tokenize(words.join(' '))
  return words.join(' ')
}

const processWord = (word) => {
  let w = word
  w = w.toLowerCase()
  w = w.replace('#', '')
  return w
}

const validWord = (word) => {
  const invalids = [
    'http://',
    'pic.twitter.com'
  ]
  if (!word) {
    return false
  }
  if (invalids.some(i => word.indexOf(i) !== -1)) {
    return false
  }
  return true
}

module.exports = {textProcessor}
