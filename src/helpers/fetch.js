const baseUrl = process.env.REACT_APP_API_URL;


export const fetchSinToken = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`;

    if (method === 'GET') {
        return fetch(url)
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}

export const fetchConToken = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'token': token
            }
        })
    } else if (method === 'DELETE') {
        return fetch(url, {
            method,
            headers: {
                'token': token
            }
        })
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(data)
        });
    }
}


export const fetchUpload = (endpoint, data, method = 'POST') => {

    const url = `${baseUrl}/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    return fetch(url, {
        method,
        headers: {
            'token': token
        },
        body: data
    });

}