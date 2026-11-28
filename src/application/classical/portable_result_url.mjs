const prefix = '84/p2/';
const fragment = '#r-data=';
const requestTargetLimit = 7500;

export function readPortableResultUrl(url) {
  const value = url?.searchParams.get('r');
  if (!value?.startsWith(prefix)) return null;
  return value === prefix && url.hash.startsWith(fragment)
    ? prefix + url.hash.slice(fragment.length) : value;
}

export function writePortableResultUrl(url, address) {
  url.searchParams.delete('r');
  if (/^#(?:result-v1=|r-data=|result-data=)/.test(url.hash)) url.hash = '';
  if (!address?.startsWith(prefix)) return false;
  const query = url.search ? url.search + '&' : '?';
  const payload = 'r=' + address;
  if (url.pathname.length + query.length + payload.length > requestTargetLimit) {
    url.search = query + 'r=' + prefix;
    url.hash = fragment + address.slice(prefix.length);
  } else {
    url.search = query + payload;
  }
  return true;
}
