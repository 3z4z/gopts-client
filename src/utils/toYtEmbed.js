export function toYouTubeEmbed(url) {
  if (url.includes("/embed/")) return url;

  const regex = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^?&]+)/;

  const match = url.match(regex);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}
