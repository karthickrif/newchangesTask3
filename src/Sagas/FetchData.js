import React from 'react';
import axios from 'axios';
var LoginAPI = 'https://staging-api.esquiretek.com/login';
var SessionAPI = 'https://staging-api.esquiretek.com/users/me';
export function FetchFromLoginApi(obj) {
  obj = JSON.stringify(obj);
  const request = axios({
    method: 'POST',
    url: LoginAPI,
    data: obj,
  })
    .then((response) => {
      // console.log('loginApi', response);
      return response.data;
    })
    .catch((error) => {
      // console.log('login', error);
      return error;
    });
  return request;
}

export function FetchfromSessionApi(obj) {
  const request = axios({
    method: 'GET',
    url: SessionAPI,
    headers: {
      authorization: obj,
    },
  })
    .then((response) => {
      // console.log('sessionApi', response);
      return response.data;
    })
    .catch((error) => {
      // console.log(error);
    });
  return request;
}

export function ModifyClient(apiCall, authToken) {
  console.log('ModifyClient', apiCall, authToken);
  const request = axios({
    method: apiCall.method,
    url: apiCall.actionUrl,
    headers: {
      authorization: authToken,
    },
    data: JSON.stringify(apiCall.formData),
  })
    .then((response) => {
      console.log('ModifyClient_response', response);
      // if (apiCall.method == 'POST') {
      //   dispatch(appendClientData(response.data));
      // } else if (apiCall.method == 'DELETE') {
      //   dispatch(removeClientData(response.data));
      // } else if (method == 'PUT') {
      //   dispatch(editClientData(response.data, clientID, 'Updated'));
      // }
      return response;
    })
    .catch((error) => {
      console.log('err', error);
      return error;
    });
  return request;
}
