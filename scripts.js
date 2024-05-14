let todo = []

const InputTodoName = document.getElementById('InputTodoName')
const InputTodoButton = document.getElementById('InputTodoButton')
const TodoDoneSection = document.getElementById('TodoDoneSection')
const TodoActiveSection = document.getElementById('TodoActiveSection')

document.addEventListener('DOMContentLoaded', () => {
  InputTodoButton.onclick = addTodo

  document.dispatchEvent(new Event('RENDER_TODO'))
})

const switchTodo = (id) => {
  let newTodos = []

  todo.forEach((item) => {
    if (item.id === id) {
      item.isActive = !item.isActive
    }

    newTodos.push(item)
  })

  todo = newTodos

  document.dispatchEvent(new Event('RENDER_TODO'))
}

const deleteTodo = (id) => {
  let newTodos = []

  todo.forEach((item) => {
    if (item.id !== id) {
      newTodos.push(item)
    }
  })

  todo = newTodos

  document.dispatchEvent(new Event('RENDER_TODO'))
}

document.addEventListener('RENDER_TODO', () => {
  TodoDoneSection.innerHTML = ''
  TodoActiveSection.innerHTML = ''

  todo.forEach((item) => {
    const Card = document.createElement('div')
    const CardBody = document.createElement('div')

    Card.className = 'card mb-3'
    CardBody.className = 'card-body'

    CardBody.innerText = item.name

    const switchButton = document.createElement('button')
    const deleteButton = document.createElement('button')

    deleteButton.className = 'btn btn-danger'
    switchButton.className = 'btn btn-primary mx-3'

    deleteButton.innerText = 'Delete'
    switchButton.innerText = item.isActive ? 'Done' : 'Active'

    switchButton.onclick = () => switchTodo(item.id)
    deleteButton.onclick = () => deleteTodo(item.id)

    CardBody.appendChild(switchButton)
    CardBody.appendChild(deleteButton)

    Card.appendChild(CardBody)

    if (item.isActive) {
      TodoActiveSection.appendChild(Card)
    } else {
      TodoDoneSection.appendChild(Card)
    }
  })
})

const addTodo = () => {
  const todoName = InputTodoName.value

  if (todoName) {
    todo.push({
      id: new Date().getTime(),
      name: todoName,
      isActive: true,
    })

    InputTodoName.value = ''

    document.dispatchEvent(new Event('RENDER_TODO'))
  }
}
