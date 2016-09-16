class Controller {
  constructor() {
    this.listeners = []
    this.replies = []
    this.bot = new Bot(this)
  }

  hears(patterns, context, callback) {
    this.listeners.push({
      patterns,
      callback
    })
  }

  say(message) {
    this.listeners.forEach((l) => {
      const match = l.patterns.some(p => message.match(p))
      if (match) {
        l.callback(this.bot, { match })
      }
    })
  }
}

class Bot {
  constructor(controller) {
    this.controller = controller
  }

  reply(message, reply) {
    this.controller.replies.push(reply)
  }

  startTyping() { }
}

module.exports = Controller
