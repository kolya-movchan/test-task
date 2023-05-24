export {};

const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
type Data = null;

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: Data = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }


  return wait(0)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const item = {
  get: function <T>(url: string) {
    return request<T>(url);
  },
  // post: function <T>(url: string, data: Data) {
  //   return request<T>(url, 'POST', data);
  // },
  // delete: (url: string) => request(url, 'DELETE'),
  // put: function<T>(url: string, data?: CFPforUpdate) {
  //   return request<T>(url, 'PUT', data);
  // },
};
