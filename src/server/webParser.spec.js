/* global describe it*/

const expect = require('chai').expect
const {parseHtml} = require('./webParser')

describe('webParser', () => {
  const html = `<html>
<head><title>Test Title</title></head>
<body>
<h1> Here is<span>one</span></h1>
<h1> Here is<span>two</span></h1>
</bod>  
</html>`
  const item = {
    selector: 'h1'
  }

  it('should parseHtml', () => {
    const result = parseHtml(html, item)
    expect(result.title).to.equal('Test Title')
    expect(result.result).to.have.property('length', 2)
    expect(result.result[0].text).to.equal('Here is one')
    expect(result.result[1].text).to.equal('Here is two')
  })
})
