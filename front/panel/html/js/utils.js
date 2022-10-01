
const Local = {
  set: (name, value, config = { name: 'local' }) => {
    return sessionStorage.setItem([config.name, name].join('.'), JSON.stringify(value))
  },
  get: (name, def = null, config = { name: 'local' }) => {
    try {
      const json = JSON.parse(sessionStorage.getItem([config.name, name].join('.')))
      if (!json) return def
      return json
    } catch (e) { }

    return def
  }
}

const Session = {
  setToken: (token) => Local.set('token', token, { name: 'session' })
}

const Flow = {
  goTo: (name) => (window.location = name)
}

const Pages = {
  DASHBOARD: 'dashboard.html',
  LOGIN: 'login.html',
}

class SuccessResponse {
  constructor({ responseText }) {
    const { status, message, data } = JSON.parse(responseText)

    this.status = status

    this.message = message

    this.data = data
  }

  getStatus() {
    return this.status
  }

  getMessage() {
    return this.message
  }

  getData() {
    return this.data
  }

  get(name, def = null) {
    try {
      return this.data[name]
    } catch (e) {
      console.error(e)
    }

    return def
  }
}

class ErrorResponse {
  type = 'network'

  constructor({ responseText }) {
    const { status, message, data } = JSON.parse(responseText)

    this.status = status

    this.message = message

    this.data = data
  }

  getStatus() {
    return this.status
  }

  getMessage() {
    return this.message
  }

  getData() {
    return this.data
  }

  get(name, def = null) {
    try {
      return this.data[name]
    } catch (e) {
      console.error(e)
    }

    return def
  }
}

const Ajax = {
  URL: `${window.location.origin}/api/v1`,
  post: (paths = [], data = {}) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', [Ajax.URL, ...paths].join('/'), true)

    const onComplete = (xhr) => {
      [200, '200'].indexOf(xhr.status) > -1
        ? resolve(new SuccessResponse(xhr))
        : reject(new ErrorResponse(xhr))
    }
    xhr.onerror = () => onComplete(xhr)
    xhr.onload = () => onComplete(xhr)

    xhr.send(JSON.stringify(data))
  })
}

const API = {
  usersRegister: ({ email, password }) => Ajax.post(['users', 'register'], { email, password }),
  usersLogin: ({ email, password }) => Ajax.post(['users', 'login'], { email, password }),
}
