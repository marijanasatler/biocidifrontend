import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createZavod = (zavod, token) => {
    let createzavodEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createzavodEndpoint = `${API}/zavod`;
    } else if (isAuth() && isAuth().role === 0) {
        createzavodEndpoint = `${API}/user/zavod`;
    }

    return fetch(`${createzavodEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: zavod
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};


export const singleZavod = slug => {
    return fetch(`${API}/zavod/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export const list = username => {
    let listzavodsEndpoint;

    if (username) {
        listzavodsEndpoint = `${API}/${username}/zavods`;
    } else {
        listzavodsEndpoint = `${API}/zavods`;
    }

    return fetch(`${listzavodsEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeZavod = (slug, token) => {
    let deletezavodEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deletezavodEndpoint = `${API}/zavod/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deletezavodEndpoint = `${API}/user/zavod/${slug}`;
    }

    return fetch(`${deletezavodEndpoint}`, {
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

export const updateZavod= (zavod, token, slug) => {
    let updatezavodEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updatezavodEndpoint = `${API}/zavod/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updatezavodEndpoint = `${API}/user/zavod/${slug}`;
    }

    return fetch(`${updatezavodEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: zavod
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

