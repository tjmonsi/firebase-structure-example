import collect from './utils/collect';
import bind from './utils/bind';
import unbind from './utils/unbind';

const pathMatch = /\[\[[^$#\[\]\/]*\]\]/g;

export default (superClass) => {
  return class extends superClass {
    constructor () {
      super();
      Object.defineProperty(this, '__firebaseProperties', { value: {} });
    }

    connectedCallback () {
      super.connectedCallback();
      const properties = collect(this.constructor, 'properties');
      bind(this, properties);
    }

    disconnectedCallback () {
      super.disconnectedCallback();
      unbind(this, this.__firebaseProperties);
    }
  }
}