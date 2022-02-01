import  { createContext } from 'react';

export const UserContext = createContext({
  userName: "",
  setUserName: () => {},
  tableSize : {},
  setTableSize: () => {},
  table: [],
  setTable: () => {},
  coordinates : {},
  setCoordinates: () => {},
});

