import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createNabavka = (nabavke, token) => {
    let createNabavkaEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createNabavkaEndpoint = `${API}/nabavke`;
    } else if (isAuth() && isAuth().role === 0) {
        createNabavkaEndpoint = `${API}/user/nabavke`;
    }

    return fetch(`${createNabavkaEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: nabavke
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listAllNabavka = (skip, limit) => {
    const data = {
        limit,
        skip
    };
    return fetch(`${API}/nabavkes-all`, {
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

export const singleNabavka= slug => {
    return fetch(`${API}/nabavke/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listRelated = nabavke => {
    return fetch(`${API}/nabavkes/related`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(nabavke)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = username => {
    let listnabavkasEndpoint;

    if (username) {
        listnabavkasEndpoint = `${API}/${username}/nabavkes`;
    } else {
        listnabavkasEndpoint = `${API}/nabavkes`;
    }

    return fetch(`${listnabavkasEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeNabavke = (slug, token) => {
    let deletenabavkaEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deletenabavkaEndpoint = `${API}/nabavke/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deletenabavkaEndpoint = `${API}/user/nabavke/${slug}`;
    }

    return fetch(`${deletenabavkaEndpoint}`, {
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

export const updateNabavka= (nabavke, token, slug) => {
    let updatenabavkaEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updatenabavkaEndpoint = `${API}/nabavke/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updatenabavkaEndpoint = `${API}/user/nabavke/${slug}`;
    }

    return fetch(`${updatenabavkaEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: nabavke
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
    return fetch(`${API}/nabavkes/search?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const listSearchAll = params => {
    console.log('search params', params);
    let query = queryString.stringify(params);
    console.log('query params', query);
    return fetch(`${API}/nabavkes/searchall?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};