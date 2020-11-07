'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var react = require('react');
var vega = require('vega');
var vegaLite = require('vega-lite');
var vegaTooltip = _interopDefault(require('vega-tooltip'));
var warning = _interopDefault(require('tiny-warning'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var GrammerType;

(function (GrammerType) {
  GrammerType["VEGA"] = "vega";
  GrammerType["VEGA_LITE"] = "vega-lite";
})(GrammerType || (GrammerType = {}));

var DEFAULT_OPTIONS = {
  hover: true,
  renderer: 'canvas'
};
var updateVegaView = function updateVegaView(viewReference, vlSpec,
/*vegaSpec?: Spec, vegaConfig: Config = {},*/
overrideOptions, grammer) {
  if (overrideOptions === void 0) {
    overrideOptions = {};
  }

  if (grammer === void 0) {
    grammer = GrammerType.VEGA_LITE;
  }

  if (!viewReference || !viewReference.current || !vlSpec) return;

  var opts = _extends({}, DEFAULT_OPTIONS, overrideOptions, {
    container: viewReference.current
  }); // vegaParse()
  // const spec = vlSpec ? vlCompile(vlSpec).spec : vegaSpec


  var spec = grammer === GrammerType.VEGA_LITE ? vegaLite.compile(vlSpec).spec : vlSpec; // invariant(!spec, 'Vega lite or vega spec must be defined')
  // const config = vlSpec ? vlSpec.config : vegaConfig
  // @ts-ignore

  var runtime = vega.parse(spec, vlSpec.config);
  var view = new vega.View(runtime, opts);
  vegaTooltip(view);
  return view;
};

var useRefState = function useRefState(initialState) {
  var _useState = react.useState(initialState),
      firstState = _useState[0],
      _setState = _useState[1];

  var latestState = react.useRef(firstState);
  var setState = react.useCallback(function (nextState) {
    latestState.current = nextState;

    _setState(nextState);
  }, []);
  return [latestState, setState];
};

var isView = function isView(view) {
  return !!view && !!(view == null ? void 0 : view.addDataListener);
};

var safeUpdateView = function safeUpdateView(visualization, ref, spec, opts, grammer) {
  if (opts === void 0) {
    opts = {};
  }

  var view = undefined;

  try {
    view = updateVegaView(ref, spec, opts, grammer);
  } catch (err) {
     warning(true, err) ;
    return err;
  }

  if (isView(view)) {
    visualization.current = view;
    return false;
  }

  return new Error('Could not load view');
};

var validateData = function validateData(spec) {
  return !!(spec.data && spec.data.url || !Array.isArray(spec == null ? void 0 : spec.data) && (spec == null ? void 0 : spec.data.values) || Array.isArray(spec == null ? void 0 : spec.data) && (spec == null ? void 0 : spec.data.length) > 0 && (spec == null ? void 0 : spec.data[0].name));
};

var useVega = function useVega(initialSpec, opts) {
  var _useRefState = useRefState(null),
      vegaWrapperRef = _useRefState[0],
      setWrapperRef = _useRefState[1];

  var currentSpec = react.useRef(initialSpec);
  var visualization = react.useRef(null); // const forceUpdate = useForceUpdate()

  var _useRefState2 = useRefState(true),
      isLoading = _useRefState2[0],
      setLoading = _useRefState2[1];

  var _useRefState3 = useRefState(false),
      noData = _useRefState3[0],
      setNoData = _useRefState3[1];

  var _useState = react.useState(null),
      error = _useState[0],
      setError = _useState[1];

  var updateView = react.useCallback(function (spec) {
    if (!vegaWrapperRef) {
      return;
    }

    if (visualization.current) {
      visualization.current.finalize();
      visualization.current = null;
    }

    var isValid = validateData(spec);

    if (!isValid) {
      setNoData(true);
    } else {
      var _error = safeUpdateView(visualization, vegaWrapperRef, spec, opts ? opts.overrides : {}, (opts == null ? void 0 : opts.grammer) || GrammerType.VEGA_LITE);

      if (!_error) {
        setNoData(false);
        setError(null);
      } else {
        setError(_error);
      }
    }

    setLoading(false);
  }, [setLoading, vegaWrapperRef, opts, setNoData]);
  var updateContainer = react.useCallback(function (elementRef) {
    if (!elementRef) {
      return;
    }

    setWrapperRef(elementRef);
  }, [setWrapperRef]);
  react.useEffect(function () {
    if (!vegaWrapperRef.current) {
      return;
    }

    updateView(currentSpec.current || initialSpec);
    return function () {
      if (visualization.current) {
        visualization.current.finalize();
      }
    };
  }, [vegaWrapperRef, initialSpec, updateView]);
  return {
    ref: vegaWrapperRef,
    view: visualization,
    updateView: updateView,
    isLoading: isLoading.current,
    noData: noData.current,
    error: error,
    updateContainer: updateContainer
  };
};

exports.useVega = useVega;
//# sourceMappingURL=use-vega.cjs.development.js.map
