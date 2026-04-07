const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
  // Gallery
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
  "https://fit-images.vercel.app/me2.jpeg",
  // Experts
  "https://fit-images.vercel.app/trishna.jpeg",
  "https://fit-images.vercel.app/dorothy.jpg",
  "https://fit-images.vercel.app/anjuma.jpg",
  "https://fit-images.vercel.app/sumiya.jpeg",
  // Hero
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=75",
  "https://images.pexels.com/photos/19388383/pexels-photo-19388383.jpeg?auto=compress&cs=tinysrgb&w=1600&q=75",
  "https://images.pexels.com/photos/8219057/pexels-photo-8219057.jpeg?auto=compress&cs=tinysrgb&w=1600&q=75",
  "https://images.pexels.com/photos/14797760/pexels-photo-14797760.jpeg?auto=compress&cs=tinysrgb&w=1600&q=75",
  "https://images.pexels.com/photos/6111591/pexels-photo-6111591.jpeg?auto=compress&cs=tinysrgb&w=1600&q=75",
  // Testimonials
  "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
  "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200",
  "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200"
];

const download = (url) => {
  let filename = path.basename(url.split('?')[0]);
  // Handle cases where filename might be generic or missing extension
  if (url.includes('unsplash.com')) filename = 'hero-1.jpg';
  if (url.includes('pexels-photo-19388383')) filename = 'hero-2.jpg';
  if (url.includes('pexels-photo-8219057')) filename = 'hero-3.jpg';
  if (url.includes('pexels-photo-14797760')) filename = 'hero-4.jpg';
  if (url.includes('pexels-photo-6111591')) filename = 'hero-5.jpg';
  if (url.includes('pexels-photo-1222271')) filename = 'test-1.jpg';
  if (url.includes('pexels-photo-733872')) filename = 'test-2.jpg';
  if (url.includes('pexels-photo-1181686')) filename = 'test-3.jpg';

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
