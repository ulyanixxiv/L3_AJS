const https = require('https');

function fetchData(url, callback) {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => callback(null, JSON.parse(data)));
  }).on('error', err => callback(err));
}

fetchData('https://jsonplaceholder.typicode.com/comments', (err, comments) => {
  if (err) return console.error('Ошибка при получении comments:', err);
  const sortedComments = comments.sort((a, b) => a.name.localeCompare(b.name));
  console.log('Отсортированные comments:', sortedComments);
});