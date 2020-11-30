function getLocalStorage(key, valueType = null) {
  if (typeof valueType === 'object') {
    const json = localStorage.getItem(key);
    return JSON.parse(json);
  }
  return localStorage.getItem(key);
}
function setLocalStorage(key, value) {
  if (typeof value === 'object') {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json);
  } else {
    localStorage.setItem(key, value);
  }
}

export { setLocalStorage, getLocalStorage };
