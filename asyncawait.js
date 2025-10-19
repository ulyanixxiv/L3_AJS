const https = require('https');

function fetchData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', err => reject(err));
  });
}

async function main() {
  try {
    const posts = await fetchData('https://jsonplaceholder.typicode.com/posts');
    const sortedPosts = posts.sort((a, b) => b.title.length - a.title.length);
    console.log('Отсортированные posts (async/await):', sortedPosts);

    const comments = await fetchData('https://jsonplaceholder.typicode.com/comments');
    const sortedComments = comments.sort((a, b) => a.name.localeCompare(b.name));
    console.log('Отсортированные comments (async/await):', sortedComments);

    const users = await fetchData('https://jsonplaceholder.typicode.com/users');
    const filteredUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone
    }));
    console.log('Отфильтрованные users (async/await):', filteredUsers);

    const todos = await fetchData('https://jsonplaceholder.typicode.com/todos');
    const incompleteTodos = todos.filter(todo => !todo.completed);
    console.log('Незавершенные todos (async/await):', incompleteTodos);

  } catch (err) {
    console.error('Ошибка:', err);
  }
}

main();