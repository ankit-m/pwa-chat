var $on = function (target, type, callback, useCapture) {
	target.addEventListener(type, callback, !!useCapture);
}

function getCardTemplate() {
  var cardTemplate = document.querySelector('.todo-template').cloneNode(true);
  cardTemplate.removeAttribute('hidden');
  cardTemplate.classList.remove('todo-template');
	cardTemplate.classList.add('todo');
  return cardTemplate;
}


function boot() {
  console.log('hello', document.querySelector('.todos'));
  document.querySelector('.todos').appendChild(getCardTemplate());
  document.querySelector('.todos').appendChild(getCardTemplate());
  document.querySelector('.todos').appendChild(getCardTemplate());

}


$on(window, 'load', boot);
