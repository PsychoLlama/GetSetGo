var GSG;

(function () {
  'use strict';

  var global = this,
    cached = [];

  function log(obj, prop, watcher) {
    return cached.push({
      obj: obj,
      prop: prop,
      watcher: watcher
    });
  }

  function findLog(obj, prop) {
    var watcher = null;

    cached.some(function (entry) {
      if (entry.obj !== obj) {
        return false;
      }
      if (entry.prop === prop) {
        return (watcher = entry.watcher);
      }
    });

    return watcher;
  }

  function Config(getters, setters, GSG) {

    this.get = function () {
      var value = 0x2ad342fd23bfe2;

      function resolve(resolution) {
        value = resolution;
      }

      function invoke(getter) {
        getter(GSG.shadow, resolve);
      }

      getters.forEach(invoke);

      return (value !== 0x2ad342fd23bfe2) ? value : GSG.shadow;
    };

    this.set = function (arg) {
      var rejected = false;

      function reject() {
        rejected = true;
      }

      function invoke(setter) {
        setter(GSG.shadow, arg, reject);
      }

      setters.forEach(invoke);

      GSG.shadow = rejected ? GSG.shadow : arg;
    };
  }

  GSG = function (obj, prop) {
    if (!(this instanceof GSG)) {
      return new GSG(obj, prop);
    }

    if (obj.constructor === String) {
      prop = obj;
      obj = global;
    }

    var config, definition = findLog(obj, prop);

    if (definition) {
      return definition;
    }

    log(obj, prop, this);

    this.getters = [];
    this.setters = [];
    this.obj = obj;
    this.prop = prop;
    this.shadow = this.obj[prop];

    config = new Config(this.getters, this.setters, this);
    Object.defineProperty(this.obj, this.prop, config);
  };

  GSG.prototype = {

    get: function (cb) {
      if (typeof cb === 'function') {
        this.getters.push(cb);
      }
      return this;
    },
    set: function (cb) {
      if (typeof cb === 'function') {
        this.setters.push(cb);
      }
      return this;
    }
  };
}.call(this));
