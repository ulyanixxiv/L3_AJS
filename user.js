const https = require('https');

function fetchData(url, callback) {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => callback(null, JSON.parse(data)));
  }).on('error', err => callback(err));
}

fetchData('https://jsonplaceholder.typicode.com/users', (err, users) => {
  if (err) return console.error('Ошибка при получении users:', err);
  const filteredUsers = users.map(user => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone
  }));
  console.log('Отфильтрованные users:', filteredUsers);
});