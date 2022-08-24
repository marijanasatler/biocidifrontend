import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createZaposlenje = (zaposlenje, token) => {
    let createzaposlenjeEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createzaposlenjeEndpoint = `${API}/zaposlenje`;
    } else if (isAuth() && isAuth().role === 0) {
        createzaposlenjeEndpoint = `${API}/user/zaposlenje`;
    }

    return fetch(`${createzaposlenjeEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: zaposlenje
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listAllzaposlenjes = (skip, limit) => {
    const data = {
        limit,
        skip
    };
    return fetch(`${API}/zaposlenjes-all`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleZaposlenje = slug => {
    return fetch(`${API}/zaposlenje/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listZaposlenje = username => {
    let listzaposlenjesEndpoint;

    if (username) {
        listzaposlenjesEndpoint = `${API}/${username}/zaposlenjes`;
    } else {
        listzaposlenjesEndpoint = `${API}/zaposlenjes`;
    }

    return fetch(`${listzaposlenjesEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeZaposlenje = (slug, token) => {
    let deletezaposlenjeEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deletezaposlenjeEndpoint = `${API}/zaposlenje/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deletezaposlenjeEndpoint = `${API}/user/zaposlenje/${slug}`;
    }

    return fetch(`${deletezaposlenjeEndpoint}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateZaposlenje = (zaposlenje, token, slug) => {
    let updatezaposlenjeEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updatezaposlenjeEndpoint = `${API}/zaposlenje/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updatezaposlenjeEndpoint = `${API}/user/zaposlenje/${slug}`;
    }

    return fetch(`${updatezaposlenjeEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: zaposlenje
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listSearch = params => {
    console.log('search params', params);
    let query = queryString.stringify(params);
    console.log('query params', query);
    return fetch(`${API}/zaposlenjes/search?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
