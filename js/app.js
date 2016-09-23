var $on = function (target, type, callback, useCapture) {
	target.addEventListener(type, callback, !!useCapture);
}

function getCardTemplate() {
  var cardTemplate = document.querySelector('.todo-template').cloneNode(true);
  cardTemplate.removeAttribute('hidden');
  cardTemplate.classList.remove('todo-template');
  return cardTemplate;
}


function boot() {
  console.log('hello');
  document.querySelector('.main').appendChild(getCardTemplate());
  document.querySelector('.main').appendChild(getCardTemplate());
  document.querySelector('.main').appendChild(getCardTemplate());
  

}


$on(window, 'load', boot);
