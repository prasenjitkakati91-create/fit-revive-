import https from 'https';

function checkRedirect(url) {
  https.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
  }, (res) => {
    console.log(url, "->", res.statusCode, res.headers.location);
  }).on('error', (e) => {
    console.error(e);
  });
}

checkRedirect('https://www.pexels.com/video/30352918/download/');
checkRedirect('https://www.pexels.com/video/5793445/download/');
