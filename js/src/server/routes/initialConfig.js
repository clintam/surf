exports.initialItems = [
  {
    name: 'happy-tweets',
    url: 'https://twitter.com/hashtag/happy',
    selector: '.js-tweet-text-container'
  },
  {
    name: 'mad-tweets',
    url: 'https://twitter.com/hashtag/mad',
    selector: '.js-tweet-text-container'
  },
  {
    name: 'obama-tweets',
    url: 'https://twitter.com/barackobama',
    selector: '.js-tweet-text-container'
  },
  {
    name: 'trump-tweets',
    url: 'https://twitter.com/realDonaldTrump',
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
