import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createLogo = (logo, token) => {
    let createlogoEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createlogoEndpoint = `${API}/logo`;
    } else if (isAuth() && isAuth().role === 0) {
        createlogoEndpoint = `${API}/user/logo`;
    }

    return fetch(`${createlogoEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: logo
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleLogo = slug => {
    return fetch(`${API}/logo/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = username => {
    let listlogosEndpoint;

    if (username) {
        listlogosEndpoint = `${API}/${username}/logos`;
    } else {
        listlogosEndpoint = `${API}/logos`;
    }

    return fetch(`${listlogosEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeLogo = (slug, token) => {
    let deletelogoEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deletelogoEndpoint = `${API}/logo/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deletelogoEndpoint = `${API}/user/logo/${slug}`;
    }

    return fetch(`${deletelogoEndpoint}`, {
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

