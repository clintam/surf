
const initialize = ({controller, client, classifier}) => {
  controller.hears(['hello', 'hi', 'help', 'who are you'],
    'direct_message,direct_mention,mention', (bot, message) => {
      bot.reply(message,
        `I can keep track of a list of questions!
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

  const attachemtForItem = (item) => {
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
  }

  controller.hears(['questions', 'what you know'], 'direct_message,direct_mention', (bot, message) => {
    react(bot, message)

    client.items().list()
      .then((items) => {
        var reply = {
          text: `I know about ${items.length} things`,
          attachments: items.map(attachemtForItem)
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
    client.items().create(item)
      .then(() => {
        bot.reply(message, 'got it')
        react(bot, message, 'heavy_check_mark')
      })
  })

  controller.hears(['(.*)'], 'direct_message,direct_mention,ambient', (bot, message) => {
    const question = message.match[1]

    bot.startTyping(message)
    client.items().list()
      .then(items => {
        const item = classifier.classify(question)
        if (item && item.lastFetch && item.lastFetch.result) {
          var reply = {
            text: `I found ${item.lastFetch.result.length} results in <${item.url}}|${item.name}>:`,
            attachments: item.lastFetch.result.map(r => {
              let text = `${r.text}`
              if (r.href) {
                text += ` <${r.href}| link>`
              }
              return {
                text,
                image_url: r.imgSrc
              }
            })
          }
          bot.reply(message, reply)
        }
      })
      .catch(e => console.error(e)) // FIXME improve this pattern
  })
}

module.exports = { initialize }
