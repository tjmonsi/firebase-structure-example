import bindProperty from './bind-property';
import setListeners from './set-listeners';

export default (element, properties) => {
  const bindings = Object.keys(properties)
    .filter((name) => {
      const property = properties[name];
      if (Object.prototype.hasOwnProperty.call(property, 'firebasePath')) {
        return true;
      }
      return false;
    });
  bindings.forEach(name => {
    bindProperty(name, element, properties);
    setListeners(name, element);
  });
};
