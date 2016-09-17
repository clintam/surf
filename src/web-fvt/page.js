class Page {
  constructor(driver) {
    this.driver = driver
  }

  clickCreateNew() {
    return this.driver.click('#create')
      .then(() => this)
  }

  enterNameText(name) {
    return this.driver.waitForVisible('#name')
      .then(() => this.driver.setValue('#name', name))
      .then(() => this)
  }

  clickSave() {
    return this.driver.click('#save')
      .then(() => this)
  }

  openItem(name) {
    const driver = this.driver
    const itemRow = `div.list-group-item-heading*=${name}`
    return driver.waitForVisible(itemRow, 1000)
      .then(() => driver.element(itemRow))
      .then(row => driver.elementIdElement(row.value.ELEMENT, 'button'))
      .then(button => driver.elementIdClick(button.value.ELEMENT))
      .then(() => this)
  }

  deleteItem() {
    const driver = this.driver
    return driver.waitForVisible('button[id*=delete]')
      .then(() => driver.click('button[id*=delete]'))
      .then(() => this)
  }
}

module.exports = Page
