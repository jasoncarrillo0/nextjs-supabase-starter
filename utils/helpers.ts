
/*
    purpose: standardize all api responses. any api uses this function to return a response to the client
*/
export function customResponse<TResponse>(status: number, data?: TResponse) {
    if (data) return Response.json({...data}, { status })
    return Response.json({}, { status });
}


export function generateRandomString(): string {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
  
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
}




/*
    purpose: These are all made in order to standardize and simplify interacting with our api.
             Normally I would've just used some other package to simplify it for us, but nextjs
             extends the native fetch api with custom options. So if we use a package, we lose some
             important nextjs features like caching data or not caching data

*/
interface ApiResponse<T> {
    data: T
    status: number
}

async function request<TResponse>(
    url: string, 
    config: RequestInit = {}
) : Promise<ApiResponse<TResponse>> {

    
    if (config.method === "POST") {
        if (config.body) {
            config.body = JSON.stringify(config.body)
        }
    } 

    const response = await fetch(url, config);
    const json     = await response.json();
    const payload: ApiResponse<TResponse> = {
        status: response.status,
        data: json
    }
    return payload;
}

export const customApiClient = {
    get: <TResponse>(url: string) => request<TResponse>(url),
    post: <TBody, TResponse>(url: string, body: TBody) => request<TResponse>(url, { method: 'POST', body: body } as RequestInit),
}