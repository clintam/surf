exports.initialItems = [
  {
    name: 'nyt',
    selector: '#top-news article',
    url: 'http://nytimes.com'
  },
  {
    name: 'trump-tweets',
    url: 'https://twitter.com/realDonaldTrump',
    selector: '.js-tweet-text-container'
  },
  {
    name: 'obama-tweets',
    url: 'https://twitter.com/barackobama',
    selector: '.js-tweet-text-container'
  }
]

exports.initialBots = [
  {
    'name': 'Botbot',
    'token': process.env.SLACK_TOKEN
  }
]

exports.initialPredictions = [
  {
    name: 'Pos/Neg sentiment (RT reviews)',
    tag: 'sentiment',
    keys: ['negative', 'positive']
  }
]
