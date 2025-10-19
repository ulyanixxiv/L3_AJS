const https = require('https');

function fetchData(url, callback) {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => callback(null, JSON.parse(data)));
  }).on('error', err => callback(err));
}

fetchData('https://jsonplaceholder.typicode.com/posts', (err, posts) => {
  if (err) return console.error('Ошибка при получении posts:', err);
  const sortedPosts = posts.sort((a, b) => b.title.length - a.title.length);
  console.log('Отсортированные posts:', sortedPosts);
});