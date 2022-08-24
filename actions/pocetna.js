import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createpocetna = (pocetna, token) => {
    let createpocetnaEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createpocetnaEndpoint = `${API}/pocetna`;
    } else if (isAuth() && isAuth().role === 0) {
        createpocetnaEndpoint = `${API}/user/pocetna`;
    }

    return fetch(`${createpocetnaEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: pocetna
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};



export const singlepocetna = slug => {
    return fetch(`${API}/pocetna/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = username => {
    let listpocetnasEndpoint;

    if (username) {
        listpocetnasEndpoint = `${API}/${username}/pocetnas`;
    } else {
        listpocetnasEndpoint = `${API}/pocetnas`;
    }

    return fetch(`${listpocetnasEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const listPocetnaPin = (skip, limit) => {
    const data = {
        limit,
        skip
    };
    return fetch(`${API}/pocetna-pin`, {
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


export const removepocetna = (slug, token) => {
    let deletepocetnaEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deletepocetnaEndpoint = `${API}/pocetna/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deletepocetnaEndpoint = `${API}/user/pocetna/${slug}`;
    }

    return fetch(`${deletepocetnaEndpoint}`, {
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

export const updatepocetna = (pocetna, token, slug) => {
    let updatepocetnaEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updatepocetnaEndpoint = `${API}/pocetna/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updatepocetnaEndpoint = `${API}/user/pocetna/${slug}`;
    }

    return fetch(`${updatepocetnaEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: pocetna
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};


