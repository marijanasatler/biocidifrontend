import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createostalo = (ostalo, token) => {
    let createostaloEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createostaloEndpoint = `${API}/ostalo`;
    } else if (isAuth() && isAuth().role === 0) {
        createostaloEndpoint = `${API}/user/ostalo`;
    }

    return fetch(`${createostaloEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: ostalo
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};


export const singleostalo = slug => {
    return fetch(`${API}/ostalo/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = username => {
    let listostalosEndpoint;

    if (username) {
        listostalosEndpoint = `${API}/${username}/ostalos`;
    } else {
        listostalosEndpoint = `${API}/ostalos`;
    }

    return fetch(`${listostalosEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeostalo = (slug, token) => {
    let deleteostaloEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deleteostaloEndpoint = `${API}/ostalo/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deleteostaloEndpoint = `${API}/user/ostalo/${slug}`;
    }

    return fetch(`${deleteostaloEndpoint}`, {
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

export const updateostalo = (ostalo, token, slug) => {
    let updateostaloEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updateostaloEndpoint = `${API}/ostalo/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updateostaloEndpoint = `${API}/user/ostalo/${slug}`;
    }

    return fetch(`${updateostaloEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: ostalo
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
    return fetch(`${API}/ostalos/search?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
