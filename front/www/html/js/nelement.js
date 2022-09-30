
class nElement {

  container = document.createElement('div')
  element = document.createElement('div')

  constructor({
    element: { name: elementName = 'div' } = {},
    container: { name: containerName = 'div' } = {},
    component: { name: componentName = 'ne' } = {},
  } = {}) {
    this.setElementName(elementName, { component: { name: componentName } })
    this.setContainerName(containerName, { component: { name: componentName } })
  }

  static id(id = '') {
    const el = new nElement()
    el.setElement(document.getElementById(id))
    return el
  }

  setElement(element) {
    this.element = element
  }

  setContainer(container) {
    this.container = container
  }

  setElementName(name, options) {
    const element = document.createElement(name)
    if (options) element.classList.add(options?.component?.name)
    this.setElement(element)
  }

  setContainerName(name, options) {
    const container = document.createElement(name)
    if (options) container.classList.add(options.component?.name)
    this.setContainer(container)
  }

  setText(text = '') {
    this.element.innerText = text
  }

}
