import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createGaleri = (galeri, token) => {
    let creategaleriEndpoint;

    if (isAuth() && isAuth().role === 1) {
        creategaleriEndpoint = `${API}/galeri`;
    } else if (isAuth() && isAuth().role === 0) {
        creategaleriEndpoint = `${API}/user/galeri`;
    }

    return fetch(`${creategaleriEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: galeri
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};



export const list = username => {
    let listgalerisEndpoint;

    if (username) {
        listgalerisEndpoint = `${API}/${username}/galeris`;
    } else {
        listgalerisEndpoint = `${API}/galeris`;
    }

    return fetch(`${listgalerisEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeGaleri = (slug, token) => {
    let deletegaleriEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deletegaleriEndpoint = `${API}/galeri/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deletegaleriEndpoint = `${API}/user/galeri/${slug}`;
    }

    return fetch(`${deletegaleriEndpoint}`, {
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

export const listGaleri = (skip, limit) => {
    const data = {
        limit,
        skip
    };
    return fetch(`${API}/galeri-all`, {
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


export const updateGaleri = (galeri, token, slug) => {
    let updategaleriEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updategaleriEndpoint = `${API}/galeri/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updategaleriEndpoint = `${API}/user/galeri/${slug}`;
    }

    return fetch(`${updategaleriEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: galeri
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

