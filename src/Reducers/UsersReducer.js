import _ from 'lodash';
import Object from 'lodash/Object';
import Array from 'lodash/Array';
import axios from 'axios';
const usersState = {
  usersData: [],
  navProgress : false,
  isLoading : false,
  isError : false,
  isSuccess : false,
};

const UsersReducer = (state = usersState, action) => {
  switch (action.type) {
    case 'GetUsersData':
      return {
        usersData:  state.usersData,
        navProgress : true,
        isLoading : false,
        isError : false,
        isSuccess : false,
      };
    case 'AppendUserData':
      return {
        usersData: state.usersData,
        navProgress : false,
        isLoading : true,
        isError : false,
        isSuccess : false,
      };
    case 'RemoveUserData':
      return {
        usersData: state.usersData,
        navProgress : false,
        isLoading : true,
        isError : false,
        isSuccess : false,
      };
    case 'EditUserData':
      return {
        usersData: state.usersData,
        navProgress : false,
        isLoading : true,
        isError : false,
        isSuccess : false,
      };
      case 'UpdateUsersResponse':
        if (action.prevAction == 'AppendUserData') {
          var temp = _.concat(state.usersData, action.response);
        } else if (action.prevAction == 'RemoveUserData') {
          temp = _.filter(state.usersData, function(n) {
            return n.id != action.response.id;
          });
        } else if (action.prevAction == 'EditUserData') {
          var temp = _.map(state.usersData, (values) => {
          if (action.response.id == values.id) {
            values = action.response;
          }
          values = values;
          return values;
        });
        }else if (action.prevAction == 'GetUsersData') {
          var temp = action.response;
        }
        var errorMsg =
        action.status.error != undefined ? _.values(action.status.error) : '';
        // console.log('UserReducer', action, temp);
        return {
          usersData: action.status == 'Success' && action.response != undefined
              ? temp
              : state.usersData,
          isLoading: false,
          navProgress : false,
          isError :action.status.error != undefined ? {
            status : true,
          message : errorMsg,
          } : false,
          isSuccess : action.prevAction != 'GetUsersData' && action.status == 'Success' ? true : false,
        };
    default:
      return state;
  }
};
export default UsersReducer;