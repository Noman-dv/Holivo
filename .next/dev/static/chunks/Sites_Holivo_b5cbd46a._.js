(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Sites/Holivo/store/useStore.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StoreProvider",
    ()=>StoreProvider,
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Sites/Holivo/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Global state management using React Context
var __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Sites/Holivo/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const StoreContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])();
function StoreProvider({ children }) {
    _s();
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        // Core flight search fields
        origin: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        passengers: 1,
        travelClass: 'economy',
        // Detailed flight travelers
        flightAdults: 1,
        flightStudents: 0,
        flightSeniors: 0,
        flightYouths: 0,
        flightChildren: 0,
        flightToddlers: 0,
        flightInfants: 0,
        // Phase 1 search state fields
        departureAirports: [],
        destinationMode: 'specific',
        destinationText: '',
        checkInDate: '',
        checkOutDate: '',
        nights: '',
        budgetPerPerson: '',
        tripType: 'holiday',
        flightTripType: 'round-trip',
        aiBrief: '',
        // Travellers (used primarily for hotels)
        adults: 2,
        children: 0,
        rooms: 1,
        // Simple recent destinations list for location dropdowns
        recentDestinations: []
    });
    const [selectedItems, setSelectedItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        flight: null,
        hotel: null,
        car: null
    });
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        flights: [],
        hotels: [],
        cars: [],
        aiHolidays: []
    });
    const updateFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updateFilters]": (newFilters)=>{
            setFilters({
                "StoreProvider.useCallback[updateFilters]": (prev)=>({
                        ...prev,
                        ...newFilters
                    })
            }["StoreProvider.useCallback[updateFilters]"]);
        }
    }["StoreProvider.useCallback[updateFilters]"], []);
    // Dedicated setters for key search fields (for convenience and clarity)
    const setDepartureAirports = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[setDepartureAirports]": (departureAirports)=>{
            setFilters({
                "StoreProvider.useCallback[setDepartureAirports]": (prev)=>({
                        ...prev,
                        departureAirports
                    })
            }["StoreProvider.useCallback[setDepartureAirports]"]);
        }
    }["StoreProvider.useCallback[setDepartureAirports]"], []);
    const setDestinationMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[setDestinationMode]": (destinationMode)=>{
            setFilters({
                "StoreProvider.useCallback[setDestinationMode]": (prev)=>({
                        ...prev,
                        destinationMode
                    })
            }["StoreProvider.useCallback[setDestinationMode]"]);
        }
    }["StoreProvider.useCallback[setDestinationMode]"], []);
    const setDestinationText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[setDestinationText]": (destinationText)=>{
            setFilters({
                "StoreProvider.useCallback[setDestinationText]": (prev)=>({
                        ...prev,
                        destinationText
                    })
            }["StoreProvider.useCallback[setDestinationText]"]);
        }
    }["StoreProvider.useCallback[setDestinationText]"], []);
    const setCheckInDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[setCheckInDate]": (checkInDate)=>{
            setFilters({
                "StoreProvider.useCallback[setCheckInDate]": (prev)=>({
                        ...prev,
                        checkInDate
                    })
            }["StoreProvider.useCallback[setCheckInDate]"]);
        }
    }["StoreProvider.useCallback[setCheckInDate]"], []);
    const setCheckOutDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[setCheckOutDate]": (checkOutDate)=>{
            setFilters({
                "StoreProvider.useCallback[setCheckOutDate]": (prev)=>({
                        ...prev,
                        checkOutDate
                    })
            }["StoreProvider.useCallback[setCheckOutDate]"]);
        }
    }["StoreProvider.useCallback[setCheckOutDate]"], []);
    const setNights = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[setNights]": (nights)=>{
            setFilters({
                "StoreProvider.useCallback[setNights]": (prev)=>({
                        ...prev,
                        nights
                    })
            }["StoreProvider.useCallback[setNights]"]);
        }
    }["StoreProvider.useCallback[setNights]"], []);
    const setBudgetPerPerson = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[setBudgetPerPerson]": (budgetPerPerson)=>{
            setFilters({
                "StoreProvider.useCallback[setBudgetPerPerson]": (prev)=>({
                        ...prev,
                        budgetPerPerson
                    })
            }["StoreProvider.useCallback[setBudgetPerPerson]"]);
        }
    }["StoreProvider.useCallback[setBudgetPerPerson]"], []);
    const setTripType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[setTripType]": (tripType)=>{
            setFilters({
                "StoreProvider.useCallback[setTripType]": (prev)=>({
                        ...prev,
                        tripType
                    })
            }["StoreProvider.useCallback[setTripType]"]);
        }
    }["StoreProvider.useCallback[setTripType]"], []);
    const setFlightTripType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[setFlightTripType]": (flightTripType)=>{
            setFilters({
                "StoreProvider.useCallback[setFlightTripType]": (prev)=>({
                        ...prev,
                        flightTripType
                    })
            }["StoreProvider.useCallback[setFlightTripType]"]);
        }
    }["StoreProvider.useCallback[setFlightTripType]"], []);
    const setAiBrief = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[setAiBrief]": (aiBrief)=>{
            setFilters({
                "StoreProvider.useCallback[setAiBrief]": (prev)=>({
                        ...prev,
                        aiBrief
                    })
            }["StoreProvider.useCallback[setAiBrief]"]);
        }
    }["StoreProvider.useCallback[setAiBrief]"], []);
    const setAdults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[setAdults]": (adults)=>{
            setFilters({
                "StoreProvider.useCallback[setAdults]": (prev)=>({
                        ...prev,
                        adults
                    })
            }["StoreProvider.useCallback[setAdults]"]);
        }
    }["StoreProvider.useCallback[setAdults]"], []);
    const setChildren = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[setChildren]": (children)=>{
            setFilters({
                "StoreProvider.useCallback[setChildren]": (prev)=>({
                        ...prev,
                        children
                    })
            }["StoreProvider.useCallback[setChildren]"]);
        }
    }["StoreProvider.useCallback[setChildren]"], []);
    const setRooms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[setRooms]": (rooms)=>{
            setFilters({
                "StoreProvider.useCallback[setRooms]": (prev)=>({
                        ...prev,
                        rooms
                    })
            }["StoreProvider.useCallback[setRooms]"]);
        }
    }["StoreProvider.useCallback[setRooms]"], []);
    const addRecentDestination = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addRecentDestination]": (destination)=>{
            if (!destination) return;
            setFilters({
                "StoreProvider.useCallback[addRecentDestination]": (prev)=>{
                    const existing = Array.isArray(prev.recentDestinations) ? prev.recentDestinations : [];
                    const next = [
                        destination,
                        ...existing.filter({
                            "StoreProvider.useCallback[addRecentDestination].next": (d)=>d !== destination
                        }["StoreProvider.useCallback[addRecentDestination].next"])
                    ].slice(0, 5);
                    return {
                        ...prev,
                        recentDestinations: next
                    };
                }
            }["StoreProvider.useCallback[addRecentDestination]"]);
        }
    }["StoreProvider.useCallback[addRecentDestination]"], []);
    const selectItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[selectItem]": (type, item)=>{
            setSelectedItems({
                "StoreProvider.useCallback[selectItem]": (prev)=>({
                        ...prev,
                        [type]: item
                    })
            }["StoreProvider.useCallback[selectItem]"]);
        }
    }["StoreProvider.useCallback[selectItem]"], []);
    const setSelectedFlight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[setSelectedFlight]": (flight)=>{
            setSelectedItems({
                "StoreProvider.useCallback[setSelectedFlight]": (prev)=>({
                        ...prev,
                        flight
                    })
            }["StoreProvider.useCallback[setSelectedFlight]"]);
        }
    }["StoreProvider.useCallback[setSelectedFlight]"], []);
    const setSelectedHotel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[setSelectedHotel]": (hotel)=>{
            setSelectedItems({
                "StoreProvider.useCallback[setSelectedHotel]": (prev)=>({
                        ...prev,
                        hotel
                    })
            }["StoreProvider.useCallback[setSelectedHotel]"]);
        }
    }["StoreProvider.useCallback[setSelectedHotel]"], []);
    const updateSearchResults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updateSearchResults]": (type, results)=>{
            setSearchResults({
                "StoreProvider.useCallback[updateSearchResults]": (prev)=>({
                        ...prev,
                        [type]: results
                    })
            }["StoreProvider.useCallback[updateSearchResults]"]);
        }
    }["StoreProvider.useCallback[updateSearchResults]"], []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StoreProvider.useMemo[value]": ()=>({
                filters,
                updateFilters,
                setDepartureAirports,
                setDestinationMode,
                setDestinationText,
                setCheckInDate,
                setCheckOutDate,
                setNights,
                setBudgetPerPerson,
                setTripType,
                setFlightTripType,
                setAiBrief,
                setAdults,
                setChildren,
                setRooms,
                addRecentDestination,
                selectedItems,
                selectItem,
                setSelectedFlight,
                setSelectedHotel,
                searchResults,
                updateSearchResults
            })
    }["StoreProvider.useMemo[value]"], [
        filters,
        selectedItems,
        searchResults,
        updateFilters,
        setDepartureAirports,
        setDestinationMode,
        setDestinationText,
        setCheckInDate,
        setCheckOutDate,
        setNights,
        setBudgetPerPerson,
        setTripType,
        setFlightTripType,
        setAiBrief,
        setAdults,
        setChildren,
        setRooms,
        addRecentDestination,
        selectItem,
        setSelectedFlight,
        setSelectedHotel,
        updateSearchResults
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StoreContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/Sites/Holivo/store/useStore.js",
        lineNumber: 189,
        columnNumber: 5
    }, this);
}
_s(StoreProvider, "NK8c+Q6LQMjj1G1WZewAoUPhoEQ=");
_c = StoreProvider;
function useStore() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
}
_s1(useStore, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "StoreProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Sites/Holivo/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Sites/Holivo/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/Sites/Holivo/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/Sites/Holivo/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Sites/Holivo/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Sites/Holivo/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=Sites_Holivo_b5cbd46a._.js.map