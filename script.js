
let todoItems = [];

document.addEventListener('click', (e) => {
    if (e.target.matches('li')) {
        e.target.classList.toggle('strike-through');
    }

    if (e.target.matches('button')) {
        // update localStorage and remove item
        const ulList = document.querySelector('ul');
        const nodes = Array.from(ulList.children);
        const index = nodes.indexOf(e.target.parentElement);

        todoItems.splice(index, 1);
        localStorage.setItem('todoItems', JSON.stringify(todoItems));

        e.target.parentElement.remove();
    }
});

// functionality for adding list items
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const textInput = document.querySelector('input[name="new-item"]');
    if (textInput.value === '') {
        textInput.placeholder = 'Please enter some text';
    } else {
        // create new li element
        createListElement(textInput.value);
        todoItems.push(textInput.value);

        // update localStorage
        localStorage.setItem('todoItems', JSON.stringify(todoItems));

        textInput.value = '';
        textInput.placeholder = 'Add Item';
    }
});

const ul = document.querySelector('ul');
const createListElement = (userText) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    li.textContent = `${userText} `;
    button.innerHTML = '&#10005;';
    li.append(button);
    ul.append(li);
};

// check if local storage has array todoItems, if so, add to DOM
if (localStorage.getItem('todoItems') !== null) {
    todoItems = JSON.parse(localStorage.todoItems);
    for (let item of todoItems) {
        createListElement(item);
    }
}