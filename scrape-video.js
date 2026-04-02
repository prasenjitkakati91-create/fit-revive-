async function scrapeUrl(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const text = await res.text();
    const match = text.match(/https:\/\/videos\.pexels\.com\/video-files\/[^"']+\.mp4/);
    if (match) {
      console.log("Found for", url, "->", match[0]);
    } else {
      console.log("Not found for", url);
    }
  } catch (e) {
    console.error(e);
  }
}
scrapeUrl('https://www.pexels.com/video/electrotherapy-session-for-muscle-rehabilitation-30352918/');
scrapeUrl('https://www.pexels.com/video/a-professional-taping-a-person-s-shoulder-5793445/');
