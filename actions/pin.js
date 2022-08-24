import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createpin = (pin, token) => {
    let createpinEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createpinEndpoint = `${API}/pin`;
    } else if (isAuth() && isAuth().role === 0) {
        createpinEndpoint = `${API}/user/pin`;
    }

    return fetch(`${createpinEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: pin
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listpinsWithCategoriesAndTags = (skip, limit) => {
    const data = {
        limit,
        skip
    };
    return fetch(`${API}/pins-categories-tags`, {
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

export const singlepin = slug => {
    return fetch(`${API}/pin/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export const listPin = username => {
    let listpinsEndpoint;

    if (username) {
        listpinsEndpoint = `${API}/${username}/pins`;
    } else {
        listpinsEndpoint = `${API}/pins`;
    }

    return fetch(`${listpinsEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removepin = (slug, token) => {
    let deletepinEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deletepinEndpoint = `${API}/pin/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deletepinEndpoint = `${API}/user/pin/${slug}`;
    }

    return fetch(`${deletepinEndpoint}`, {
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

export const updatepin = (pin, token, slug) => {
    let updatepinEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updatepinEndpoint = `${API}/pin/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updatepinEndpoint = `${API}/user/pin/${slug}`;
    }

    return fetch(`${updatepinEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: pin
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

