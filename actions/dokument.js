import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createdokument = (dokument, token) => {
    let createdokumentEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createdokumentEndpoint = `${API}/dokument`;
    } else if (isAuth() && isAuth().role === 0) {
        createdokumentEndpoint = `${API}/user/dokument`;
    }

    return fetch(`${createdokumentEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: dokument
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singledokument = slug => {
    return fetch(`${API}/dokument/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = username => {
    let listdokumentsEndpoint;

    if (username) {
        listdokumentsEndpoint = `${API}/${username}/dokuments`;
    } else {
        listdokumentsEndpoint = `${API}/dokuments`;
    }

    return fetch(`${listdokumentsEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removedokument = (slug, token) => {
    let deletedokumentEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deletedokumentEndpoint = `${API}/dokument/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deletedokumentEndpoint = `${API}/user/dokument/${slug}`;
    }

    return fetch(`${deletedokumentEndpoint}`, {
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

