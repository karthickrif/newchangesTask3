import _ from 'lodash';
import Object from 'lodash/Object';
import Array from 'lodash/Array';
import axios from 'axios';
import {
  getCasesData,
  appendCasesData,
  removeCasesData,
  editCasesData
} from '../Action';
const casesState = {
  casesData: [],
  isLoading: false,
};

const CasesReducer = (state = casesState, action) => {
  switch (action.type) {
    case 'GetCasesData':
      return {
        casesData: action.value,
        isLoading: false,
      };
      case 'AppendCasesData':
      return {
        casesData: state.casesData,
        isLoading: true,
      };
      case 'removeCasesData':
        return {
          casesData: state.casesData,
        isLoading: true,
          
        };
      case 'editCasesData':
        return {
          casesData: state.casesData,
          isLoading: true,
        };
        case 'UpdateCasesResponse':
          if (action.prevAction == 'AppendCasesData') {
            var temp = _.concat(state.casesData, action.response);
          } else if (action.prevAction == 'removeCasesData') {
            temp = _.filter(state.casesData, function(n) {
              return n.id != action.response.id;
            });
          } else if (action.prevAction == 'editCasesData') {
            var temp = _.map(state.casesData, (values) => {
              if (action.response.id == values.id) {
                values = action.response;
              }
              values = values;
              return values;
            });
          }
          return {
            casesData:
              action.status == 'Success' && action.response != undefined ? temp : state.casesData,
            isLoading: false,
          };
    default:
      return state;
  }
};
export default CasesReducer;

export const GetCasesTable = () => (dispatch, getState) => {
  const token = getState().LoginReducer.authToken;
  axios({
    url: 'https://staging-api.esquiretek.com/cases',
    method: 'GET',
    headers: {
      authorization: token
    }
  })
    .then(response => {
      // console.log('GetCasesTable_response', response);
      dispatch(getCasesData(response.data));
    })
    .catch(error => {
      // console.log(error);
    });
};