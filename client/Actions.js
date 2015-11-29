import Constants  from './Constants';

/** Toggle through which data we're displaying */
export function toggleData() {
  return { type: Constants.TOGGLE_DATA };
}

/** Toggle which component we're displaying */
export function toggleComponent(id) {
  return { type: Constants.TOGGLE_COMPONENT, id: id };
}
