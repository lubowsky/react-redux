const convertData = arr => {
  const result = {};
  
  arr.forEach(item => {
    if (!result.hasOwnProperty(item.category)) {
      result[item.category] = [item]
    } else {
      result[item.category].push(item)
    }
    return result;
  });
  
  return result;
}
  
export default convertData;
