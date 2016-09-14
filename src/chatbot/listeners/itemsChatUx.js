import ItemClient from '../../common/itemClient'

var client = new ItemClient()

export function initialize(controller) {
  controller.hears(['hello', 'hi', 'help', 'who are you'],
    'direct_message,direct_mention,mention', (bot, message) => {
      bot.reply(message,
        `I can keep track of a list of items!
Ask me 'questions' to see what I know, or 'add' something new :metal:
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

  controller.hears(['questions', 'what you know'], 'direct_message,direct_mention', (bot, message) => {
    react(bot, message)

    client.list()
      .then((items) => {
        var reply = {
          text: `I know about ${items.length} things`,
          attachments: items.map((item) => {
            const result = item.lastFetch && item.lastFetch.result
            const resultLength = result && result.length || 0
            const listItemText = (r) => {
              let text = `\u2022 ${r.text}`
              if (r.href) {
                text += ` <${r.href}| link>`
              }
              return text
            }
            let text
            if (result && result.length > 0) {
              text = item.lastFetch.result.map(listItemText).join('\n')
            } else {
              text = '...er nothing there yet...'
            }
            return {
              title: `<${item.url}|${item.name}> (${resultLength} results)`,
              text: text
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
    // TODO, this becomes a conversation
    bot.startTyping(message)
    client.create(item)
      .then(() => {
        bot.reply(message, 'got it')
        react(bot, message, 'heavy_check_mark')
      })
  })
}
