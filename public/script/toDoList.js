// function to create a delete button and append it to each list item
const addDeleteButton = (li) => {
    const span = document.createElement('SPAN');
    const txt = document.createTextNode('\u00D7');
    span.className = 'delete';
    span.appendChild(txt);
    li.appendChild(span);
  
    span.onclick = () => {
      const div = span.parentElement;
      div.style.display = 'none';
    };
  };
  
  // adding delete buttons for existing list items
  document.querySelectorAll('#toDoUL li').forEach((li) => {
    addDeleteButton(li);
  });
  
  // event listener for list items to handle "checked" and "delete" actions
  document.querySelector('#toDoUL').addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      event.target.classList.toggle('checked');
    } else if (event.target.className === 'delete') {
      const div = event.target.parentElement;
      div.style.display = 'none';
    }
  });
  
  // function to create a new list item when clicking on the "Add" button
  const newElement = () => {
    const inputValue = document.getElementById('toDoInput').value.trim();
    if (!inputValue) {
      alert('Please add a task first!');
      return;
    }
  
    const li = document.createElement('li');
    const t = document.createTextNode(inputValue);
    li.appendChild(t);
    document.getElementById('toDoUL').appendChild(li);
    document.getElementById('toDoInput').value = '';
  
    addDeleteButton(li);
  };
  
  // event listener for clicking add button
  document.querySelector('.todolist-add').addEventListener('click', newElement);

  // event listener for pressing "enter" or "return" key to add item to list
  document.getElementById('toDoInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      newElement();
    }
  });