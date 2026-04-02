async function getUrl(url) {
  try {
    const res = await fetch(url, { redirect: 'manual' });
    console.log(url, '->', res.headers.get('location'));
  } catch (e) {
    console.error(e);
  }
}
getUrl('https://www.pexels.com/video/30352918/download/');
getUrl('https://www.pexels.com/video/5793445/download/');
