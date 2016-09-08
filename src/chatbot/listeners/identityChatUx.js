import os from 'os'

export function initialize(controller) {
  controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', (bot, message) => {
    bot.api.reactions.add({
      timestamp: message.ts,
      channel: message.channel,
      name: 'robot_face'
    }, (err, res) => {
      if (err) {
        bot.botkit.log('Failed to add emoji reaction :(', err)
      }
    })
  })

  controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'],
    'direct_message,direct_mention,mention', (bot, message) => {
      var hostname = os.hostname()
      var uptime = formatUptime(process.uptime())

      bot.reply(message,
        ':robot_face: I am a bot named <@' + bot.identity.name +
        '>. I have been running for ' + uptime + ' on ' + hostname + '.')
    })

  function formatUptime(uptime) {
    var unit = 'second'
    if (uptime > 60) {
      uptime = uptime / 60
      unit = 'minute'
    }
    if (uptime > 60) {
      uptime = uptime / 60
      unit = 'hour'
    }
    if (uptime !== 1) {
      unit = unit + 's'
    }

    uptime = uptime + ' ' + unit
    return uptime
  }
}
