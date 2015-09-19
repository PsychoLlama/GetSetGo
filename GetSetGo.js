var GSG;

(function () {
  'use strict';

  var global = this,
    cached = [],
    log = function (obj, prop, watcher) {
      var entry = {
        obj: obj,
        prop: prop,
        watcher: watcher
      };

      cached.push(entry);
      return false;
    },
    findLog = function (obj, prop) {
      var logged,
        i;

      for (i = 0; i < cached.length; i += 1) {
        logged = cached[i];

        if (logged.obj === obj) {
          if (logged.prop === prop) {
            return logged.watcher;
          }
        }
      }

      return null;
    },
    Config = function (getters, setters, GSG) {

      this.get = function () {
        var returnVal;

        getters.forEach(function (getter) {
          var value = getter();

          if (value !== undefined) {
            returnVal = value;
          }
        });

        if (returnVal) {
          return returnVal;
        }

        return GSG.shadow;
      };

      this.set = function (arg) {
        var shouldUpdate = true;

        setters.forEach(function (setter) {
          if (setter(arg) === false) {
            shouldUpdate = false;
          }
        });

        if (shouldUpdate) {
          GSG.shadow = arg;
        }
      };
    };

  GSG = function (target, prop) {
    var definition;

    if (typeof target === 'string') {
      prop = target;
      target = global;
    }
    if (target === undefined) {
      throw new Error("Invalid arguments. Check documentation.");
    }

    definition = findLog(target, prop);

    if (definition) {
      return definition;
    }

    if (this === undefined) {
      return new GSG(target, prop);
    }

    log(target, prop, this);

    this.target = target;
    this.getters = [];
    this.setters = [];

    this.shadow = this.target[prop];
    this.prop = prop;

    Object.defineProperty(this.target,
      this.prop,
      new Config(this.getters, this.setters, this));
  };

  GSG.prototype = {

    get: function (callback) {
      this.getters.push(callback);
      return this;
    },
    set: function (callback) {
      this.setters.push(callback);
      return this;
    }
  };
}.call(this));
