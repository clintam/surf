const Botkit = require('botkit')
const ItemClient = require('../common/itemClient')
const itemsChatUx = require('./listeners/itemsChatUx')
const SiteClassifier = require('./siteClassifier')

const client = new ItemClient()
const classifier = new SiteClassifier(client)

const slackBotsByBotId = {}
const controller = Botkit.slackbot({
  // debug: true
})

const startBot = (botConfig) => {
  if (!botConfig.token) {
    return
  }
  const slackBot = controller.spawn({
    token: botConfig.token
  })
  slackBotsByBotId[botConfig._id] = slackBot

  slackBot.startRTM((e, config) => {
    const bot = {
      _id: botConfig._id,
      error: e,
      lastStart: {
        identity: config && config.identity,
        team_info: config && config.team_info,
        time: new Date(),
        token: botConfig.token
      }
    }

    client.bots().update(bot)
  })

  itemsChatUx.initialize({ controller, client, classifier })

  controller.on()
}

const needsUpdate = (botConfig) => {
  const lastStartToken = botConfig.lastStart && botConfig.lastStart.token
  return botConfig.token !== lastStartToken
}

const restartBot = (bot) => {
  cancelBot(bot)
  startBot(bot)
}

const cancelBot = (bot) => {
  const slackBot = slackBotsByBotId[bot._id]
  slackBotsByBotId[bot._id] = null
  slackBot && slackBot.destroy()
}

const initialize = () => {
  client.openRTM((event) => {
    switch (event.type) {
      case 'bot_created':
        return needsUpdate(event.bot) && startBot(event.bot)
      case 'bot_updated':
        return needsUpdate(event.bot) && restartBot(event.bot)
      case 'bot_deleted':
        return cancelBot(event.bot)
    }
  }, 'bot')

  client.bots().list()
    .then(bots => bots.forEach(startBot))
}

module.exports = { initialize }
