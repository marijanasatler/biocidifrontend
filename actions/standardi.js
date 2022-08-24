import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createStandard = (standardi, token) => {
    let createstandardiEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createstandardiEndpoint = `${API}/standard`;
    } else if (isAuth() && isAuth().role === 0) {
        createstandardiEndpoint = `${API}/user/standard`;
    }

    return fetch(`${createstandardiEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: standardi
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleStandard = slug => {
    return fetch(`${API}/standard/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = username => {
    let liststandardisEndpoint;

    if (username) {
        liststandardisEndpoint = `${API}/${username}/standardi`;
    } else {
        liststandardisEndpoint = `${API}/standardi`;
    }

    return fetch(`${liststandardisEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeStandard = (slug, token) => {
    let deletestandardiEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deletestandardiEndpoint = `${API}/standard/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deletestandardiEndpoint = `${API}/user/standard/${slug}`;
    }

    return fetch(`${deletestandardiEndpoint}`, {
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

