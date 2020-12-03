export const removeDuplicates = (originalArray, prop) => {
  let newArray = [];
  let lookupObject  = {};

  for (let i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (let i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
};

export const CATS = [{id: 1, name: "По предметам"}, {id: 2, name: "По институтам и факультетам"}];

export const CAT_TYPE = {
  "1": "subjects",
  "2": "institutes"
};

//export const APP_URL = 'http://data.web.ncfu.ru/';

export const APP_URL = 'https://edprogs.ncfu.ru/';

