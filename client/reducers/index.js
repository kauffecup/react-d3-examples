import assign    from 'object-assign';
import Constants from '../Constants';
import data01    from './data01.json';
import data02    from './data02.json';
import data03    from './data03.json';

// build our data and component array
const myDatas = [data01, data02, data03];
const components = [
  { _id: '00', description: 'basic' },
  { _id: '01', description: 'color' },
  { _id: '02', description: 'animated' },
  { _id: '03', description: 'text' }
];

// state is the current data, our index in the array,
// the list of components, and which component is selected
const initialState = {
  data: data01,
  dataIndex: 0,
  component: components[0],
  components: components
};

/** Our reducer for two actions - toggle data, and toggle component */
export default function reduce (state = initialState, action) {
  switch(action.type) {
    // go one over in our myDatas array
    case Constants.TOGGLE_DATA:
      const newIndex = (state.dataIndex + 1) % myDatas.length
      return assign({}, state, {
        data: myDatas[newIndex],
        dataIndex: newIndex
      });
      break;

    // update our component
    case Constants.TOGGLE_COMPONENT:
      return assign({}, state, {
        component: components.find(c => c._id === action.id)
      });
      break;

    // this'll get called sometimes!
    default:
      return state;
      break;
  }
}
