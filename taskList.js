class TaskList extends HTMLElement {
  #localStorageKey = 'list'

  constructor(){
    super()

    /**
     * Creazione shadowDOM
     * Lo shadow DOM permette di avere separazione tra l'html 
     * del componente ed il resto del documento
     */
    this.attachShadow({ mode: 'open'})
  }

  get template() {
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        ul {
          border: 0px solid black;
          margin: 0px;
          padding: 0px;
        }

        .task_item {
          list-style-type: none;
          border: 1px var(--secondary-color) solid;
          padding: 10px;
          display: flex;
          flex-direction: row;
          align-items: center;
          border-radius: 7px;
          margin-bottom: 20px;
          background-color: var(--task-color);
          color: var(--text-color);
        }
        
        .task_item:hover {
          transition: 0.5s;
          border: 1px rgba(148, 148, 148, 0.63) solid;
          cursor: pointer;
          background-color:rgba(226, 226, 226, 0.192);
        }
      </style>
      
      <ul></ul>`

    return template
  }

  add(message) {
    this.addMessageToStorage(message)
    this.addTaskRowToDom(message)
  }

  remove(singleTaskDomElement) {
    this.removeMessageFromStorage(singleTaskDomElement)
    this.removeTaskRowFromDom(singleTaskDomElement)
  }

  addTaskRowToDom(message) {
    let ul = this.shadowRoot.querySelector('ul')
    const newTaskItem = document.createElement('li')
    newTaskItem.setAttribute('class', 'task_item')
    newTaskItem.onclick = (e) => {
      e.preventDefault()
      this.remove(newTaskItem)
    }

    const newTaskBio = document.createElement('span')
    newTaskBio.setAttribute('class', 'task_bio')
    newTaskBio.innerText = message

    newTaskItem.appendChild(newTaskBio)
    ul.appendChild(newTaskItem)
  }

  initStorage() {
    let data = JSON.parse(localStorage.getItem(this.#localStorageKey))

    if(null === data) {
      localStorage.setItem(this.#localStorageKey, JSON.stringify([]))
    }
  }

  addMessageToStorage(message) {
    let data = JSON.parse(localStorage.getItem(this.#localStorageKey))
    if(null === data) {
      throw new Error('Storage not initialized')
    }
    data.push(message)
    localStorage.setItem(this.#localStorageKey, JSON.stringify(data))
  }

  renderStorage() {
    let data = JSON.parse(localStorage.getItem(this.#localStorageKey))
    data.forEach(message => this.addTaskRowToDom(message))
  }
  
  removeMessageFromStorage(singleTaskDomElement) {
    let ul = this.shadowRoot.querySelector('ul')
    let index = [...ul.children].indexOf(singleTaskDomElement)
    let data = JSON.parse(localStorage.getItem(this.#localStorageKey))
    data.splice(index, 1)
    localStorage.setItem(this.#localStorageKey, JSON.stringify(data))
  }

  removeTaskRowFromDom(singleTaskDomElement) {
    singleTaskDomElement.remove()
  }

  /**
   * Callbacks start
   */
 
  /**
   * 1 di 4: is called when the component is inserted into an HTML document’s DOM.
   */
  connectedCallback() {
    console.log('TaskList connectedCallback')
    this.render()
  }

  /**
   * 2 di 4: is called when the element is removed from the document’s DOM.
   */
  disconnectedCallback() {
    console.log('TaskList disconnectedCallback')
  }

  /**
   * 3 di 4: is called when the component is moved to another HTML document.
   */
  adoptedCallback() {
    console.log('TaskList adoptedCallback')
  }

  /**
   * 4 di 4: 
   */
  attributeChangedCallback() {
    console.log('TaskList attributeChangedCallback')
  }

  render() {
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
    this.initStorage()
    this.renderStorage()
  }
}