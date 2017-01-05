const moment = require('moment')
const hash = require('object-hash')
const ItemClient = require('../common/apiClient')
const {scheduleJob, cancelJob} = require('./jobManager')
const webdriverio = require('webdriverio')
const logger = require('winston')
const {parseHtml} = require('./webParser')
const {computePredictions} = require('./predictionService')

const itemClient = new ItemClient()
const fetchItervalInMinutes = 60 * 2

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
  host: process.env.WEBDRIVER_HOST || 'localhost',
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
  const fetchAsData = (fetch) => fetch.result.map(data => {
    return {
      text: data.text,
      href: data.href || item.url,
      keys: [item.name]
    }
  })
  logger.info(`Fetching: ${item.url}`)
  const webdriver = webdriverio.remote(options)
  let error
  return webdriver.init()
    .then(_ => webdriver.url(item.url).getTitle())
    .then(_ => webdriver.saveScreenshot())
    .then(buffer => itemClient.items().updateImage(item._id, buffer))
    .then(_ => webdriver.getHTML('html'))
    .then(html => Object.assign(itemToUpdate.lastFetch, parseHtml(html, item)))
    .catch(e => {
      error = e
      logger.error(e)
      itemToUpdate.lastFetch.error = e.message || JSON.stringify(e)
    })
    .then(lastFetch => {
      if (lastFetch) {
        fetchAsData(lastFetch).forEach(d => itemClient.data().create(d))
        return addPredictions(itemToUpdate)
      }
      return itemToUpdate
    })
    .then(item => {
      return itemClient.items().update(item)
    })
    .then(_ => {
      if (error) {
        throw error
      }
    })
    .catch(logger.error) // FIXME make this the default (and there is no stack w/this form)
    .finally(() => webdriver.end())
}

const addPredictions = (item) => {
  return computePredictions(item.lastFetch.result.map(r => r.text), predictionModelPromise)
    .then(predictions => {
      predictions.forEach((p, i) => {
        item.lastFetch.result[i].prediction = p
      })
      return item
    })
}

let predictionModelPromise = null
const initialize = (p) => {
  predictionModelPromise = p
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
