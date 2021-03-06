import { ElementMixin } from '../../mixins/element-mixin';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer';
import LocationMixin from '../../mixins/location-mixin';
import QueryParamsMixin from '../../mixins/query-params-mixin';
import pathToRegexp from 'path-to-regexp';
import fragments from '../../fragments';
import auth from '../../../authentication';
import template from './template';
import { reducers, store, ReduxMixin } from '../state-manager';
import { combineReducers } from 'redux';

const ROUTER_ACTION = {
  PARAMS: 'ROUTER_UPDATE_PARAMS',
  ROUTE: 'ROUTER_UPDATE_ROUTE'
};

reducers.router = (router = {}, action) => {
  switch (action.type) {
    case ROUTER_ACTION.PARAMS:
      return Object.assign({}, router, {
        params: action.params
      });
    case ROUTER_ACTION.ROUTE:
      return Object.assign({}, router, {
        route: action.route
      });
    default:
      return router;
  }
};

store.replaceReducer(combineReducers(reducers));

export { ROUTER_ACTION };

class MainRouter extends ReduxMixin(QueryParamsMixin(LocationMixin(ElementMixin(window.HTMLElement)))) {
  static get is () { return 'main-router'; }

  static get properties () {
    return {
      params: {
        type: Object,
        statePath: 'router.params'
      },

      currentRoute: {
        type: String,
        statePath: 'router.route'
      }
    };
  }

  static get observers () {
    return [
      '_checkAuth(currentRoute)',
      '_updateUrl(path, query, hash)'
    ];
  }

  constructor () {
    super();
    this._routes = {};
    this.state = {};
  }

  connectedCallback () {
    super.connectedCallback();
    this._observer = new FlattenedNodesObserver(this, (info) => {
      this._contentAdded(info.addedNodes.filter((node) => (node.nodeType === window.Node.ELEMENT_NODE)));
    });
    // import(/* webpackChunkName: "app-toast" */ '../modules/app-toast/components/app-toast.html').then(() => {
    //   var messageInterval = setInterval(() => {
    //     if (messages.length > 0) {
    //       var {message, optTapHandler, optAction, optActionHandler, optDuration} = messages.pop()
    //       this.showMessage(message, optTapHandler, optAction, optActionHandler, optDuration)
    //     } else {
    //       clearInterval(messageInterval)
    //       messageInterval = null
    //     }
    //   }, 5000)
    // })
  }

  disconnectedCallback () {
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
    if (this._observer) this._observer.disconnect();
    if (this._listener) this._listener();
  }

  template () {
    return template(this);
  }

  showMessage (message, optTapHandler, optAction, optActionHandler, optDuration) {
    // if (this.shadowRoot.querySelector('app-toast').showMessage) {
    //   this.shadowRoot.querySelector('app-toast').showMessage(message, optTapHandler, optAction, optActionHandler, optDuration)
    // } else {
    //   messages.push({message, optTapHandler, optAction, optActionHandler, optDuration})
    // }
  }

  // closeToast () {
  //   this.shadowRoot.querySelector('app-toast').close();
  // }

  _contentAdded (pages) {
    pages.forEach(page => {
      page.classList.add('page');
      this._routes[page.getAttribute('route')] = {
        element: page,
        auth: page.getAttribute('auth')
      };
    });
    this._pathChanged(this.path);
  }

  _pathChanged (path) {
    // load statistics if it went through here
    if (path === '/_statistic.html' || path === '/_bundle-sizes.html') {
      window.location.href = path;
      return;
    }

    path = path.replace(/index\.html$/, '');

    var routeName = null;
    Object.entries(this._routes).forEach(route => {
      if (routeName) return;
      var params = {};
      const keys = [];
      const re = pathToRegexp(route[0], keys);
      const exec = re.exec(path);

      if (exec) {
        params = {};
        for (var j = 0; j < keys.length; j++) {
          params[keys[j].name] = exec[j + 1];
        }
        routeName = route[0];
        // this.params = params;

        this.dispatch({
          type: ROUTER_ACTION.PARAMS,
          params
        });
      }
    });

    this.dispatch({
      type: ROUTER_ACTION.ROUTE,
      route: routeName || 'not-found'
    });

    // this._checkAuth(routeName || 'not-found');
  }

  _checkAuth (route) {
    if (this._routes[route] && this._routes[route].auth && auth[this._routes[route].auth]) {
      if (auth[this._routes[route].auth] instanceof Promise) {
        auth[this._routes[route].auth]()
          .then((res) => {
            if (res) {
              this._loadPage(route);
            } else {
              this._loadPage('not-authorized');
            }
          })
          .catch((e) => {
            console.log(e);
            this._loadPage('not-authorized');
          });
      } else if (typeof auth[this._routes[route].auth] === 'function' && auth[this._routes[route].auth](this)) {
        this._loadPage(route);
      } else {
        this._loadPage('not-authorized');
      }
    } else {
      this._loadPage(route);
    }
  }

  _loadPage (route) {
    const routes = Object.assign({}, fragments);
    for (var i in this._routes) {
      if (this._routes[i] && this._routes[i].element) this._routes[i].element.classList.remove('page--on-view');
    }

    if (this._routes[route] && this._routes[route].element) {
      this._routes[route].element.classList.add('page--on-view');
    }
    if (this._routes[route]) {
      // console.log(this._routes[route])
      var name = this._routes[route].element.nodeName.toLowerCase();

      if (!routes[name]) {
        return this.dispatch({
          type: ROUTER_ACTION.ROUTE,
          route: 'not-found'
        });
      }

      routes[name]().then(() => {
        // if (this._routes[route].element._setProperty) {
        //   this._routes[route].element._setProperty('params', this.params);
        //   this._routes[route].element._setProperty('queryParams', this.paramsObject);
        // }

        if (!this._routes[route].element.constructor.is ||
          this._routes[route].element.constructor === this._routes[route].element.nodeName.toLowerCase()) {
          return this.dispatch({
            type: ROUTER_ACTION.ROUTE,
            route: 'not-found'
          });
        }

        if (this._routes[route].element.reload) {
          this._routes[route].element.reload();
        }

        if (document.querySelector('.header') && document.querySelector('.header').reload) {
          document.querySelector('.header').reload();
        }

        if (document.querySelector('.drawer') && document.querySelector('.drawer').reload) {
          document.querySelector('.drawer').reload();
        }

        window.scrollTo(0, 0);
        if (window.ga) {
          window.ga('set', 'page', this.path);
          window.ga('send', 'pageview');
        }
      });
    }
  }
}

window.customElements.define(MainRouter.is, MainRouter);
