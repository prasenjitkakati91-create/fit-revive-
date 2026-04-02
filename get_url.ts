fetch('https://ibb.co/ZzGGq8Ts')
  .then(res => res.text())
  .then(text => {
    const match = text.match(/https:\/\/i\.ibb\.co\/[^"]+/);
    console.log(match ? match[0] : 'Not found');
  });
