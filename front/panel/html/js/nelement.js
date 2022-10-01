
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

    this.setStyleInContainer('margin', '0 0 .5rem 0')

    this.setStyle('padding', '0')
    this.setStyle('border', 'none')
    this.setStyle('outline', 'none')
    this.setStyle('box-sizing', 'border-box')
  }

  static element(element = null) {
    const el = new nElement()
    el.setElement(element)
    return el
  }

  static id(id = '') {
    const el = new nElement()
    el.setElement(document.getElementById(id))
    return el
  }

  setElement(element) {
    this.element = element
    return this
  }

  setContainer(container) {
    this.container = container
    return this
  }

  setElementName(name, options) {
    const element = document.createElement(name)
    if (options) element.classList.add(`el-${options?.component?.name}`)
    this.setElement(element)
    return this
  }

  setContainerName(name, options) {
    const container = document.createElement(name)
    if (options) container.classList.add(`ct-${options?.component?.name}`)
    this.setContainer(container)
    return this
  }

  setText(text = '') {
    this.element.innerText = text
    return this
  }

  setStyle(name, value = '') {
    this.element.style[name] = value
    return this
  }

  setStyleInContainer(name, value = '') {
    this.container.style[name] = value
    return this
  }

  append(nelement = new nElement) {
    this.element.append(nelement.render())
    return this
  }

  render() {
    this.container.append(this.element)
    return this.container
  }

}

class nLink extends nElement {
  constructor() {
    super({
      element: { name: 'a' },
      component: { name: 'link' }
    })

    this.setStyleInContainer('text-align', 'center')
    this.setStyle('text-decoration', 'none')

    this.href('#')
  }

  href(href) {
    this.element.href = href
  }
}

class nH2 extends nElement {
  constructor() {
    super({
      element: { name: 'h2' },
      component: { name: 'h2' }
    })
  }
}

class nH3 extends nElement {
  constructor() {
    super({
      element: { name: 'h3' },
      component: { name: 'h3' }
    })
  }
}

class nText extends nElement {
  constructor() {
    super({
      element: { name: 'span' },
      component: { name: 'text' }
    })
  }
}

class nInput extends nElement {
  constructor() {
    super({
      element: { name: 'input' },
      component: { name: 'input' }
    })

    this.setStyle('width', '100%')
    this.setStyle('font', 'inherit')
    this.setStyle('padding', '.5rem')
    this.setStyle('box-shadow', '0 0 0 1px #000000')
  }

  placeholder(text = '') {
    this.element.placeholder = text
  }

  type(name) {
    this.element.type = name
    return this
  }

  getValue(def = null) {
    return this.element.value || def
  }
}

class nError extends nElement {
  constructor() {
    super({
      element: { name: 'span' },
      component: { name: 'error' }
    })

    this.setStyle('color', 'red')
  }
}

class nInputComponent extends nElement {
  label = new nText()
  input = new nInput()
  error = new nError()

  constructor() {
    super(({
      component: { name: 'input-component' },
    }))

    this.append(this.label)
    this.append(this.input)
    this.append(this.error)
  }
}

class nButton extends nElement {
  constructor() {
    super({
      element: { name: 'button' },
      component: { name: 'button' }
    })

    this.setStyle('width', '100%')
    this.setStyle('font', 'inherit')
    this.setStyle('padding', '.5rem')
  }

  on(name, value) {
    this.element.addEventListener(name, value)
    return this
  }
}
