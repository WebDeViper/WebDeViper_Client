export const redirectUrl = (provider: string) => {
  const url = window.location.origin;
  return `${url}/oauth/${provider}`;
};
