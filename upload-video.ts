import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

// Use default credentials when running in the AI Studio environment
admin.initializeApp({
  storageBucket: 'gen-lang-client-0717144627.appspot.com'
});

async function uploadFile() {
  const bucket = admin.storage().bucket();
  const filePath = path.join(process.cwd(), 'public', 'video3.mp4');

  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    process.exit(1);
  }

  const fileName = 'videos/treatment-video.mp4';
  
  console.log(`Uploading ${filePath} to ${fileName}...`);

  try {
    await bucket.upload(filePath, {
      destination: fileName,
      metadata: {
        contentType: 'video/mp4',
      },
    });

    const file = bucket.file(fileName);
    
    // Making it public and getting the URL might require permissions, 
    // but we can try to get a signed URL or just the public link.
    // For AI Studio apps, files are often private by default.
    // We'll try to generate a long-lived signed URL.
    
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2491', // Long term expiration
    });

    console.log('SUCCESS_URL:' + url);
  } catch (error) {
    console.error('Upload failed:', error);
    process.exit(1);
  }
}

uploadFile();
