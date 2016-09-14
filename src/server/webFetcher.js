import moment from 'moment'
import hash from 'object-hash'
import ItemClient from '../common/itemClient'
import {scheduleJob, cancelJob} from './jobManager'
import cheerio from 'cheerio'
const webdriverio = require('webdriverio')

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
    .catch(e => console.log(e))
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
  console.log(`Fetching: ${item.url}`)
  const webdriver = webdriverio.remote(options)
  return webdriver.init()
    .then(() => webdriver.url(item.url).getTitle())
    .then((title) => {
      itemToUpdate.title = title
    })
    .then(() => webdriver.saveScreenshot())
    .then((buffer) => itemClient.updateImage(item._id, buffer))
    .then(() => webdriver.getHTML('body'))
    .then((html) => parseHtml(html, item.selector, itemToUpdate))
    .catch((e) => {
      console.error(e)
      itemToUpdate.lastFetch.error = e.message || JSON.stringify(e)
    })
    .then(() => itemClient.update(itemToUpdate))
    .finally(() => webdriver.end())
}

const parseHtml = (html, selector, itemToUpdate) => {
  const $ = cheerio.load(html)
  const result = []

  $(selector).map((i, e) => {
    const text = $(e).text().trim()
    const anchor = $(e).find('a')
    const href = anchor && anchor.attr('href')
    if (text || href) {
      return result.push({
        text,
        href
      })
    }
  })
  itemToUpdate.lastFetch.result = result
}

export function initialize() {
  itemClient.list()
    .then((items) => items.forEach(scheduleFetch))
  itemClient.openRTM((event) => {
    switch (event.type) {
      case 'item_created':
      case 'item_updated':
        return scheduleFetch(event.item)
      case 'item_deleted':
        return cancelJob(event.item._id)

    }
  })
}
