import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createPreparati = (preparati, token) => {
    let createpreparatiEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createpreparatiEndpoint = `${API}/preparati`;
    } else if (isAuth() && isAuth().role === 0) {
        createpreparatiEndpoint = `${API}/user/preparati`;
    }

    return fetch(`${createpreparatiEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: preparati
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listPreparati= (skip, limit) => {
    const data = {
        limit,
        skip
    };
    return fetch(`${API}/preparati-all`, {
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

export const singlePreparati = slug => {
    return fetch(`${API}/preparati/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listRelated = preparati => {
    return fetch(`${API}/preparatis/related`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(preparati)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = username => {
    let listpreparatisEndpoint;

    if (username) {
        listpreparatisEndpoint = `${API}/${username}/preparatis`;
    } else {
        listpreparatisEndpoint = `${API}/preparatis`;
    }

    return fetch(`${listpreparatisEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removePreparati = (slug, token) => {
    let deletepreparatiEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deletepreparatiEndpoint = `${API}/preparati/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deletepreparatiEndpoint = `${API}/user/preparati/${slug}`;
    }

    return fetch(`${deletepreparatiEndpoint}`, {
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

export const updatePreparati = (preparati, token, slug) => {
    let updatepreparatiEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updatepreparatiEndpoint = `${API}/preparati/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updatepreparatiEndpoint = `${API}/user/preparati/${slug}`;
    }

    return fetch(`${updatepreparatiEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: preparati
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
    return fetch(`${API}/preparatis/search?${query}`, {
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
    return fetch(`${API}/preparatis/searchall?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};