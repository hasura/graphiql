/** @license React v16.5.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';
(function(D, k) {
  'object' === typeof exports && 'undefined' !== typeof module
    ? (module.exports = k())
    : 'function' === typeof define && define.amd
      ? define(k)
      : (D.React = k());
})(this, function() {
  function D(a, b, c, d, g, na, e, h) {
    if (!a) {
      a = void 0;
      if (void 0 === b)
        a = Error(
          'Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.',
        );
      else {
        var f = [c, d, g, na, e, h],
          oa = 0;
        a = Error(
          b.replace(/%s/g, function() {
            return f[oa++];
          }),
        );
        a.name = 'Invariant Violation';
      }
      a.framesToPop = 1;
      throw a;
    }
  }
  function k(a) {
    for (
      var b = arguments.length - 1,
        c = 'https://reactjs.org/docs/error-decoder.html?invariant=' + a,
        d = 0;
      d < b;
      d++
    )
      c += '&args[]=' + encodeURIComponent(arguments[d + 1]);
    D(
      !1,
      'Minified React error #' +
        a +
        '; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ',
      c,
    );
  }
  function p(a, b, c) {
    this.props = a;
    this.context = b;
    this.refs = S;
    this.updater = c || T;
  }
  function U() {}
  function E(a, b, c) {
    this.props = a;
    this.context = b;
    this.refs = S;
    this.updater = c || T;
  }
  function F() {
    if (!G) {
      var a = e.timesOutAt;
      H ? I() : (H = !0);
      J(pa, a);
    }
  }
  function V(a) {
    a = e;
    var b = e.next;
    if (e === b) e = null;
    else {
      var c = e.previous;
      e = c.next = b;
      b.previous = c;
    }
    a.next = a.previous = null;
    a = a.callback;
    a(W);
  }
  function pa(a) {
    G = !0;
    W.didTimeout = a;
    try {
      if (a)
        for (; null !== e; ) {
          var b = m();
          if (e.timesOutAt <= b) {
            do V();
            while (null !== e && e.timesOutAt <= b);
          } else break;
        }
      else if (null !== e) {
        do V();
        while (null !== e && 0 < q() - m());
      }
    } finally {
      (G = !1), null !== e ? F(e) : (H = !1);
    }
  }
  function X(a, b, c) {
    var d = void 0,
      g = {},
      e = null,
      f = null;
    if (null != b)
      for (d in (void 0 !== b.ref && (f = b.ref),
      void 0 !== b.key && (e = '' + b.key),
      b))
        Y.call(b, d) && !Z.hasOwnProperty(d) && (g[d] = b[d]);
    var h = arguments.length - 2;
    if (1 === h) g.children = c;
    else if (1 < h) {
      for (var k = Array(h), n = 0; n < h; n++) k[n] = arguments[n + 2];
      g.children = k;
    }
    if (a && a.defaultProps)
      for (d in ((h = a.defaultProps), h)) void 0 === g[d] && (g[d] = h[d]);
    return {
      $$typeof: r,
      type: a,
      key: e,
      ref: f,
      props: g,
      _owner: w.current,
    };
  }
  function qa(a, b) {
    return {
      $$typeof: r,
      type: a.type,
      key: b,
      ref: a.ref,
      props: a.props,
      _owner: a._owner,
    };
  }
  function K(a) {
    return 'object' === typeof a && null !== a && a.$$typeof === r;
  }
  function ra(a) {
    var b = { '=': '=0', ':': '=2' };
    return (
      '$' +
      ('' + a).replace(/[=:]/g, function(a) {
        return b[a];
      })
    );
  }
  function aa(a, b, c, d) {
    if (x.length) {
      var g = x.pop();
      g.result = a;
      g.keyPrefix = b;
      g.func = c;
      g.context = d;
      g.count = 0;
      return g;
    }
    return { result: a, keyPrefix: b, func: c, context: d, count: 0 };
  }
  function ba(a) {
    a.result = null;
    a.keyPrefix = null;
    a.func = null;
    a.context = null;
    a.count = 0;
    10 > x.length && x.push(a);
  }
  function L(a, b, c, d) {
    var g = typeof a;
    if ('undefined' === g || 'boolean' === g) a = null;
    var e = !1;
    if (null === a) e = !0;
    else
      switch (g) {
        case 'string':
        case 'number':
          e = !0;
          break;
        case 'object':
          switch (a.$$typeof) {
            case r:
            case sa:
              e = !0;
          }
      }
    if (e) return c(d, a, '' === b ? '.' + M(a, 0) : b), 1;
    e = 0;
    b = '' === b ? '.' : b + ':';
    if (Array.isArray(a))
      for (var f = 0; f < a.length; f++) {
        g = a[f];
        var h = b + M(g, f);
        e += L(g, h, c, d);
      }
    else if (
      (null === a || 'object' !== typeof a
        ? (h = null)
        : ((h = (ca && a[ca]) || a['@@iterator']),
          (h = 'function' === typeof h ? h : null)),
      'function' === typeof h)
    )
      for (a = h.call(a), f = 0; !(g = a.next()).done; )
        (g = g.value), (h = b + M(g, f++)), (e += L(g, h, c, d));
    else
      'object' === g &&
        ((c = '' + a),
        k(
          '31',
          '[object Object]' === c
            ? 'object with keys {' + Object.keys(a).join(', ') + '}'
            : c,
          '',
        ));
    return e;
  }
  function N(a, b, c) {
    return null == a ? 0 : L(a, '', b, c);
  }
  function M(a, b) {
    return 'object' === typeof a && null !== a && null != a.key
      ? ra(a.key)
      : b.toString(36);
  }
  function ta(a, b, c) {
    a.func.call(a.context, b, a.count++);
  }
  function ua(a, b, c) {
    var d = a.result,
      e = a.keyPrefix;
    a = a.func.call(a.context, b, a.count++);
    Array.isArray(a)
      ? O(a, d, c, function(a) {
          return a;
        })
      : null != a &&
        (K(a) &&
          (a = qa(
            a,
            e +
              (!a.key || (b && b.key === a.key)
                ? ''
                : ('' + a.key).replace(da, '$&/') + '/') +
              c,
          )),
        d.push(a));
  }
  function O(a, b, c, d, e) {
    var g = '';
    null != c && (g = ('' + c).replace(da, '$&/') + '/');
    b = aa(b, g, d, e);
    N(a, ua, b);
    ba(b);
  }
  function va(a, b) {
    var c = w.currentDispatcher;
    null === c ? k('277') : void 0;
    return c.readContext(a, b);
  }
  var f = 'function' === typeof Symbol && Symbol.for,
    r = f ? Symbol.for('react.element') : 60103,
    sa = f ? Symbol.for('react.portal') : 60106,
    l = f ? Symbol.for('react.fragment') : 60107,
    P = f ? Symbol.for('react.strict_mode') : 60108,
    wa = f ? Symbol.for('react.profiler') : 60114,
    xa = f ? Symbol.for('react.provider') : 60109,
    ya = f ? Symbol.for('react.context') : 60110,
    za = f ? Symbol.for('react.async_mode') : 60111,
    Aa = f ? Symbol.for('react.forward_ref') : 60112;
  f && Symbol.for('react.placeholder');
  var ca = 'function' === typeof Symbol && Symbol.iterator,
    ea = Object.getOwnPropertySymbols,
    Ba = Object.prototype.hasOwnProperty,
    Ca = Object.prototype.propertyIsEnumerable,
    y = (function() {
      try {
        if (!Object.assign) return !1;
        var a = new String('abc');
        a[5] = 'de';
        if ('5' === Object.getOwnPropertyNames(a)[0]) return !1;
        var b = {};
        for (a = 0; 10 > a; a++) b['_' + String.fromCharCode(a)] = a;
        if (
          '0123456789' !==
          Object.getOwnPropertyNames(b)
            .map(function(a) {
              return b[a];
            })
            .join('')
        )
          return !1;
        var c = {};
        'abcdefghijklmnopqrst'.split('').forEach(function(a) {
          c[a] = a;
        });
        return 'abcdefghijklmnopqrst' !==
          Object.keys(Object.assign({}, c)).join('')
          ? !1
          : !0;
      } catch (d) {
        return !1;
      }
    })()
      ? Object.assign
      : function(a, b) {
          if (null === a || void 0 === a)
            throw new TypeError(
              'Object.assign cannot be called with null or undefined',
            );
          var c = Object(a);
          for (var d, e = 1; e < arguments.length; e++) {
            var f = Object(arguments[e]);
            for (var k in f) Ba.call(f, k) && (c[k] = f[k]);
            if (ea) {
              d = ea(f);
              for (var h = 0; h < d.length; h++)
                Ca.call(f, d[h]) && (c[d[h]] = f[d[h]]);
            }
          }
          return c;
        },
    T = {
      isMounted: function(a) {
        return !1;
      },
      enqueueForceUpdate: function(a, b, c) {},
      enqueueReplaceState: function(a, b, c, d) {},
      enqueueSetState: function(a, b, c, d) {},
    },
    S = {};
  p.prototype.isReactComponent = {};
  p.prototype.setState = function(a, b) {
    'object' !== typeof a && 'function' !== typeof a && null != a
      ? k('85')
      : void 0;
    this.updater.enqueueSetState(this, a, b, 'setState');
  };
  p.prototype.forceUpdate = function(a) {
    this.updater.enqueueForceUpdate(this, a, 'forceUpdate');
  };
  U.prototype = p.prototype;
  f = E.prototype = new U();
  f.constructor = E;
  y(f, p.prototype);
  f.isPureReactComponent = !0;
  var e = null,
    G = !1,
    H = !1;
  f = 'object' === typeof performance && 'function' === typeof performance.now;
  var W = {
      timeRemaining: f
        ? function() {
            var a = q() - performance.now();
            return 0 < a ? a : 0;
          }
        : function() {
            var a = q() - Date.now();
            return 0 < a ? a : 0;
          },
      didTimeout: !1,
    },
    Da = Date,
    Ea = 'function' === typeof setTimeout ? setTimeout : void 0,
    Fa = 'function' === typeof clearTimeout ? clearTimeout : void 0,
    fa =
      'function' === typeof requestAnimationFrame
        ? requestAnimationFrame
        : void 0,
    ha =
      'function' === typeof cancelAnimationFrame
        ? cancelAnimationFrame
        : void 0,
    ia,
    ja,
    ka = function(a) {
      ia = fa(function(b) {
        Fa(ja);
        a(b);
      });
      ja = Ea(function() {
        ha(ia);
        a(m());
      }, 100);
    };
  if (f) {
    var Ga = performance;
    var m = function() {
      return Ga.now();
    };
  } else
    m = function() {
      return Da.now();
    };
  if ('undefined' === typeof window) {
    var la = -1;
    var J = function(a, b) {
      la = setTimeout(a, 0, !0);
    };
    var I = function() {
      clearTimeout(la);
    };
    var q = function() {
      return 0;
    };
  } else if (window._schedMock)
    (f = window._schedMock), (J = f[0]), (I = f[1]), (q = f[2]);
  else {
    'undefined' !== typeof console &&
      ('function' !== typeof fa &&
        console.error(
          "This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills",
        ),
      'function' !== typeof ha &&
        console.error(
          "This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills",
        ));
    var z = null,
      A = !1,
      t = -1,
      u = !1,
      Q = !1,
      B = 0,
      C = 33,
      v = 33;
    q = function() {
      return B;
    };
    var R =
      '__reactIdleCallback$' +
      Math.random()
        .toString(36)
        .slice(2);
    window.addEventListener(
      'message',
      function(a) {
        if (a.source === window && a.data === R) {
          A = !1;
          var b = m();
          a = !1;
          if (0 >= B - b)
            if (-1 !== t && t <= b) a = !0;
            else {
              u || ((u = !0), ka(ma));
              return;
            }
          t = -1;
          b = z;
          z = null;
          if (null !== b) {
            Q = !0;
            try {
              b(a);
            } finally {
              Q = !1;
            }
          }
        }
      },
      !1,
    );
    var ma = function(a) {
      u = !1;
      var b = a - B + v;
      b < v && C < v ? (8 > b && (b = 8), (v = b < C ? C : b)) : (C = b);
      B = a + v;
      A || ((A = !0), window.postMessage(R, '*'));
    };
    J = function(a, b) {
      z = a;
      t = b;
      Q ? window.postMessage(R, '*') : u || ((u = !0), ka(ma));
    };
    I = function() {
      z = null;
      A = !1;
      t = -1;
    };
  }
  var Ha = 0,
    w = { current: null, currentDispatcher: null };
  f = { ReactCurrentOwner: w, assign: y };
  y(f, {
    Schedule: {
      unstable_cancelScheduledWork: function(a) {
        var b = a.next;
        if (null !== b) {
          if (b === a) e = null;
          else {
            a === e && (e = b);
            var c = a.previous;
            c.next = b;
            b.previous = c;
          }
          a.next = a.previous = null;
        }
      },
      unstable_now: m,
      unstable_scheduleWork: function(a, b) {
        var c = m();
        b =
          void 0 !== b &&
          null !== b &&
          null !== b.timeout &&
          void 0 !== b.timeout
            ? c + b.timeout
            : c + 5e3;
        a = { callback: a, timesOutAt: b, next: null, previous: null };
        if (null === e) (e = a.next = a.previous = a), F(e);
        else {
          c = null;
          var d = e;
          do {
            if (d.timesOutAt > b) {
              c = d;
              break;
            }
            d = d.next;
          } while (d !== e);
          null === c ? (c = e) : c === e && ((e = a), F(e));
          b = c.previous;
          b.next = c.previous = a;
          a.next = c;
          a.previous = b;
        }
        return a;
      },
    },
    ScheduleTracing: {
      __interactionsRef: null,
      __subscriberRef: null,
      unstable_clear: function(a) {
        return a();
      },
      unstable_getCurrent: function() {
        return null;
      },
      unstable_getThreadID: function() {
        return ++Ha;
      },
      unstable_subscribe: function(a) {},
      unstable_trace: function(a, b, c) {
        return c();
      },
      unstable_unsubscribe: function(a) {},
      unstable_wrap: function(a) {
        return a;
      },
    },
  });
  var Y = Object.prototype.hasOwnProperty,
    Z = { key: !0, ref: !0, __self: !0, __source: !0 },
    da = /\/+/g,
    x = [];
  l = {
    Children: {
      map: function(a, b, c) {
        if (null == a) return a;
        var d = [];
        O(a, d, null, b, c);
        return d;
      },
      forEach: function(a, b, c) {
        if (null == a) return a;
        b = aa(null, null, b, c);
        N(a, ta, b);
        ba(b);
      },
      count: function(a) {
        return N(
          a,
          function() {
            return null;
          },
          null,
        );
      },
      toArray: function(a) {
        var b = [];
        O(a, b, null, function(a) {
          return a;
        });
        return b;
      },
      only: function(a) {
        K(a) ? void 0 : k('143');
        return a;
      },
    },
    createRef: function() {
      return { current: null };
    },
    Component: p,
    PureComponent: E,
    createContext: function(a, b) {
      void 0 === b && (b = null);
      a = {
        $$typeof: ya,
        _calculateChangedBits: b,
        _currentValue: a,
        _currentValue2: a,
        Provider: null,
        Consumer: null,
        unstable_read: null,
      };
      a.Provider = { $$typeof: xa, _context: a };
      a.Consumer = a;
      a.unstable_read = va.bind(null, a);
      return a;
    },
    forwardRef: function(a) {
      return {
        $$typeof: Aa,
        render: a,
      };
    },
    Fragment: l,
    StrictMode: P,
    unstable_AsyncMode: za,
    unstable_Profiler: wa,
    createElement: X,
    cloneElement: function(a, b, c) {
      null === a || void 0 === a ? k('267', a) : void 0;
      var d = void 0,
        e = y({}, a.props),
        f = a.key,
        m = a.ref,
        h = a._owner;
      if (null != b) {
        void 0 !== b.ref && ((m = b.ref), (h = w.current));
        void 0 !== b.key && (f = '' + b.key);
        var l = void 0;
        a.type && a.type.defaultProps && (l = a.type.defaultProps);
        for (d in b)
          Y.call(b, d) &&
            !Z.hasOwnProperty(d) &&
            (e[d] = void 0 === b[d] && void 0 !== l ? l[d] : b[d]);
      }
      d = arguments.length - 2;
      if (1 === d) e.children = c;
      else if (1 < d) {
        l = Array(d);
        for (var n = 0; n < d; n++) l[n] = arguments[n + 2];
        e.children = l;
      }
      return { $$typeof: r, type: a.type, key: f, ref: m, props: e, _owner: h };
    },
    createFactory: function(a) {
      var b = X.bind(null, a);
      b.type = a;
      return b;
    },
    isValidElement: K,
    version: '16.5.2',
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: f,
  };
  l = ((P = { default: l }), l) || P;
  return l.default || l;
});
