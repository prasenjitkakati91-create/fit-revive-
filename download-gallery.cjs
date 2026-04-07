const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
  "https://fit-images.vercel.app/exterior.jpeg",
  "https://fit-images.vercel.app/inog.jpeg",
  "https://fit-images.vercel.app/interior3.JPG",
  "https://fit-images.vercel.app/inog2.jpeg",
  "https://fit-images.vercel.app/interiora.jpeg",
  "https://fit-images.vercel.app/inog3.jpeg",
  "https://fit-images.vercel.app/team.jpeg",
  "https://fit-images.vercel.app/inog4.jpeg",
  "https://fit-images.vercel.app/gust.jpeg",
  "https://fit-images.vercel.app/image.jpeg",
  "https://fit-images.vercel.app/interior.jpeg",
  "https://fit-images.vercel.app/me.jpeg",
  "https://fit-images.vercel.app/me2.jpeg"
];

const download = (url) => {
  const filename = path.basename(url);
  const dest = path.join('public', filename);
  
  https.get(url, (res) => {
    const file = fs.createWriteStream(dest);
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${filename}`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${url}:`, err.message);
  });
};

images.forEach(download);
