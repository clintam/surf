const expect = require('chai').expect
const ItemClient = require('../client/itemClient')
const uuid = require('uuid')

const client = new ItemClient()
const testChannelName = 'testing'
const testBotName = 'surfbot'
const SlackApi = require('./SlackApi')
const slackApi = new SlackApi(process.env.TEST_SLACK_TOKEN)

describe('chat bot', function () {
  this.timeout(10000)

  beforeEach(() => slackApi.ready)

  it('should expose help', () => {
    // Trigger the bot
    slackApi.ensureUserInChannel(testBotName, testChannelName)
      .then(({user, channel}) =>
        slackApi.sendMessage(`<@${user.id}> help`, testChannelName))

    // Wait for success
    return slackApi.waitForMessage('I can keep track')
  })

  it('should list items', () => {
    const newItem = {
      name: uuid.v1()
    }
    var createdItem
    client.create(newItem)
      .then((x) => { createdItem = x })
      .then(() => slackApi.ensureUserInChannel(testBotName, testChannelName))
      .then(({user, channel}) =>
        slackApi.sendMessage(`<@${user.id}> list items`, testChannelName))

    // Wait for success
    return slackApi.waitForMessage('I know about')
      .then((message) => {
        var attachement = message.attachments.find((a) => a.title === newItem.name)
        expect(attachement).to.exist
      })
      .then(() => client.delete(createdItem))
  })
})

