const GET_LOGINDATA = 'GetLoginData';
const GET_CLIENTDATA = 'GetClientData';
const GET_CASESDATA = 'GetCasesData';
const GET_USERSDATA = 'GetUsersData';

export function GetLoginData(val) {
  return {
    type: GET_LOGINDATA,
    value: val
  };
}

export function getClientData(val) {
  return {
    type: GET_CLIENTDATA,
    value: val
  };
}

export function getCasesData(val) {
  console.log("getCasesData",val)
  return {
    type: GET_CASESDATA,
    value: val
  };
}

export function getUsersData(val) {
  return {
    type: GET_USERSDATA,
    value: val
  };
}

export function appendClientData(val) {
  return {
    type: 'AppendClientData',
    method: 'POST',
    actionUrl: 'https://staging-api.esquiretek.com/clients',
    formData: val,
    target : 'UpdateClientResponse'
  };
}

export function removeClientData(clientId) {
  return {
    type: 'removeClientData',
    method: 'DELETE',
    actionUrl: 'https://staging-api.esquiretek.com/clients/' + clientId,
    target : 'UpdateClientResponse'
  };
}

export function editClientData(val, clientId) {
  return {
    type: 'editClientData',
    method: 'PUT',
    actionUrl:'https://staging-api.esquiretek.com/clients/' + clientId,
    formData: val,
    target : 'UpdateClientResponse'
  };
}

export function appendCasesData(val) {
  return {
    type: 'AppendCasesData',
    method: 'POST',
    actionUrl: 'https://staging-api.esquiretek.com/cases',
    formData: val,
    target : 'UpdateCasesResponse',
  };
}

export function removeCasesData(caseId) {
  return {
    type: 'removeCasesData',
    method: 'DELETE',
    actionUrl: 'https://staging-api.esquiretek.com/cases/' + caseId,
    target : 'UpdateCasesResponse',
  };
}

export function editCasesData(val, caseId) {
  return {
    type: 'editCasesData',
    method: 'PUT',
    actionUrl: 'https://staging-api.esquiretek.com/cases/' + caseId,
    formData: val,
    target : 'UpdateCasesResponse',
  };
}

export function appendUserData(val) {
  return {
    type: 'AppendUserData',
    value: val
  };
}

export function removeUserData(val) {
  return {
    type: 'RemoveUserData',
    value: val
  };
}

export function editUserData(val, index,status) {
  return {
    type: 'EditUserData',
    value: val,
    userId: index,
    status : status,
  };
}
