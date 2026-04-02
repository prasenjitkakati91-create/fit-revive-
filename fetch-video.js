import https from 'https';

function fetchUrl(url) {
  https.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5'
    }
  }, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
      const matches = data.match(/https:\/\/[^"']+\.mp4/g);
      if (matches) {
        console.log("Found for", url, ":", matches[0]);
      } else {
        console.log("Not found for", url);
      }
    });
  }).on('error', (e) => {
    console.error(e);
  });
}

fetchUrl('https://www.pexels.com/video/electrotherapy-session-for-muscle-rehabilitation-30352918/');
fetchUrl('https://www.pexels.com/video/a-professional-taping-a-person-s-shoulder-5793445/');
