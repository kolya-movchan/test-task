export {};

const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

type RequestMethod = 'GET' | 'POST';
type Data = FormData | null;

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: Data = null,
): Promise<T> {
  const options: RequestInit = { method };

  // if it is POST request then we are ading body with the data and set up the appropriate headers

  if (data) {
    options.body = data
    options.headers = {
      'Token': localStorage.getItem('tokenKey') || '',
    };
  }

  return fetch(BASE_URL + url, options)
    .then(response => response.json());
}

export const item = {
  get: function <T>(url: string) {
    return request<T>(url);
  },

  post: function <T>(url: string, data: Data) {
    return request<T>(url, 'POST', data);
  },
};
