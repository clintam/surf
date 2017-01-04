exports.initialItems = [
  {
    name: 'NYT',
    selector: '#top-news article',
    url: 'http://nytimes.com'
  }
]

exports.initialBots = [
  {
    'name': 'Botbot',
    'token': process.env.SLACK_TOKEN
  }
]
