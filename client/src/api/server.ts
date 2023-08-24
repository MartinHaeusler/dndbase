const SERVER_PORT = 8080;

const SERVER_HOST = window.location.hostname;

export const SERVER_URL_HTTP = `http://${SERVER_HOST}:${SERVER_PORT}`;

export async function fetchGet(path: string, parameters: any = {}) {
  return fetch(
    `${SERVER_URL_HTTP}/${removePrefix(path, "/")}?${new URLSearchParams(
      parameters
    )}`,
    {
      method: "GET",
    }
  );
}

export async function fetchPost(
  path: string,
  body?: any,
  parameters: any = {}
) {
  return fetch(
    `${SERVER_URL_HTTP}/${removePrefix(path, "/")}?${new URLSearchParams(
      parameters
    )}`,
    {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }
  );
}

export async function fetchPut(path: string, body?: any, parameters: any = {}) {
  return fetch(
    `${SERVER_URL_HTTP}/${removePrefix(path, "/")}?${new URLSearchParams(
      parameters
    )}`,
    {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }
  );
}

function ensurePrefix(s: string, prefix: string): string {
  if (s.startsWith(prefix)) {
    return s;
  } else {
    return prefix + s;
  }
}

function removePrefix(s: string, prefix: string): string {
  if (s.startsWith(prefix)) {
    return s.substring(prefix.length);
  } else {
    return s;
  }
}