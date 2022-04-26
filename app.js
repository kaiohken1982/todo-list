class App extends HTMLElement {
  constructor(){
    super()

    /**
     * Creazione shadowDOM
     * Lo shadow DOM permette di avere separazione tra l'html 
     * del componente ed il resto del documento
     */
    this.attachShadow({ mode: 'open'})
    this.registerCustomElements()
  }

  get template() {
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        .container {
          position: relative;
          border: 4px var(--footer-color) solid;
          padding: 30px;
          display: flex;
          flex-direction: column;
          width: 300px;
          height: 60vh;
          border-radius: 20px;
          overflow: hidden;
          background: var(--primary-color);
          transition: var(--theme-transition);
        }
        
        footer {
          position: absolute;
          bottom: 0px;
          padding: 15px 10px;
          min-width: 100%;
          background-color: var(--footer-color);
          left: 0px;
          border: 5px var(--footer-color) solid;
        }
      </style>
      
      <div class="container">
        <header>
          <h1>Cose da fare</h1>
        </header>
        <section>
          <task-list></task-list>
        </section>
        <footer>
          <todo-add></todo-add>
        </footer>
      </div>`

    return template
  }

  registerCustomElements() {
    window.customElements.define('todo-add', TodoAdd)
    window.customElements.define('task-list', TaskList)
  }

  /**
   * Callbacks start
   */
 
  /**
   * 1 di 4: is called when the component is inserted into an HTML document’s DOM.
   */
  connectedCallback() {
    console.log('App connectedCallback')
    this.render()
    this.bootstrap()
  }

  /**
   * 2 di 4: is called when the element is removed from the document’s DOM.
   */
  disconnectedCallback() {
    console.log('App disconnectedCallback')
  }

  /**
   * 3 di 4: is called when the component is moved to another HTML document.
   */
  adoptedCallback() {
    console.log('App adoptedCallback')
  }

  /**
   * 4 di 4: 
   */
  attributeChangedCallback() {
    console.log('App attributeChangedCallback')
  }

  render() {
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
  }

  bootstrap() {
    const todoAdd = this.shadowRoot.querySelector('todo-add')
    const todoList = this.shadowRoot.querySelector('task-list')
    todoAdd.addEventListener('addTodo', e => {
      todoList.add(e.detail.message)
    })
  }
}