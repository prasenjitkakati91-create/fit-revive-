import https from 'https';

https.get('https://fit-images.vercel.app/_next/image?url=https%3A%2F%2Ffit-images.vercel.app%2F1.webp&w=800&q=75', (res) => {
  console.log('Status:', res.statusCode);
  process.exit(0);
});
