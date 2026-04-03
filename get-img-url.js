async function getImageUrl(url) {
  try {
    const res = await fetch(url);
    const text = await res.text();
    const match = text.match(/<meta property="og:image" content="([^"]+)"/);
    if (match) {
      console.log(match[1]);
    } else {
      console.log("Not found");
    }
  } catch (e) {
    console.log("Error fetching URL");
  }
}
const url = process.argv[2];
if (url) {
  getImageUrl(url);
} else {
  console.log("Please provide a URL");
}
