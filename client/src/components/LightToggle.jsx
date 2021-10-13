export const CHANGE_AMBIENT = 'CHANGE_AMBIENT';
export const CHANGE_LIGHT1 = 'CHANGE_LIGHT1';
export const CHANGE_LIGHT2 = 'CHANGE_LIGHT2';
export const CHANGE_LIGHT3 = 'CHANGE_LIGHT3';
export const LIGHT_SWITCH = 'LIGHT_SWITCH';


export const lightReducer = (state, action) => {
  switch (action.type) {
    case LIGHT_SWITCH:
      return {
        ambientIntensity: Number(action.payload),
        light: Number(action.payload),
        lightTwo: Number(action.payload),
        lightThree: Number(action.payload)
      };
    default:
      return state;
  }
};

export const initialState = {
  ambientIntensity: .85,
  light: 3,
  lightTwo: 7,
  lightThree: 6,
};
