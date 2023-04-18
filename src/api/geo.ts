const url =
  'https://api.geoapify.com/v1/ipinfo?apiKey=e1bfa5d00a624cd8b02ca2740039c892';

const geo = async () => {
  const obj = await fetch(url);
  const result = await obj.json();
  return result;
};

export default geo;
