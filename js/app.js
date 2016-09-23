var $on = function (target, type, callback, useCapture) {
	target.addEventListener(type, callback, !!useCapture);
}

function createTodo(inputValue) {
  var cardTemplate = document.querySelector('.todo-template').cloneNode(true);
  cardTemplate.removeAttribute('hidden');

	// fill template with data
	var data = cardTemplate.querySelector('.data');
	data.innerHTML = inputValue;

	// remove template details
	cardTemplate.classList.remove('todo-template');
	cardTemplate.classList.add('todo');

	$on(cardTemplate, 'click', () => {
		cardTemplate.parentNode.removeChild(cardTemplate);
	});
  return cardTemplate;
}

function handleInput(e) {
		e.preventDefault();
		var inputValue = document.querySelector('.text-input input').value;
		document.querySelector('.todos')
			.appendChild(createTodo(inputValue));
		document.querySelector('.text-input input').value = '';
}

function boot() {
		var button = document.querySelector('.text-input button');
		$on(button, 'click', handleInput);
}

$on(window, 'load', boot);
