import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createVideo = (video, token) => {
    let createvideoEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createvideoEndpoint = `${API}/video`;
    } else if (isAuth() && isAuth().role === 0) {
        createvideoEndpoint = `${API}/user/video`;
    }

    return fetch(`${createvideoEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: video
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};



export const list = username => {
    let listvideosEndpoint;

    if (username) {
        listvideosEndpoint = `${API}/${username}/videos`;
    } else {
        listvideosEndpoint = `${API}/videos`;
    }

    return fetch(`${listvideosEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeVideo = (slug, token) => {
    let deletevideoEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deletevideoEndpoint = `${API}/video/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deletevideoEndpoint = `${API}/user/video/${slug}`;
    }

    return fetch(`${deletevideoEndpoint}`, {
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

export const listVideo = (skip, limit) => {
    const data = {
        limit,
        skip
    };
    return fetch(`${API}/video-all`, {
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

export const singleVideo = slug => {
    return fetch(`${API}/video/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};