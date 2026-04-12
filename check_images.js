import https from 'https';
import fs from 'fs';

const urls = [
  "https://fit-images.vercel.app/1.webp",
  "https://fit-images.vercel.app/2.webp",
  "https://fit-images.vercel.app/3.webp",
  "https://fit-images.vercel.app/4.webp",
  "https://fit-images.vercel.app/5.webp",
  "https://fit-images.vercel.app/6.webp",
  "https://fit-images.vercel.app/7.webp",
  "https://fit-images.vercel.app/8.webp",
  "https://fit-images.vercel.app/9.webp",
  "https://fit-images.vercel.app/10.webp",
  "https://fit-images.vercel.app/11.webp",
  "https://fit-images.vercel.app/13.webp"
];

let completed = 0;
const results = [];

urls.forEach(url => {
  const req = https.get(url, (res) => {
    results.push(`${url}: ${res.statusCode}`);
    checkDone();
  }).on('error', (e) => {
    results.push(`${url}: ERROR ${e.message}`);
    checkDone();
  });
  
  req.setTimeout(5000, () => {
    req.destroy();
    results.push(`${url}: TIMEOUT`);
    checkDone();
  });
});

function checkDone() {
  completed++;
  if (completed === urls.length) {
    fs.writeFileSync('image_results.txt', results.join('\n'));
    process.exit(0);
  }
}
