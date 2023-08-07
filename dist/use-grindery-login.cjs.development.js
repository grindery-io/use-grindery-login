'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

var identifyUserInHubspot = function identifyUserInHubspot(userId, email) {
  var _hsq = window._hsq = window._hsq || [];
  _hsq.push(['identify', {
    email: email,
    id: userId
  }]);
};
var identifyUserInLuckyOrange = function identifyUserInLuckyOrange(userId, email) {
  window.LOQ = window.LOQ || [];
  window.LOQ.push(['ready', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(LO) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return LO.$internal.ready('visitor');
          case 2:
            LO.visitor.identify(userId, {
              email: email
            });
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()]);
};

// Grindery Engine URL
var ENGINE_URL = 'https://orchestrator.grindery.org';
// Login page URL
var LOGIN_URL = /*#__PURE__*/window.location.hostname.includes('-staging.grindery') || /*#__PURE__*/window.location.hostname.includes('localhost') || /*#__PURE__*/window.location.hostname.includes('127.0.0.1') ? 'https://login-staging.grindery.io' : 'https://login.grindery.io';
// Default context properties
var defaultContext = {
  token: null,
  address: null,
  user: null,
  isAuthenticating: true,
  connect: function connect() {},
  disconnect: function disconnect() {}
};
/** Grindery Nexus Context */
var GrinderyLoginContext = /*#__PURE__*/React.createContext(defaultContext);
/**
 * The component provides context for user authentication.
 *
 * It manages authentication state (token, user, address),
 * provides connect and disconnect functionality,
 * and listens for updates from a hidden iframe.
 *
 * It also exposes the context via the useGrinderyLogin hook.
 */
var GrinderyLoginProvider = function GrinderyLoginProvider(_ref) {
  var children = _ref.children,
    loader = _ref.loader;
  // Authentication token object
  var _useState = React.useState(null),
    token = _useState[0],
    setToken = _useState[1];
  // User ID
  var _useState2 = React.useState(null),
    user = _useState2[0],
    setUser = _useState2[1];
  // User address
  var _useState3 = React.useState(null),
    address = _useState3[0],
    setAddress = _useState3[1];
  // User authentication loading state
  var _useState4 = React.useState(true),
    isAuthenticating = _useState4[0],
    setIsAuthenticating = _useState4[1];
  // Loading state
  var _React$useState = React__default.useState(true),
    loading = _React$useState[0],
    setLoading = _React$useState[1];
  // Connect user
  var connect = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var currentUrl;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            currentUrl = window.location.href.split('?')[0];
            window.location.href = LOGIN_URL + "?redirect_uri=" + currentUrl;
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function connect() {
      return _ref2.apply(this, arguments);
    };
  }();
  // Disconnect user
  var disconnect = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var _iframe$contentWindow;
      var iframe;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            // get iframe element
            iframe = document.getElementById('grindery-login-iframe'); // send message to iframe
            (_iframe$contentWindow = iframe.contentWindow) == null ? void 0 : _iframe$contentWindow.postMessage({
              method: 'grindery-auth-session-clear'
            }, LOGIN_URL);
            setToken(null);
            setAddress(null);
            setUser(null);
          case 5:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function disconnect() {
      return _ref3.apply(this, arguments);
    };
  }();
  var identifyUser = React.useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var rawResponse, getUserEmailResponse;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!(user && token != null && token.access_token)) {
            _context3.next = 19;
            break;
          }
          _context3.prev = 1;
          _context3.next = 4;
          return fetch("" + ENGINE_URL, {
            method: 'POST',
            headers: {
              Authorization: "Bearer " + token.access_token,
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              jsonrpc: '2.0',
              id: new Date(),
              method: 'or_getUserEmail',
              params: {}
            })
          });
        case 4:
          rawResponse = _context3.sent;
          _context3.next = 7;
          return rawResponse.json();
        case 7:
          getUserEmailResponse = _context3.sent;
          if (!getUserEmailResponse.result) {
            _context3.next = 13;
            break;
          }
          identifyUserInHubspot(user, getUserEmailResponse.result);
          identifyUserInLuckyOrange(user, getUserEmailResponse.result);
          _context3.next = 14;
          break;
        case 13:
          throw new Error('No user email found');
        case 14:
          _context3.next = 19;
          break;
        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](1);
          console.error('identifyUser error: ', _context3.t0);
        case 19:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 16]]);
  })), [user, token]);
  // Listen for messages from the login iframe
  React.useEffect(function () {
    // handle message
    function handleMessage(event) {
      var _event$data;
      if (((_event$data = event.data) == null ? void 0 : _event$data.method) === 'grindery-auth-session') {
        var _event$data2, _event$data4, _event$data5, _event$data6;
        // handle error
        if ((_event$data2 = event.data) != null && _event$data2.error) {
          var _event$data3;
          console.log('grindery-auth-session error: ', (_event$data3 = event.data) == null ? void 0 : _event$data3.error);
        }
        setToken(((_event$data4 = event.data) == null || (_event$data4 = _event$data4.params) == null ? void 0 : _event$data4.token) || null);
        setAddress(((_event$data5 = event.data) == null || (_event$data5 = _event$data5.params) == null ? void 0 : _event$data5.address) || null);
        setUser(((_event$data6 = event.data) == null || (_event$data6 = _event$data6.params) == null ? void 0 : _event$data6.user) || null);
        setIsAuthenticating(false);
      }
    }
    // add event listener
    window.addEventListener('message', handleMessage);
    // remove event listener on unmount
    return function () {
      return window.removeEventListener('message', handleMessage);
    };
  }, []);
  React.useEffect(function () {
    identifyUser();
  }, [identifyUser]);
  React.useEffect(function () {
    if (loader) {
      if (!isAuthenticating) {
        setTimeout(function () {
          if (token != null && token.access_token) {
            setLoading(false);
          } else {
            connect();
          }
        }, 1000);
      }
    }
  }, [token, isAuthenticating, loader, connect]);
  React.useEffect(function () {
    if (loader) {
      if (!(token != null && token.access_token)) {
        setLoading(true);
      }
    }
  }, [token, loader]);
  return React__default.createElement(GrinderyLoginContext.Provider, {
    value: {
      token: token,
      user: user,
      address: address,
      isAuthenticating: isAuthenticating,
      connect: connect,
      disconnect: disconnect
    }
  }, React__default.createElement("iframe", {
    id: "grindery-login-iframe",
    title: "Grindery Login Session",
    src: LOGIN_URL + "/session",
    style: {
      display: 'none'
    }
  }), loading && loader ? loader : children);
};
/** Grindery Login Hook */
var useGrinderyLogin = function useGrinderyLogin() {
  return React.useContext(GrinderyLoginContext);
};

exports.GrinderyLoginContext = GrinderyLoginContext;
exports.GrinderyLoginProvider = GrinderyLoginProvider;
exports.LOGIN_URL = LOGIN_URL;
exports.default = GrinderyLoginProvider;
exports.useGrinderyLogin = useGrinderyLogin;
//# sourceMappingURL=use-grindery-login.cjs.development.js.map
