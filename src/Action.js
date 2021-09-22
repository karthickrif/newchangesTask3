const GET_LOGINDATA = 'GetLoginData';
const GET_CLIENTDATA = 'GetClientData';
const GET_CASESDATA = 'GetCasesData';
const GET_USERSDATA = 'GetUsersData';

export function GetLoginData(val) {
  return {
    type: GET_LOGINDATA,
    value: val,
  };
}

export function getClientData() {
  return {
    type: GET_CLIENTDATA,
    method: 'GET',
    actionUrl: 'https://staging-api.esquiretek.com/clients',
    target: 'UpdateClientResponse',
  };
}

export function getCasesData() {
  return {
    type: GET_CASESDATA,
    method: 'GET',
    actionUrl: 'https://staging-api.esquiretek.com/cases',
    target: 'UpdateCasesResponse',
  };
}

export function getUsersData() {
  return {
    type: GET_USERSDATA,
    method: 'GET',
    actionUrl: 'https://staging-api.esquiretek.com/users',
    target: 'UpdateUsersResponse',
  };
}

export function appendClientData(val) {
  return {
    type: 'AppendClientData',
    method: 'POST',
    actionUrl: 'https://staging-api.esquiretek.com/clients',
    formData: val,
    target: 'UpdateClientResponse',
  };
}

export function removeClientData(clientId) {
  return {
    type: 'removeClientData',
    method: 'DELETE',
    actionUrl: 'https://staging-api.esquiretek.com/clients/' + clientId,
    target: 'UpdateClientResponse',
  };
}

export function editClientData(val, clientId) {
  return {
    type: 'editClientData',
    method: 'PUT',
    actionUrl: 'https://staging-api.esquiretek.com/clients/' + clientId,
    formData: val,
    target: 'UpdateClientResponse',
  };
}

export function appendCasesData(val) {
  return {
    type: 'AppendCasesData',
    method: 'POST',
    actionUrl: 'https://staging-api.esquiretek.com/cases',
    formData: val,
    target: 'UpdateCasesResponse',
  };
}

export function removeCasesData(caseId) {
  return {
    type: 'removeCasesData',
    method: 'DELETE',
    actionUrl: 'https://staging-api.esquiretek.com/cases/' + caseId,
    target: 'UpdateCasesResponse',
  };
}

export function editCasesData(val, caseId) {
  return {
    type: 'editCasesData',
    method: 'PUT',
    actionUrl: 'https://staging-api.esquiretek.com/cases/' + caseId,
    formData: val,
    target: 'UpdateCasesResponse',
  };
}

export function appendUserData(val) {
  return {
    type: 'AppendUserData',
    method: 'POST',
    actionUrl: 'https://staging-api.esquiretek.com/users',
    formData: val,
    target: 'UpdateUsersResponse',
  };
}

export function removeUserData(userId) {
  return {
    type: 'RemoveUserData',
    method: 'DELETE',
    actionUrl: 'https://staging-api.esquiretek.com/users/' + userId,
    target: 'UpdateUsersResponse',
  };
}

export function editUserData(val, userId) {
  return {
    type: 'EditUserData',
    method: 'PUT',
    actionUrl: 'https://staging-api.esquiretek.com/users/' + userId,
    formData: val,
    target: 'UpdateUsersResponse',
  };
}

export function directLogin(val) {
  return {
    type: 'directLogin',
    authToken: val,
  };
}
