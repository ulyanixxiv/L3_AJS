const https = require('https');

function fetchData(url, callback) {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => callback(null, JSON.parse(data)));
  }).on('error', err => callback(err));
}

fetchData('https://jsonplaceholder.typicode.com/todos', (err, todos) => {
  if (err) return console.error('Ошибка при получении todos:', err);
  const incompleteTodos = todos.filter(todo => !todo.completed);
  console.log('Незавершенные todos:', incompleteTodos);
});