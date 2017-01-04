/* global describe it*/

const expect = require('chai').expect
const {parseHtml} = require('./webParser')

describe('webParser', () => {
  const item = {
    selector: 'h1'
  }
  const makeHtml = (body) => `<html>
<head><title>Test Title</title></head>
<body>
${body}
</body>  
</html>`

  it('should parseHtml', () => {
    const html = makeHtml(`<h1> Here is<span>one</span></h1>
<h1> Here is<span>two</span></h1>`)
    const result = parseHtml(html, item)

    expect(result.title).to.equal('Test Title')
    expect(result.result).to.have.property('length', 2)
    expect(result.result[0].text).to.equal('Here is one')
    expect(result.result[1].text).to.equal('Here is two')
  })

  it('should use titles when it can', () => {
    const html = makeHtml('<h1> Here is<span title="title with info">some font or something</span></h1>')
    const result = parseHtml(html, item)

    expect(result.result[0].text).to.equal('Here is title with info')
  })
})
