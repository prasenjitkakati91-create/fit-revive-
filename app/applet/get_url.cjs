fetch('https://ibb.co/27k2wFzC')
  .then(res => res.text())
  .then(text => {
    const match = text.match(/https:\/\/i\.ibb\.co\/[^"]+/);
    console.log(match ? match[0] : 'Not found');
  });
