import _ from 'lodash';
import Object from 'lodash/Object';
import Array from 'lodash/Array';
import axios from 'axios';
import moment from 'moment';

const clientState = {
  clientData: [],
  navProgress : false,
  isLoading: false,
  isError: false,
  isSuccess : false,
};
const ClientReducer = (state = clientState, action) => {
  switch (action.type) {
    case 'GetClientData':
      return {
        clientData: state.clientData,
        navProgress : true,
        isLoading: false,
        isError: state.isError,
        isSuccess : false,
      };
    case 'AppendClientData':
      return {
        clientData: state.clientData,
        navProgress : false,
        isLoading: true,
        isError: state.isError,
        isSuccess : false,
      };
    case 'removeClientData':
      return {
        clientData: state.clientData,
        navProgress : false,
        isLoading: true,
        isError: state.isError,
        isSuccess : false,
      };
    case 'editClientData':
      return {
        clientData: state.clientData,
        navProgress : false,
        isLoading: true,
        isError: state.isError,
        isSuccess : false,
      };
    case 'UpdateClientResponse':
      if (action.prevAction == 'AppendClientData') {
        var temp = _.concat(state.clientData, action.response);
        var callState = action.status == 'Success' ? true : false,
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
      }else if (action.prevAction == 'GetClientData') {
        var temp = action.response;
      }

      var errorMsg =
        action.status.error != undefined ? _.values(action.status.error) : '';

      var formattedDate = action.response != undefined ? temp.map(values => {
        if(values.dob != undefined && values.dob != null ){
          return  values.dob = moment(values.dob).format('YYYY-MM-DD');
        }
      }) : '';
      // console.log('ClientReducer', action, temp);
      
      return {
        clientData:
          action.status == 'Success' && action.response != undefined
            ? temp
            : state.clientData,
        isLoading: false,
        isError :action.status.error != undefined ? {
          status : true,
        message : errorMsg,
        } : false,
        navProgress : false,
        isSuccess : action.prevAction != 'GetClientData' && action.status == 'Success' ? true : false,
      };
    default:
      return state;
  }
};
export default ClientReducer;