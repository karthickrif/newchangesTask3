import _ from 'lodash';
import Object from 'lodash/Object';
import Array from 'lodash/Array';
import axios from 'axios';

const casesState = {
  casesData: [],
  navProgress: false,
  isLoading: false,
};

const CasesReducer = (state = casesState, action) => {
  switch (action.type) {
    case 'GetCasesData':
      return {
        casesData: state.casesData,
        navProgress: true,
        isLoading: false,
      };
    case 'AppendCasesData':
      return {
        casesData: state.casesData,
        navProgress: false,
        isLoading: true,
      };
    case 'removeCasesData':
      return {
        casesData: state.casesData,
        navProgress: false,
        isLoading: true,
      };
    case 'editCasesData':
      return {
        casesData: state.casesData,
        navProgress : false,
        isLoading: true,
      };
    case 'UpdateCasesResponse':
      if (action.prevAction == 'AppendCasesData') {
        var temp = _.concat(state.casesData, action.response);
      } else if (action.prevAction == 'removeCasesData') {
        temp = _.filter(state.casesData, function (n) {
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
      }else if (action.prevAction == 'GetCasesData') {
        var temp = action.response;
      }
      return {
        casesData:
          action.status == 'Success' && action.response != undefined
            ? temp
            : state.casesData,
        isLoading: false,
        navProgress : false,
      };
    default:
      return state;
  }
};
export default CasesReducer;