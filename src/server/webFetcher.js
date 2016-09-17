const moment = require('moment')
const hash = require('object-hash')
const ItemClient = require('../common/itemClient')
const {scheduleJob, cancelJob} = require('./jobManager')
const webdriverio = require('webdriverio')
const logger = require('winston')
const {parseHtml} = require('./webParser')

const itemClient = new ItemClient()
const fetchItervalInMinutes = 10

const fetchHash = (item) => hash({ url: item.url, selector: item.selector })

const scheduleFetch = (item) => {
  const getFetchDelay = () => {
    const now = moment()
    const lastFetchDate = item.lastFetch && item.lastFetch.date
    const thisFetchHash = fetchHash(item)
    const lastFetchHash = item.lastFetch && item.lastFetch.hash
    var nextRun
    if (thisFetchHash !== lastFetchHash || !lastFetchDate) {
      nextRun = now
    } else {
      nextRun = moment(lastFetchDate).add(fetchItervalInMinutes, 'minutes')
    }
    return nextRun.valueOf() - now.valueOf()
  }

  if (!item.url) {
    return
  }

  scheduleJob(item._id, getFetchDelay())
    .then(() => fetchItem(item))
    .catch(e => logger.error(e))
}

const options = {
  desiredCapabilities: {
    browserName: 'chrome'
  },
  host: 'webdriver',
  port: 4444
}

const fetchItem = (item) => {
  var itemToUpdate = {
    _id: item._id,
    lastFetch: {
      date: new Date(),
      error: null,
      hash: fetchHash(item)
    }
  }
  logger.info(`Fetching: ${item.url}`)
  const webdriver = webdriverio.remote(options)
  let error
  return webdriver.init()
    .then(() => webdriver.url(item.url).getTitle())
    .then(() => webdriver.saveScreenshot())
    .then((buffer) => itemClient.items().updateImage(item._id, buffer))
    .then(() => webdriver.getHTML('html'))
    .then((html) => Object.assign(itemToUpdate.lastFetch, parseHtml(html, item)))
    .catch((e) => {
      error = e
      logger.error(e)
      itemToUpdate.lastFetch.error = e.message || JSON.stringify(e)
    })
    .then(() => itemClient.items().update(itemToUpdate))
    .then(() => {
      if (error) {
        throw error
      }
    })
    .finally(() => webdriver.end())
}

const initialize = () => {
  itemClient.items().list()
    .then(items => items.forEach(scheduleFetch))
  itemClient.openRTM((event) => {
    switch (event.type) {
      case 'item_created':
      case 'item_updated':
        return scheduleFetch(event.item)
      case 'item_deleted':
        return cancelJob(event.item._id)

    }
  }, 'webFetcher')
}

module.exports = { initialize }
