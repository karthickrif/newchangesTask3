import _ from 'lodash';
import Object from 'lodash/Object';
import Array from 'lodash/Array';
import {
  getClientData,
  appendClientData,
  removeClientData,
  editClientData,
} from '../Action';
import axios from 'axios';

const clientState = {
  clientData: [],
  isLoading: false,
};
const ClientReducer = (state = clientState, action) => {
  switch (action.type) {
    case 'GetClientData':
      return {
        clientData: action.value,
        isLoading: false,
      };
    case 'AppendClientData':
      return {
        clientData: state.clientData,
        isLoading: true,
      };
    case 'removeClientData':
      return {
        clientData: state.clientData,
        isLoading: true,
      };
    case 'editClientData':
      return {
        clientData: state.clientData,
        isLoading: true,
      };
    case 'UpdateClientResponse':
      if (action.prevAction == 'AppendClientData') {
        var temp = _.concat(state.clientData, action.response);
      } else if (action.prevAction == 'removeClientData') {
        var temp = _.filter(state.clientData, function (n) {
          return n.id != action.response.id;
        });
      } else if (action.prevAction == 'editClientData') {
        var temp = _.map(state.clientData, (values) => {
          if (action.response.id == values.id) {
            values = action.response;
          }
          values = values;
          return values;
        });
      }

      console.log('ClientReducer', action, temp);
      return {
        clientData:
          action.status == 'Success' && action.response != undefined
            ? temp
            : state.clientData,
        isLoading: false,
      };
    default:
      return state;
  }
};
export default ClientReducer;

export const GetClientTable = () => (dispatch, getState) => {
  const token = getState().LoginReducer.authToken;
  const method = getState().ClientReducer.method;
  // console.log("GetUserTable",method);
  axios({
    method: 'GET',
    url: 'https://staging-api.esquiretek.com/clients',
    headers: {
      authorization: token,
    },
  })
    .then((response) => {
      // console.log('GetUserTable_response', response);
      dispatch(getClientData(response.data));
    })
    .catch((error) => {
      // console.log("err",error);
    });
};

// export const ModifyClient = () => (dispatch, getState) => {
//   const token = getState().LoginReducer.authToken;
//   const method = getState().ClientReducer.method;
//   let formData = getState().ClientReducer.formData;
//   const actionUrl = getState().ClientReducer.actionUrl;
//   const clientID = getState().ClientReducer.clientId;
//   // console.log("ModifyClient",method,formData,actionUrl);
//   axios({
//     method: method,
//     url: actionUrl,
//     headers: {
//       authorization: token,
//     },
//     data: JSON.stringify(formData),
//   })
//     .then((response) => {
//       // console.log('ModifyClient_response', response);
//       if (method == 'POST') {
//         dispatch(appendClientData(response.data));
//       } else if (method == 'DELETE') {
//         dispatch(removeClientData(response.data));
//       } else if (method == 'PUT') {
//         dispatch(editClientData(response.data, clientID, 'Updated'));
//       }
//     })
//     .catch((error) => {
//       // console.log('err', error);
//     });
// };
