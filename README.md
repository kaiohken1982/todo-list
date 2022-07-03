## TODO List con Web Components

Questa è una applicazione che ha lo scopo di illustrare un possibile utilizzo 
di javascript e web components senza l'uso di framework.

L'applicazione viene bootstrappata da tag "my-awesome-app", legato alla 
class App, questo avviene direttamente nell'index.html.

La class App registra altri due web components, 'todo-add' e 'task-list', 
legati rispettivamente alle classi 'TodoAdd' e 'TaskList':

- il primo componente, 'todo-add', si occuperà di renderizzare l'input per 
l'aggiunta dei "todo", che saranno inviati tramite evento custom 'addTodo'.

- il secondo componente, 'task-list', si occuperà di renderizzare i 'todo' e 
salvarli nel localStorage, in modo tale che saranno ripristinati in caso di refresh della pagina.
Inoltre rimuoverà il singolo 'todo' in caso di click.

- Il componente 'my-awesome-app' fungerà da event broker, aggiungendo un event listener all'evento 'addTodo' inviato 
da 'todo-add', chiamando il metodo add del componente 'task-list'

Ogni componente al suo interno contiene l'html ed il css per il proprio rendering, 
come avviene nei vari framework da diversi anni a questa parte.


