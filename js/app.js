var $on = function(target, type, callback, useCapture) {
  target.addEventListener(type, callback, !!useCapture);
}

var config = {
  apiKey: "AIzaSyC3VzTh-hH-7Y8r7edMWrEBr7ZTb2q2vTo",
  authDomain: "pwa-todo.firebaseapp.com",
  databaseURL: "https://pwa-todo.firebaseio.com",
  storageBucket: "pwa-todo.appspot.com",
  messagingSenderId: "97697636347"
};
const todoApp = firebase.initializeApp(config);

function createTodo(inputValue) {
  var cardTemplate = document.querySelector('.todo-template').cloneNode(true);
  cardTemplate.removeAttribute('hidden');

  // fill template with data
  var data = cardTemplate.querySelector('.data');
  data.innerHTML = inputValue;

  // remove template details
  cardTemplate.classList.remove('todo-template');
  cardTemplate.classList.add('todo');

  return cardTemplate;
}

function handleInput(e) {
  e.preventDefault();
  var inputValue = document.querySelector('.text-input input').value;
  document.querySelector('.todos')
    .appendChild(createTodo(inputValue));
}

function boot() {
  var button = document.querySelector('.text-input button');
  $on(button, 'click', handleInput);
}

$on(window, 'load', boot);
