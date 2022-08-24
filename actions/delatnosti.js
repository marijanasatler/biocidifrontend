import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createDelatnost = (delatnosti, token) => {
    let createdelatnostEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createdelatnostEndpoint = `${API}/delatnost`;
    } else if (isAuth() && isAuth().role === 0) {
        createdelatnostEndpoint = `${API}/user/delatnost`;
    }

    return fetch(`${createdelatnostEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: delatnosti
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};


export const singleDelatnost = slug => {
    return fetch(`${API}/delatnost/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export const listDelatnosti = username => {
    let listdelatnostsEndpoint;

    if (username) {
        listdelatnostsEndpoint = `${API}/${username}/delatnosti`;
    } else {
        listdelatnostsEndpoint = `${API}/delatnosti`;
    }

    return fetch(`${listdelatnostsEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeDelatnost = (slug, token) => {
    let deletedelatnostEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deletedelatnostEndpoint = `${API}/delatnost/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deletedelatnostEndpoint = `${API}/user/delatnost/${slug}`;
    }

    return fetch(`${deletedelatnostEndpoint}`, {
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

export const updateDelatnost= (delatnosti, token, slug) => {
    let updatedelatnostEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updatedelatnostEndpoint = `${API}/delatnost/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updatedelatnostEndpoint = `${API}/user/delatnost/${slug}`;
    }

    return fetch(`${updatedelatnostEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: delatnosti
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

