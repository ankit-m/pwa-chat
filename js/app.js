var $on = function (target, type, callback, useCapture) {
	target.addEventListener(type, callback, !!useCapture);
}

function createTodo(inputValue) {
	console.log(inputValue);
  var cardTemplate = document.querySelector('.todo-template').cloneNode(true);
  cardTemplate.removeAttribute('hidden');
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
