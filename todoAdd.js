class TodoAdd extends HTMLElement {
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
        form {
          display: flex;
          flex-direction: row;
          align-content: center;
        }
        
        input {
          min-width: 250px;
          margin-right: 40px;
          font-size: 20px;
          color: white;
          background-color: transparent;
          border: none;
          border-bottom: 1px rgba(255, 255, 255, 0.267) solid;
        }
        
        input::placeholder {
          color: rgba(255, 255, 255, 0.589);
          font-size: 20px;
          font-family: "Times New Roman";
        }
        
        button {
          width: 30px;
          height: 30px;
          cursor: pointer;
        }
      </style>


      <form id="newTaskForm">
        <input type="text" name="newTask" placeholder="Aggiungi nuovo task" value="" />
        <button type="submit">+</button>
      </form>`

    return template
  }

  /**
   * Callbacks start
   */
 
  /**
   * 1 di 4: is called when the component is inserted into an HTML document’s DOM.
   */
  connectedCallback() {
    console.log('TodoAdd connectedCallback')
    this.render()
  }

  /**
   * 2 di 4: is called when the element is removed from the document’s DOM.
   */
  disconnectedCallback() {
    console.log('TodoAdd disconnectedCallback')
  }

  /**
   * 3 di 4: is called when the component is moved to another HTML document.
   */
  adoptedCallback() {
    console.log('TodoAdd adoptedCallback')
  }

  /**
   * 4 di 4: 
   */
  attributeChangedCallback() {
    console.log('TodoAdd attributeChangedCallback')
  }

  render() {
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
    this.shadowRoot.querySelector('button').onclick = (e) => {
      e.preventDefault()
      let input = this.shadowRoot.querySelector('input')
      this.dispatchEvent(new CustomEvent('addTodo', {
        detail: { 
          message: input.value 
        } 
      } ))
      input.value = '';
    }
  }
}