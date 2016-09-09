const Botkit = require('botkit')
const bluebird = require('bluebird')

class SlackApi {
  constructor(token) {
    this.controller = Botkit.slackbot({
      log: false
    })
    this.bot = this.controller.spawn({
      token: process.env.TEST_SLACK_TOKEN
    }).startRTM()

    this.users = bluebird.promisifyAll(this.bot.api.users)
    this.channels = bluebird.promisifyAll(this.bot.api.channels)
    this.chat = bluebird.promisifyAll(this.bot.api.chat)

    this.ready = this.waitForRTM()
  }

  ensureUserInChannel(memberName, channelName) {
    const userPromise = this.bot.api.users.listAsync({})
      .then((resp) => {
        return resp.members.find(m => m.name === memberName)
      })

    const channelPromise = this.bot.api.channels.listAsync({})
      .then((resp) => {
        return resp.channels.find(c => c.name === channelName)
      })

    return Promise.all([userPromise, channelPromise])
      .then(([user, channel]) => {
        if (!channel.members.includes(user.id)) {
          throw new Error(`Invite ${memberName} to ${channelName}`)
        }
        // TODO this bot needs to be in room?
        return {
          user: user,
          channel: channel
        }
      })
  }

  waitForRTM() {
    const onAsync = bluebird.promisify((type, cb) => {
      this.controller.on(type, (bot, message) => {
        cb(null, bot)
      })
    })
    return onAsync('rtm_open')
  }

  waitForMessage(pattern) {
    var hearsAsync = bluebird.promisify((pattern, cb) => {
      this.controller.hears(pattern, 'ambient', (bot, message) => {
        cb(null, message)
      })
    })
    return hearsAsync(pattern)
  }

  sendMessage(text, channel) {
    return this.chat.postMessageAsync({
      as_user: true,
      channel: channel,
      text: text
    })
  }
}

module.exports = SlackApi
