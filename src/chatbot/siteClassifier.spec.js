/* global describe it beforeEach*/
const expect = require('chai').expect
const SiteClassifier = require('./siteClassifier')
const sinon = require('sinon')

describe('SiteClassifier', () => {
  const items = [
    {
      _id: '1',
      name: 'News',
      lastFetch: {
        title: 'Newsite, breaking news and cat photos',
        result: [
          { text: 'kittens' },
          {
            text: 'Election ahead'
          },
          {
            text: 'cats'
          }
        ]
      }
    },
    {
      _id: '2',
      name: 'Weather',
      lastFetch: {
        title: 'Latest information',
        result: [
          {
            text: 'Mon: Cloudy'
          },
          {
            text: 'Tue: Rainy'
          },
          {
            text: 'Wed: Sun'
          },
          {
            text: 'Thur: Fog'
          },
          {
            text: 'Fri: Lots of Rain'
          },
          {
            text: 'Sat: Cloudy'
          },
          {
            text: 'Sun: Cloudy'
          }
        ]
      }
    },
    {
      _id: '3',
      name: 'Biking',
      lastFetch: {
        title: 'Mt Fromme trail history',
        result: [
          {
            text: 'Fun ride after good pedal'
          },
          {
            text: 'dry'
          }
        ]
      }
    }
  ]
  let client, siteClassifier

  beforeEach(() => {
    const itemsClient = {
      list: sinon.stub().returns(Promise.resolve(items))
    }
    client = {
      items: () => itemsClient,
      openRTM: sinon.spy()
    }
    siteClassifier = new SiteClassifier(client)
    return siteClassifier.train()
  })

  const expectClassifyItem = (text, item) => {
    return siteClassifier.classify(text)
      .then(result => {
        expect(result, `> ${text}`).to.exist
        expect(result._id).to.equals(item._id)
        return result
      })
  }
  it('should classify exact name matches', () =>
    Promise.all(items.map(i => expectClassifyItem(i.name, i)))
  )

  it('should classify exact title matches', () =>
    Promise.all(items.map(i => expectClassifyItem(i.lastFetch.title, i)))
  )

  it('should classify result matches', () =>
    Promise.all([
      expectClassifyItem('election', items[0]),
      expectClassifyItem('wed', items[1]),
      expectClassifyItem('pedal', items[2])
    ]))

  it('should provide all results when only name/title match', () =>
    siteClassifier.classify('weather')
      .then(result => {
        const item = items[1]
        expect(result._id).to.equals(item._id)
        expect(result.lastFetch.result).to.eql(item.lastFetch.result)
      })
  )

  it('should provide only relevnant results when possible', () =>
    siteClassifier.classify('election')
      .then((result) => {
        const item = items[0]
        expect(result._id).to.equals(item._id)
        expect(result.lastFetch.result).to.eql([item.lastFetch.result[1]])
      })
  )

  it('provides no match rather than a poor one', () =>
    siteClassifier.classify('adsfasdf')
      .then(r => expect(r).to.not.exist)
  )
})
