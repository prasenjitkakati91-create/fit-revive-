import https from 'https';

const id = '5793445';
const formats = [
  `https://videos.pexels.com/video-files/${id}/${id}-uhd_2160_4096_30fps.mp4`,
  `https://videos.pexels.com/video-files/${id}/${id}-uhd_2160_3840_30fps.mp4`,
  `https://videos.pexels.com/video-files/${id}/${id}-hd_1920_1080_30fps.mp4`,
  `https://videos.pexels.com/video-files/${id}/${id}-hd_1080_1920_30fps.mp4`,
  `https://videos.pexels.com/video-files/${id}/${id}-sd_640_360_30fps.mp4`,
  `https://videos.pexels.com/video-files/${id}/${id}-sd_360_640_30fps.mp4`
];

formats.forEach(url => {
  https.request(url, { method: 'HEAD' }, (res) => {
    console.log(url, "->", res.statusCode);
  }).end();
});
