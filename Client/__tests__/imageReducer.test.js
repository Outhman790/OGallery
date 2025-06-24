import imageReducer from '../src/reducers/imageReducer';

describe('imageReducer', () => {
  const initialState = [
    { id: 1, name: 'Image 1' },
    { id: 2, name: 'Image 2' },
  ];

  it('GET_ALL_IMAGES should replace state', () => {
    const action = {
      type: 'GET_IMAGES',
      payload: [{ id: 3 }, { id: 4 }],
    };
    const result = imageReducer(initialState, action);
    expect(result).toEqual([{ id: 3 }, { id: 4 }]);
  });

  it('ADD_IMAGE should prepend new image', () => {
    const action = {
      type: 'ADD_IMAGE',
      payload: { id: 5 },
    };
    const result = imageReducer(initialState, action);
    expect(result).toEqual([{ id: 5 }, ...initialState]);
  });

  it('APPEND_IMAGES should add images to end', () => {
    const action = {
      type: 'APPEND_IMAGES',
      payload: [{ id: 6 }],
    };
    const result = imageReducer(initialState, action);
    expect(result).toEqual([...initialState, { id: 6 }]);
  });

  it('PREPEND_IMAGES should add images to start', () => {
    const action = {
      type: 'PREPEND_IMAGES',
      payload: [{ id: 7 }],
    };
    const result = imageReducer(initialState, action);
    expect(result).toEqual([{ id: 7 }, ...initialState]);
  });

  it('DELETE_IMAGE should remove the correct image', () => {
    const action = {
      type: 'DELETE_IMAGE',
      payload: 1,
    };
    const result = imageReducer(initialState, action);
    expect(result).toEqual([{ id: 2, name: 'Image 2' }]);
  });

  it('UPDATE_IMAGE should update matching image', () => {
    const action = {
      type: 'UPDATE_IMAGE',
      payload: { id: 2, name: 'Updated Image' },
    };
    const result = imageReducer(initialState, action);
    expect(result).toEqual([
      { id: 1, name: 'Image 1' },
      { id: 2, name: 'Updated Image' },
    ]);
  });

  it('should return current state on unknown action', () => {
    const action = {
      type: 'DOES_NOT_EXIST',
    };
    const result = imageReducer(initialState, action);
    expect(result).toEqual(initialState);
  });
});
