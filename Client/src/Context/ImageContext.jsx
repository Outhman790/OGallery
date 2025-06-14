import React, { createContext, useReducer, useContext } from 'react';
import imageReducer from '../reducers/imageReducer';

const ImageContext = createContext();

const initialImageState = [];

export const ImageProvider = ({ children }) => {
  const [images, dispatch] = useReducer(imageReducer, initialImageState);

  return <ImageContext.Provider value={{ images, dispatch }}>{children}</ImageContext.Provider>;
};

export const useImageContext = () => useContext(ImageContext);
