const ItemClient = require('../../common/itemClient')
var client = new ItemClient()

export function initialize(controller) {
  controller.hears(['hello', 'hi', 'help', 'who are you'],
    'direct_message,direct_mention,mention', (bot, message) => {
      bot.reply(message,
`I can keep track of a list of items!
Ask me to 'list items' or 'add' somethng :metal:
`)
    })

  const react = (bot, message, name = 'robot_face') => {
    bot.api.reactions.add({
      timestamp: message.ts,
      channel: message.channel,
      name: name
    }, (err, res) => {
      if (err) {
        bot.botkit.log('Failed to add emoji reaction :(', err)
      }
    })
  }

  controller.hears(['list items', 'what you know'], 'direct_message,direct_mention', (bot, message) => {
    react(bot, message)

    client.list()
      .then((items) => {
        var reply = {
          'text': `I know about ${items.length} items`,
          'attachments': items.map((item) => {
            return {
              'title': item.name,
              'text': '(need more info)',
              'color': item.color
            }
          })
        }
        bot.reply(message, reply)
      })
  })

  controller.hears(['add (.*)'], 'direct_message,direct_mention', (bot, message) => {
    const item = {
      name: message.match[1]
    }

    bot.startTyping(message)
    client.create(item)
      .then(() => {
        bot.reply(message, 'got it')
        react(bot, message, 'heavy_check_mark')
      })
  })
}
