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

  const expectClassifyItem = (text, item) => {
    const result = siteClassifier.classify(text)
    expect(result, `> ${text}`).to.exist
    expect(result._id).to.equals(item._id)
    return result
  }

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

  it('should classify exact name matches', () => {
    items.forEach(i => {
      expectClassifyItem(i.name, i)
    })
  })

  it('should classify exact title matches', () => {
    const i = items[0]
    expectClassifyItem(i.lastFetch.title, i)
    items.forEach(i => {
      expectClassifyItem(i.lastFetch.title, i)
    })
  })

  it('should classify result matches', () => {
    expectClassifyItem('election', items[0])
    expectClassifyItem('wed', items[1])
    expectClassifyItem('pedal', items[2])
  })

  it('should provide all results when only name/title match', () => {
    const item = items[1]
    const result = siteClassifier.classify('weather')
    expect(result._id).to.equals(item._id)
    expect(result.lastFetch.result).to.eql(item.lastFetch.result)
  })

  it('should provide only relevnant results when possible', () => {
    const item = items[0]
    const result = siteClassifier.classify('election')
    expect(result._id).to.equals(item._id)
    expect(result.lastFetch.result).to.eql([item.lastFetch.result[1]])
  })

  it('provides poor match rather than none (FIXME?)', () => {
    expect(siteClassifier.classify('adsfasdf')).to.exist
  })
})
