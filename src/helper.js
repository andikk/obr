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

export const mergeArrayObjects = (arr1,arr2) => {
  return arr1.map((item,i)=>{
    if(item.id === arr2[i].id){
      //merging two objects
      return Object.assign({},item,arr2[i])
    }
  })
};

export const CATS = [{id: 1, name: "По предметам"}, {id: 2, name: "По институтам и факультетам"}];

export const CAT_TYPE = {
  "1": "subjects",
  "2": "institutes"
};

export const CHECKED_CAT_ID = 0;
