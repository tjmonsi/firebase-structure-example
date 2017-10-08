export default (name, element, properties) => {
  const {
    firebasePath,
    startAt,
    endAt,
    equalTo,
    limitToLast,
    limitToFirst,
    orderByKey,
    orderByPriority,
    orderByValue,
    appName,
    projectId,
    readOnce,
    paginated,
    type,
    auth,
    readOnly
  } = properties[name];

  const computedPath = computePath(firebasePath, element);
  const computedOrderByChild = computeChild(properties[name].orderByChild, element);

  // set copy of properties to element.__properties[name]
  element.__firebaseProperties[name] = Object.assign({}, properties[name], {computedPath, name, computedOrderByChild});

  if (type === Array) {
    element.__firebaseProperties[name].initialLoaded = false;
  }

  element.__firebaseProperties[name].url = getFirebaseRestUrl(element.__firebaseProperties[name], element);

  if (!computedPath) {
    setValue(element, name, null, readOnly);
    return;
  }

  __elementProps[element.__firebaseProperties[name].url] = __elementProps[element.__firebaseProperties[name].url] || [];

  var index = __elementProps[element.__firebaseProperties[name].url].findIndex((item) => (item.element === element && item.name === name));

  if (index < 0 && !readOnce && !paginated) {
    __elementProps[element.__properties[name].url].push({
      element,
      name
    });
  }

  ``
};
