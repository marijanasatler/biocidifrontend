import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createCenovnik = (cenovnik, token) => {
    let createcenovnikEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createcenovnikEndpoint = `${API}/cenovnik`;
    } else if (isAuth() && isAuth().role === 0) {
        createcenovnikEndpoint = `${API}/user/cenovnik`;
    }

    return fetch(`${createcenovnikEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: cenovnik
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listAllcenovniks = (skip, limit) => {
    const data = {
        limit,
        skip
    };
    return fetch(`${API}/cenovniks-all`, {
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

export const singleCenovnik = slug => {
    return fetch(`${API}/cenovnik/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = username => {
    let listcenovniksEndpoint;

    if (username) {
        listcenovniksEndpoint = `${API}/${username}/cenovniks`;
    } else {
        listcenovniksEndpoint = `${API}/cenovniks`;
    }

    return fetch(`${listcenovniksEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeCenovnik = (slug, token) => {
    let deletecenovnikEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deletecenovnikEndpoint = `${API}/cenovnik/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deletecenovnikEndpoint = `${API}/user/cenovnik/${slug}`;
    }

    return fetch(`${deletecenovnikEndpoint}`, {
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

export const updateCenovnik = (cenovnik, token, slug) => {
    let updatecenovnikEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updatecenovnikEndpoint = `${API}/cenovnik/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updatecenovnikEndpoint = `${API}/user/cenovnik/${slug}`;
    }

    return fetch(`${updatecenovnikEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: cenovnik
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
    return fetch(`${API}/cenovniks/search?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
