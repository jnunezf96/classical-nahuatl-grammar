const prefix = '84/p2/';
const fragment = '#r-data=';
const requestTargetLimit = 7500;

export function readPortableResultUrl(url) {
  const values = url?.searchParams.getAll('r') ?? [];
  const hasPortableFragment = url?.hash.startsWith(fragment) ?? false;
  if (!hasPortableFragment && !values.some(value => value.startsWith(prefix))) return null;
  // Keep invalid portable addresses in the portable decoder, where the bare
  // prefix fails validation. An older recipe or saved session must never win.
  if (values.length !== 1 || /^#(?:result-v1=|result-data=)/.test(url.hash)) return prefix;
  const [value] = values;
  if (!hasPortableFragment) return value;
  return value === prefix ? prefix + url.hash.slice(fragment.length) : prefix;
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
