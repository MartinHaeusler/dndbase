// we use a RELATIVE path here in order to ensure that we will
// use the same protocol for our API requests which was used
// to load the page (development: HTTP, production: HTTPS).
export const SERVER_URL_HTTP = `/api`;

export async function fetchGet(path: string, parameters: any = {}) {
  return fetch(`${SERVER_URL_HTTP}/${removePrefix(path, '/')}?${new URLSearchParams(parameters)}`, {
    method: 'GET',
  });
}

export async function fetchPost(path: string, body?: any, parameters: any = {}) {
  return fetch(`${SERVER_URL_HTTP}/${removePrefix(path, '/')}?${new URLSearchParams(parameters)}`, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });
}

export async function fetchPut(path: string, body?: any, parameters: any = {}) {
  return fetch(`${SERVER_URL_HTTP}/${removePrefix(path, '/')}?${new URLSearchParams(parameters)}`, {
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  });
}

function removePrefix(s: string, prefix: string): string {
  if (s.startsWith(prefix)) {
    return s.substring(prefix.length);
  } else {
    return s;
  }
}
