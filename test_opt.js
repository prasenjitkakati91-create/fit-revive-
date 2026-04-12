import https from 'https';

https.get('https://fit-images.vercel.app/_next/image?url=%2F1.webp&w=800&q=75', (res) => {
  console.log('Status:', res.statusCode);
  process.exit(0);
});
