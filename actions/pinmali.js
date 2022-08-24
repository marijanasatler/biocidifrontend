import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createpinmali = (pinmali, token) => {
    let createpinmaliEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createpinmaliEndpoint = `${API}/pinmali`;
    } else if (isAuth() && isAuth().role === 0) {
        createpinmaliEndpoint = `${API}/user/pinmali`;
    }

    return fetch(`${createpinmaliEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: pinmali
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};



export const singlepinmali = slug => {
    return fetch(`${API}/pinmali/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export const listPinmali = username => {
    let listpinmalisEndpoint;

    if (username) {
        listpinmalisEndpoint = `${API}/${username}/pinmalis`;
    } else {
        listpinmalisEndpoint = `${API}/pinmalis`;
    }

    return fetch(`${listpinmalisEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removepinmali = (slug, token) => {
    let deletepinmaliEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deletepinmaliEndpoint = `${API}/pinmali/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deletepinmaliEndpoint = `${API}/user/pinmali/${slug}`;
    }

    return fetch(`${deletepinmaliEndpoint}`, {
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

export const updatepinmali = (pinmali, token, slug) => {
    let updatepinmaliEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updatepinmaliEndpoint = `${API}/pinmali/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updatepinmaliEndpoint = `${API}/user/pinmali/${slug}`;
    }

    return fetch(`${updatepinmaliEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: pinmali
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

