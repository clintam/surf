
if (!process.env.SLACK_TOKEN) {
  console.log('Error: Specify token in environment')
  process.exit(1)
}

var Botkit = require('botkit')

const controller = Botkit.slackbot({
  // debug: true
})

controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM()

require('./listeners/identityChatUx').initialize(controller)
require('./listeners/itemsChatUx').initialize(controller)
