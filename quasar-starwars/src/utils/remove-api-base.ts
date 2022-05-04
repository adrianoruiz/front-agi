export const removeApiBase = (url: string): string => {
  const base = 'https://swapi.dev/api/';

  const fomartedUrl = url.replace(base, '');

  return fomartedUrl;
};
