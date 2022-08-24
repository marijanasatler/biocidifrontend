import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createLaboratori = (laboratori, token) => {
    let createLaboratoriEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createLaboratoriEndpoint = `${API}/laboratori`;
    } else if (isAuth() && isAuth().role === 0) {
        createLaboratoriEndpoint = `${API}/user/laboratori`;
    }

    return fetch(`${createLaboratoriEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: laboratori
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listAllLaboratoris = (skip, limit) => {
    const data = {
        limit,
        skip
    };
    return fetch(`${API}/laboratoris-all`, {
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

export const singleLaboratori = slug => {
    return fetch(`${API}/laboratori/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = username => {
    let listLaboratorisEndpoint;

    if (username) {
        listLaboratorisEndpoint = `${API}/${username}/laboratoris`;
    } else {
        listLaboratorisEndpoint = `${API}/laboratoris`;
    }

    return fetch(`${listLaboratorisEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeLaboratori = (slug, token) => {
    let deleteLaboratoriEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deleteLaboratoriEndpoint = `${API}/laboratori/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deleteLaboratoriEndpoint = `${API}/user/laboratori/${slug}`;
    }

    return fetch(`${deleteLaboratoriEndpoint}`, {
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

export const updateLaboratori = (laboratori, token, slug) => {
    let updateLaboratoriEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updateLaboratoriEndpoint = `${API}/laboratori/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updateLaboratoriEndpoint = `${API}/user/laboratori/${slug}`;
    }

    return fetch(`${updateLaboratoriEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: laboratori
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
    return fetch(`${API}/laboratoris/search?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
