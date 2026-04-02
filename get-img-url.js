async function getImageUrl(url) {
  const res = await fetch(url);
  const text = await res.text();
  const match = text.match(/<meta property="og:image" content="([^"]+)"/);
  if (match) {
    console.log(match[1]);
  } else {
    console.log("Not found");
  }
}
getImageUrl('https://ibb.co/d0m33ng3');
