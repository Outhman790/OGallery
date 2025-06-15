export default function imageReducer(state, action) {
  switch (action.type) {
    case 'GET_IMAGES':
      return [...action.payload];

    case 'ADD_IMAGE':
      return [action.payload, ...state];

    case 'APPEND_IMAGES':
      return [...state, ...action.payload];

    case 'PREPEND_IMAGES':
      return [...action.payload, ...state];

    case 'DELETE_IMAGE':
      return state.filter((img) => img.id !== action.payload);

    case 'UPDATE_IMAGE':
      return state.map((img) =>
        img.id === action.payload.id ? { ...img, ...action.payload } : img,
      );

    default:
      return state;
  }
}
