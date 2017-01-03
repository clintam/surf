exports.initialItems = [
  {
    name: 'NYT',
    selector: '#top-news article',
    url: 'http://nytimes.com'
  },
  {
    name: 'alt-right',
    selector: 'ul#disqus-popularUL li',
    url: 'http://www.breitbart.com/'
  }
]

exports.initialBots = [
  {
    'name': 'Botbot',
    'token': process.env.SLACK_TOKEN
  }
]
