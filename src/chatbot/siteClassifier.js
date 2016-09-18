const {BayesClassifier} = require('natural')

class SiteClassifier {
  constructor(client) {
    this.client = client
    this.classifier = new BayesClassifier()
    this.resultsClassifierBySiteId = {}
    this.initialize()
  }

  initialize() {
    this.client.openRTM((event) => {
      switch (event.type) {
        case 'item_udpated':
        case 'item_updated':
        case 'item_deleted':
          return this.train()
      }
    }, 'classifier')
    this.train()
  }

  train() {
    return this.client.items().list()
      .then(items => {
        this.items = items
        items.forEach(item => this.handleItem(item))
      })
      .then(() => this.classifier.train())
  }

  resultsClassifier(item) {
    let result = this.resultsClassifierBySiteId[item._id]
    if (!result) {
      result = new BayesClassifier()
      this.resultsClassifierBySiteId[item._id] = result
    }
    return result
  }

  handleItem(item) {
    if (!item.lastFetch || item.lastFetch.error) {
      return
    }
    const classifierId = item._id
    const addIfPresent = (text) => text && this.classifier.addDocument(text, classifierId)

    addIfPresent(item.name)
    addIfPresent(item.lastFetch.title)
    item.lastFetch.result.forEach((result, rId) => {
      addIfPresent(result.text)
      this.resultsClassifier(item).addDocument(result.text, rId)
    })
    this.resultsClassifier(item).train()
  }

  classify(text) {
    const itemClassifications = this.classifier.getClassifications(text)
    const itemHit = itemClassifications[0]
    if (itemHit.value < 0.001) {
      return
    }
    const item = this.items.find(i => i._id === itemHit.label)
    const resultClassfifications = this.resultsClassifier(item).getClassifications(text)
    const bestMatch = resultClassfifications[0].value
    const minMatch = bestMatch * 0.9
    const topResults = resultClassfifications
      .filter(rc => rc.value > minMatch)
      .map(rc => item.lastFetch.result[parseInt(rc.label)])
    const lastFetchWithThisTop = Object.assign({}, item.lastFetch, { result: topResults })
    return Object.assign({}, item, { lastFetch: lastFetchWithThisTop })
  }
}

module.exports = SiteClassifier

