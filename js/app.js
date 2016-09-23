var $on = function(target, type, callback, useCapture) {
  target.addEventListener(type, callback, !!useCapture);
}
NodeList.prototype.forEach = Array.prototype.forEach;

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 16; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var config = {
  apiKey: "AIzaSyC3VzTh-hH-7Y8r7edMWrEBr7ZTb2q2vTo",
  authDomain: "pwa-todo.firebaseapp.com",
  databaseURL: "https://pwa-todo.firebaseio.com",
  storageBucket: "pwa-todo.appspot.com",
  messagingSenderId: "97697636347"
};

const fb = firebase.initializeApp(config);

const cardRef = fb.database().ref('cards')
cardRef.on('child_added', addTodoFromFB);
cardRef.on('child_changed', addTodoFromFB);
cardRef.on('child_removed', deleleteTodoFromFB);


function deleleteTodoFromFB(data) {
  const uid = data.key;
  const value = data.val();
  console.log('delete', uid);
  var card = document.querySelector(`[uid="${uid}"]`);
  console.log(card, uid);
  if (card) {
    card.parentNode.removeChild(card);
  }
}

function addTodoFromFB(data) {
  const uid = data.key;
  const value = data.val();
  console.log('add', uid);
  var card = document.querySelector(`[uid="${uid}"]`);
  if (!card) {
    var newTodo = createTodo(value, uid);
    document.querySelector('.todos')
      .appendChild(newTodo);
    return;
  }
  var data = card.querySelector('.data');
  data.innerHTML = value;
}

function createTodo(inputValue, uid) {
  console.log(uid);
  var cardTemplate = document.querySelector('.todo-template').cloneNode(true);
  cardTemplate.removeAttribute('hidden');

  // fill template with data
  var data = cardTemplate.querySelector('.data');
  data.innerHTML = inputValue;

  // remove template details
  cardTemplate.classList.remove('todo-template');
  cardTemplate.classList.add('todo');

  cardTemplate.setAttribute('uid', uid);

  $on(cardTemplate, 'click', () => {
    console.log('removing', uid);
    fb.database().ref(`cards/${uid}`).remove();
  });
  return cardTemplate;
}

function handleInput(e) {
  e.preventDefault();
  var inputValue = document.querySelector('.text-input input').value;
  console.log('uploading');
  const uid = makeid();
  fb.database().ref(`cards/${uid}`)
    .set(inputValue).then((e) => {
        
  });

}

function boot() {
  var button = document.querySelector('.text-input button');
  $on(button, 'click', handleInput);
}

$on(window, 'load', boot);
