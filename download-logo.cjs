const fs = require('fs');
const https = require('https');

https.get('https://fit-images.vercel.app/logo-2.jpg', (res) => {
  const file = fs.createWriteStream('public/logo-2.jpg');
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Download complete');
  });
}).on('error', (err) => {
  console.error('Error downloading:', err.message);
});
