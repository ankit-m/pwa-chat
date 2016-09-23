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

window.addEventListener('offline',  () => {document.querySelector('.text-input').style.visibility = 'hidden'});
window.addEventListener('online',  () => {document.querySelector('.text-input').style.visibility = 'visible'});

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
  if (e.keyCode === 13) {
    e.preventDefault();
    var inputValue = document.querySelector('.text-input input').value;
    document.querySelector('.todos')
      .appendChild(createTodo(inputValue));
    document.querySelector('.text-input input').value = '';
  }
}

function boot() {
  var button = document.querySelector('.text-input button');
}

function getData () {
  var url = 'https://publicdata-weather.firebaseio.com/';
  url += 'cards.json';
  if ('caches' in window) {
    caches.match(url).then(function(response) {
      if (response) {
        response.json().then(function(json) {
          // Only update if the XHR is still pending, otherwise the XHR
          // has already returned and provided the latest data.
          if (app.hasRequestPending) {
            console.log('updated from cache');
            json.key = key;
            json.label = label;
            app.updateTodo(json);
          }
        });
      }
    });
  }
  app.hasRequestPending = true;
  // Make the XHR to get the data, then update the card
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        var response = JSON.parse(request.response);
        app.hasRequestPending = false;
        app.updateTodo(response);
      }
    }
  };
  request.open('GET', url);
  request.send();
};


$on(window, 'load', boot);
