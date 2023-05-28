export {};

const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST';
// type Data = UserForPost | FormData | null;
type Data = FormData | null;

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: Data = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    console.log(data);
    
    options.body = data;
    // options.body = JSON.stringify(data);
    options.headers = {
      'Token': localStorage.getItem('tokenKey') || '',
    };
  }


  return wait(0)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      // if (options.body) {
      //   console.log(response);
      // }

      // if (!response.ok) {
      //   throw new Error();
      // }

      return response.json();
    });
}

export const item = {
  get: function <T>(url: string) {
    return request<T>(url);
  },

  post: function <T>(url: string, data: Data) {
    return request<T>(url, 'POST', data);
  },
};
