(function () {
  var Config = function(get, set, tether) {
    this.get = function () {
      return tether.shadow;
    };
    this.set = function (arg) {
      return tether.shadow = arg;
    };

    if (get) {
      this.get = function () {
        get();
        return tether.shadow;
      };
    }

    if (set) {
      this.set = function (arg) {
        set(arg);
        return tether.shadow = arg;
      };
    }
  };

  var Tether = function(target, prop) {

    this.target = target;
    this.getter = null;
    this.setter = null;
    
    this.shadow = this.target[prop];
    this.prop = prop;
  }
  Tether.prototype.to = function(vars) {
    if (vars.get) {
      this.getter = vars.get;
    }
    if (vars.set) {
      this.setter = vars.set;
    }

    Object.defineProperty(this.target,
        this.prop,
        new Config(this.getter, this.setter, this));

    return this;
  }
  this.Tether = Tether;
}).call(this);