import moment from 'moment'
import hash from 'object-hash'
const ItemClient = require('../common/itemClient')
const client = new ItemClient()

const fetchItervalInMinutes = 10
const fetchesById = {}

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

  const oldFetch = fetchesById[item._id]
  if (oldFetch) {
    clearTimeout(oldFetch)
  }
  console.log(`Will fetch ${item.url} in ${getFetchDelay()}`)
  fetchesById[item._id] = setTimeout(fetchItem(item), getFetchDelay())
}

const webdriverio = require('webdriverio')

const options = {
  desiredCapabilities: {
    browserName: 'chrome'
  },
  host: 'webdriver',
  port: 4444
}

const fetchItem = (item) => () => {
  var itemToUpdate = {
    _id: item._id,
    lastFetch: {
      date: new Date(),
      error: null,
      hash: fetchHash(item)
    }
  }
  console.log(`Fetching: ${item.url}`)
  const webdriver = webdriverio.remote(options)
  return webdriver.init()
    .then(() => webdriver.url(item.url).getTitle())
    .then((title) => {
      itemToUpdate.title = title
    })
    .then(() => webdriver.saveScreenshot())
    .then((buffer) => client.updateImage(item._id, buffer))
    .then(() => webdriver.getText(item.selector || 'body'))
    .then((text) => {
      itemToUpdate.fullText = text
      itemToUpdate.result = text
    })
    .catch((e) => {
      console.error(e)
      itemToUpdate.lastFetch.error = e.message || JSON.stringify(e)
    })
    .then(() => client.update(itemToUpdate))
    .finally(() => webdriver.end())
}

export function initialize() {
  client.list()
    .then((items) => items.forEach(scheduleFetch))
  client.openRTM((event) => {
    switch (event.type) {
      case 'item_created':
      case 'item_updated':
        scheduleFetch(event.item)
    }
  })
}
