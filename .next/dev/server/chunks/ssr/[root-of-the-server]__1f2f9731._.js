module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Sites/Holivo/store/useStore.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StoreProvider",
    ()=>StoreProvider,
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Sites/Holivo/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// Global state management using React Context
var __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Sites/Holivo/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const StoreContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
function StoreProvider({ children }) {
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
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
    const [selectedItems, setSelectedItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        flight: null,
        hotel: null,
        car: null
    });
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        flights: [],
        hotels: [],
        cars: [],
        aiHolidays: []
    });
    const updateFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((newFilters)=>{
        setFilters((prev)=>({
                ...prev,
                ...newFilters
            }));
    }, []);
    // Dedicated setters for key search fields (for convenience and clarity)
    const setDepartureAirports = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((departureAirports)=>{
        setFilters((prev)=>({
                ...prev,
                departureAirports
            }));
    }, []);
    const setDestinationMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((destinationMode)=>{
        setFilters((prev)=>({
                ...prev,
                destinationMode
            }));
    }, []);
    const setDestinationText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((destinationText)=>{
        setFilters((prev)=>({
                ...prev,
                destinationText
            }));
    }, []);
    const setCheckInDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((checkInDate)=>{
        setFilters((prev)=>({
                ...prev,
                checkInDate
            }));
    }, []);
    const setCheckOutDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((checkOutDate)=>{
        setFilters((prev)=>({
                ...prev,
                checkOutDate
            }));
    }, []);
    const setNights = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((nights)=>{
        setFilters((prev)=>({
                ...prev,
                nights
            }));
    }, []);
    const setBudgetPerPerson = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((budgetPerPerson)=>{
        setFilters((prev)=>({
                ...prev,
                budgetPerPerson
            }));
    }, []);
    const setTripType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((tripType)=>{
        setFilters((prev)=>({
                ...prev,
                tripType
            }));
    }, []);
    const setFlightTripType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((flightTripType)=>{
        setFilters((prev)=>({
                ...prev,
                flightTripType
            }));
    }, []);
    const setAiBrief = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((aiBrief)=>{
        setFilters((prev)=>({
                ...prev,
                aiBrief
            }));
    }, []);
    const setAdults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((adults)=>{
        setFilters((prev)=>({
                ...prev,
                adults
            }));
    }, []);
    const setChildren = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((children)=>{
        setFilters((prev)=>({
                ...prev,
                children
            }));
    }, []);
    const setRooms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((rooms)=>{
        setFilters((prev)=>({
                ...prev,
                rooms
            }));
    }, []);
    const addRecentDestination = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((destination)=>{
        if (!destination) return;
        setFilters((prev)=>{
            const existing = Array.isArray(prev.recentDestinations) ? prev.recentDestinations : [];
            const next = [
                destination,
                ...existing.filter((d)=>d !== destination)
            ].slice(0, 5);
            return {
                ...prev,
                recentDestinations: next
            };
        });
    }, []);
    const selectItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((type, item)=>{
        setSelectedItems((prev)=>({
                ...prev,
                [type]: item
            }));
    }, []);
    const setSelectedFlight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((flight)=>{
        setSelectedItems((prev)=>({
                ...prev,
                flight
            }));
    }, []);
    const setSelectedHotel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((hotel)=>{
        setSelectedItems((prev)=>({
                ...prev,
                hotel
            }));
    }, []);
    const updateSearchResults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((type, results)=>{
        setSearchResults((prev)=>({
                ...prev,
                [type]: results
            }));
    }, []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
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
        }), [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StoreContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/Sites/Holivo/store/useStore.js",
        lineNumber: 189,
        columnNumber: 5
    }, this);
}
function useStore() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Sites$2f$Holivo$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
}
}),
"[project]/Sites/Holivo/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/Sites/Holivo/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Sites/Holivo/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/Sites/Holivo/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Sites/Holivo/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1f2f9731._.js.map