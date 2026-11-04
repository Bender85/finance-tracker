(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/api/axiosClient.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__import$2e$meta__ = {
    get url () {
        return __turbopack_context__.F("src/api/axiosClient.ts");
    },
    env: {
        DEV: true,
        PROD: false,
        MODE: "development",
        BASE_URL: "/",
        SSR: false
    },
    get turbopackHot () {
        return __turbopack_context__.m.hot;
    }
};
;
const baseUrl = __TURBOPACK__import$2e$meta__.env.VITE_API_URL || 'http://localhost:8000/api/v1';
const axiosClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});
// 1. Перехоплювач запитів (додає токен)
axiosClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error)=>Promise.reject(error));
// 🌟 2. МАГІЯ ВИКИДАННЯ ПРИ ЕКСПІРАЦІЇ: Перехоплювач відповідей
axiosClient.interceptors.response.use((response)=>response, (error)=>{
    // Якщо сервер повернув 401 (токен заекспайрився або злетів)
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('token'); // Вичищаємо мертвий токен
        // Надійний спосіб перенаправлення на сторінку логіну з будь-якої точки додатку
        if (("TURBOPACK compile-time value", "object") !== 'undefined' && window.location.pathname !== '/auth') {
            window.location.href = '/auth';
        }
    }
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = axiosClient;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/api/services/accounts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "accountsService",
    ()=>accountsService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/axiosClient.ts [app-client] (ecmascript)");
;
const accountsService = {
    // Отримати всі рахунки поточного юзера
    getAll: async ()=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/accounts/');
        return response.data;
    },
    // Створити новий рахунок
    create: async (account)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/accounts/', account);
        return response.data;
    },
    // Зробити переказ між рахунками
    transfer: async (transferData)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/accounts/transfer', transferData);
        return response.data;
    },
    // Видалити рахунок
    delete: async (accountId)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/accounts/${accountId}`);
        return response.data;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/api/services/transactions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transactionsService",
    ()=>transactionsService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/axiosClient.ts [app-client] (ecmascript)");
;
const transactionsService = {
    // Отримати історію з фільтрами
    getAll: async (filters)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/transactions/', {
            params: filters
        });
        return response.data;
    },
    // Створити транзакцію
    create: async (transaction)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/transactions/', transaction);
        return response.data;
    },
    // Видалити транзакцію
    delete: async (transactionId)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/transactions/${transactionId}`);
        return response.data;
    },
    // Отримати посилання на скачування CSV-звіту
    getExportUrl: ()=>{
        const token = localStorage.getItem('finance_token');
        return `http://localhost:8000/api/v1/transactions/export?token=${token}`;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/api/transactions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteAccount",
    ()=>deleteAccount,
    "setCategoryBudget",
    ()=>setCategoryBudget,
    "updateAccount",
    ()=>updateAccount
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/axiosClient.ts [app-client] (ecmascript)"); // Перевір точний шлях до твого axiosClient у проекті
;
const deleteAccount = async (accountId)=>{
    // axiosClient сам знає, де лежить токен, і правильно додає його в Headers
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/accounts/${accountId}`);
    return response.data;
};
const updateAccount = async (accountId, payload)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`/accounts/${accountId}`, payload);
    return response.data;
};
const setCategoryBudget = async (payload)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/transactions/budget', payload);
    return response.data;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AccountSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AnalyticsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AnalyticsSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TransactionSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/TransactionSection.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function DashboardPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            const token = localStorage.getItem('token');
            if (!token) {
                // Якщо токена немає — миттєво відправляємо на вхід
                router.push('/auth');
            } else {
                setIsAuthenticated(true);
            }
        }
    }["DashboardPage.useEffect"], [
        router
    ]);
    // Поки йде перевірка localStorage, показуємо нейтральний екран завантаження
    if (isAuthenticated === null) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm italic",
            children: "Перевірка фінансової сесії..."
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-slate-950 p-4 md:p-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6 col-span-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AnalyticsSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-span-1 lg:col-span-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TransactionSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(DashboardPage, "zu2t8wh0vXonGeJC3aypnPLLMo8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AccountSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AccountSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAccounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAccounts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/transactions.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const CURRENCY_SYMBOLS = {
    UAH: '₴',
    USD: '$',
    EUR: '€'
};
function AccountSection() {
    _s();
    const { accounts, createAccount, isCreatingAccount, transferFunds, isTransferring } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAccounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccounts"])();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    // Стейт для створення нового рахунку
    const [accName, setAccName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [accBalance, setAccBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('0');
    const [accCurrency, setAccCurrency] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('UAH');
    // Стейт для переказу між рахунками
    const [fromAccount, setFromAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [toAccount, setToAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [transferAmount, setTransferAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Хендлер створення рахунку
    const handleCreate = (e)=>{
        e.preventDefault();
        if (!accName) return;
        createAccount({
            name: accName,
            balance: Number(accBalance),
            currency: accCurrency // <-- ТЕПЕР ПЕРЕДАЄМО ДИНАМІЧНО ЗАМІСТЬ ЗАХАРДКОДЖЕНОГО "UAH"
        });
        setAccName('');
        setAccBalance('0');
        setAccCurrency('UAH'); // Скидаємо на дефолт
    };
    // Хендлер переказу коштів
    const handleTransfer = async (e)=>{
        e.preventDefault();
        if (!fromAccount || !toAccount || !transferAmount) return;
        try {
            await transferFunds({
                from_account_id: fromAccount,
                to_account_id: toAccount,
                amount: parseFloat(transferAmount)
            });
            // Очищаємо суму після успішного переказу
            setTransferAmount('');
        } catch (error) {
            console.error("Помилка під час переказу:", error);
        }
    };
    const updateMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "AccountSection.useMutation[updateMutation]": ({ id, payload })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateAccount"])(id, payload)
        }["AccountSection.useMutation[updateMutation]"],
        onSuccess: {
            "AccountSection.useMutation[updateMutation]": ()=>{
                // Миттєво перемальовуємо рахунки на екрані
                queryClient.invalidateQueries({
                    queryKey: [
                        'accounts'
                    ]
                });
            }
        }["AccountSection.useMutation[updateMutation]"],
        onError: {
            "AccountSection.useMutation[updateMutation]": (error)=>{
                alert(error.response?.data?.detail || "Помилка при оновленні рахунку");
            }
        }["AccountSection.useMutation[updateMutation]"]
    });
    const handleEditName = (id, currentName)=>{
        const newName = window.prompt(`Введіть нову назву для рахунку "${currentName}":`, currentName);
        if (newName && newName.trim() !== '' && newName !== currentName) {
            updateMutation.mutate({
                id,
                payload: {
                    name: newName.trim()
                }
            });
        }
    };
    const deleteMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteAccount"],
        onSuccess: {
            "AccountSection.useMutation[deleteMutation]": ()=>{
                // Автоматично оновлюємо список рахунків та транзакцій на екрані
                queryClient.invalidateQueries({
                    queryKey: [
                        'accounts'
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        'transactions'
                    ]
                });
            }
        }["AccountSection.useMutation[deleteMutation]"],
        onError: {
            "AccountSection.useMutation[deleteMutation]": (error)=>{
                alert(error.response?.data?.detail || "Помилка при видаленні рахунку");
            }
        }["AccountSection.useMutation[deleteMutation]"]
    });
    const handleDelete = (id, name)=>{
        if (window.confirm(`Ви дійсно хочете видалити рахунок "${name}"? Усі його транзакції зникнуть каскадно!`)) {
            deleteMutation.mutate(id);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold mb-4 text-indigo-400",
                        children: "Мої Рахунки"
                    }, void 0, false, {
                        fileName: "[project]/src/components/AccountSection.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    accounts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-400 text-sm mb-4",
                        children: "Рахунків поки немає."
                    }, void 0, false, {
                        fileName: "[project]/src/components/AccountSection.tsx",
                        lineNumber: 114,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 mb-6",
                        children: accounts.map((acc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-700 p-4 rounded-xl flex justify-between items-center border border-slate-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold text-white",
                                                children: acc.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AccountSection.tsx",
                                                lineNumber: 120,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-400",
                                                children: [
                                                    "Валюта: ",
                                                    acc.currency
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AccountSection.tsx",
                                                lineNumber: 121,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-slate-500 font-mono select-all",
                                                children: acc.id
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AccountSection.tsx",
                                                lineNumber: 122,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AccountSection.tsx",
                                        lineNumber: 119,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg font-bold text-emerald-400",
                                        children: [
                                            CURRENCY_SYMBOLS[acc.currency] || acc.currency,
                                            " ",
                                            Number(acc.balance).toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AccountSection.tsx",
                                        lineNumber: 124,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleEditName(acc.id, acc.name),
                                        className: "text-slate-400 hover:text-indigo-400 transition-colors p-1",
                                        title: "Редагувати назву",
                                        children: "✏️"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AccountSection.tsx",
                                        lineNumber: 127,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleDelete(acc.id, acc.name),
                                        className: "text-red-400 hover:text-red-600 transition-colors p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800",
                                        title: "Видалити рахунок",
                                        children: "🗑️"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AccountSection.tsx",
                                        lineNumber: 134,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, acc.id, true, {
                                fileName: "[project]/src/components/AccountSection.tsx",
                                lineNumber: 118,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/AccountSection.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleCreate,
                        className: "pt-4 border-t border-slate-700 space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                required: true,
                                placeholder: "Назва рахунку (напр. Готівка)",
                                value: accName,
                                onChange: (e)=>setAccName(e.target.value),
                                className: "w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AccountSection.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                required: true,
                                placeholder: "Початковий баланс",
                                value: accBalance,
                                onChange: (e)=>setAccBalance(e.target.value),
                                className: "w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AccountSection.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs text-slate-400",
                                        children: "Валюта"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AccountSection.tsx",
                                        lineNumber: 166,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: accCurrency,
                                        onChange: (e)=>setAccCurrency(e.target.value),
                                        className: "w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white text-sm focus:outline-none focus:border-indigo-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "UAH",
                                                children: "UAH (₴)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AccountSection.tsx",
                                                lineNumber: 172,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "USD",
                                                children: "USD ($)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AccountSection.tsx",
                                                lineNumber: 173,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "EUR",
                                                children: "EUR (€)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AccountSection.tsx",
                                                lineNumber: 174,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AccountSection.tsx",
                                        lineNumber: 167,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AccountSection.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: isCreatingAccount,
                                className: "w-full bg-indigo-600 hover:bg-indigo-700 text-sm font-medium py-2 rounded-xl transition-colors",
                                children: isCreatingAccount ? 'Створення...' : '+ Додати рахунок'
                            }, void 0, false, {
                                fileName: "[project]/src/components/AccountSection.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AccountSection.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AccountSection.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold mb-4 text-indigo-400",
                        children: "Переказ між рахунками"
                    }, void 0, false, {
                        fileName: "[project]/src/components/AccountSection.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleTransfer,
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs text-slate-400",
                                        children: "З якого рахунку (Джерело)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AccountSection.tsx",
                                        lineNumber: 193,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: fromAccount,
                                        onChange: (e)=>setFromAccount(e.target.value),
                                        className: "mt-1 w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500",
                                        required: true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "-- Оберіть рахунок --"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AccountSection.tsx",
                                                lineNumber: 200,
                                                columnNumber: 15
                                            }, this),
                                            accounts.map((acc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: acc.id,
                                                    children: acc.name
                                                }, acc.id, false, {
                                                    fileName: "[project]/src/components/AccountSection.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AccountSection.tsx",
                                        lineNumber: 194,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AccountSection.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs text-slate-400",
                                        children: "На який рахунок (Отримувач)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AccountSection.tsx",
                                        lineNumber: 208,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: toAccount,
                                        onChange: (e)=>setToAccount(e.target.value),
                                        className: "mt-1 w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500",
                                        required: true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "-- Оберіть рахунок --"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AccountSection.tsx",
                                                lineNumber: 215,
                                                columnNumber: 15
                                            }, this),
                                            accounts.map((acc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: acc.id,
                                                    children: acc.name
                                                }, acc.id, false, {
                                                    fileName: "[project]/src/components/AccountSection.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AccountSection.tsx",
                                        lineNumber: 209,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AccountSection.tsx",
                                lineNumber: 207,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs text-slate-400",
                                        children: "Сума переказу"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AccountSection.tsx",
                                        lineNumber: 223,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        required: true,
                                        placeholder: "0.00",
                                        value: transferAmount,
                                        onChange: (e)=>setTransferAmount(e.target.value),
                                        className: "mt-1 w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AccountSection.tsx",
                                        lineNumber: 224,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AccountSection.tsx",
                                lineNumber: 222,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: isTransferring || accounts.length < 2,
                                className: "w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-500 text-sm font-medium py-2 rounded-xl transition-colors",
                                children: isTransferring ? 'Обробка переказу...' : 'Переказати кошти'
                            }, void 0, false, {
                                fileName: "[project]/src/components/AccountSection.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, this),
                            accounts.length < 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] text-amber-400 text-center mt-1",
                                children: "Для переказу потрібно мати мінімум 2 рахунки."
                            }, void 0, false, {
                                fileName: "[project]/src/components/AccountSection.tsx",
                                lineNumber: 243,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AccountSection.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AccountSection.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AccountSection.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}
_s(AccountSection, "iUrgFK6xNqzZxe4nmAoJ1wht6tk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAccounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccounts"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
_c = AccountSection;
var _c;
__turbopack_context__.k.register(_c, "AccountSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AnalyticsSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnalyticsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/transactions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAnalytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAnalytics.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// Палітра кольорів для смуг витрат
const BG_COLORS = [
    'bg-indigo-500',
    'bg-rose-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-purple-500',
    'bg-cyan-500'
];
function AnalyticsSection() {
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const { analyticsData, isLoadingAnalytics } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAnalytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnalytics"])();
    // Стейт для форми бюджетів
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [budgetLimit, setBudgetLimit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showBudgetForm, setShowBudgetForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // ✅ ВСІ ХУКИ ПОВИННІ БУТИ ТУТ — ДО БУДЬ-ЯКИХ РАННІХ RETURN!
    const budgetMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setCategoryBudget"],
        onSuccess: {
            "AnalyticsSection.useMutation[budgetMutation]": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'analytics'
                    ]
                });
                setBudgetLimit('');
                setSelectedCategory('');
                setShowBudgetForm(false);
            }
        }["AnalyticsSection.useMutation[budgetMutation]"],
        onError: {
            "AnalyticsSection.useMutation[budgetMutation]": (error)=>{
                alert(error.response?.data?.detail || "Не вдалося встановити ліміт");
            }
        }["AnalyticsSection.useMutation[budgetMutation]"]
    });
    // 🔄 ТЕПЕР РАННІЙ RETURN ЦІЛКОМ БЕЗПЕЧНИЙ ДЛЯ ПОРЯДКУ ХУКІВ
    if (isLoadingAnalytics) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center text-slate-400 text-sm",
            children: "Завантаження аналітики..."
        }, void 0, false, {
            fileName: "[project]/src/components/AnalyticsSection.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this);
    }
    const handleBudgetSubmit = (e)=>{
        e.preventDefault();
        if (!selectedCategory || !budgetLimit) return;
        budgetMutation.mutate({
            category_name: selectedCategory,
            amount_limit: parseFloat(budgetLimit)
        });
    };
    const chartData = analyticsData?.by_categories || [];
    const totalSpent = Number(analyticsData?.total_spent || 0);
    const hasData = chartData.length > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-sm flex flex-col justify-between",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold mb-1 text-indigo-400",
                        children: "Аналітика витрат"
                    }, void 0, false, {
                        fileName: "[project]/src/components/AnalyticsSection.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-slate-400 mb-4",
                        children: "Розподіл за поточний місяць"
                    }, void 0, false, {
                        fileName: "[project]/src/components/AnalyticsSection.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AnalyticsSection.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            !hasData ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[150px] flex items-center justify-center text-sm text-slate-500 italic",
                children: "Немає даних про витрати для аналізу"
            }, void 0, false, {
                fileName: "[project]/src/components/AnalyticsSection.tsx",
                lineNumber: 65,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 max-h-[220px] overflow-y-auto pr-1",
                        children: analyticsData.by_categories.map((cat)=>{
                            const totalAmountNum = Number(cat.total_amount);
                            const amountLimitNum = Number(cat.amount_limit);
                            // 🌟 МАГІЯ ВАРІАНТУ 1: 
                            // Якщо ліміт задано — рахуємо від ліміту (але не більше 100%).
                            // Якщо ліміту немає (0) — рахуємо долю категорії від ЗАГАЛЬНИХ витрат місяця!
                            const percentage = amountLimitNum > 0 ? Math.min(totalAmountNum / amountLimitNum * 100, 100) : totalSpent > 0 ? totalAmountNum / totalSpent * 100 : 0;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-300 font-medium",
                                                children: cat.category_name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AnalyticsSection.tsx",
                                                lineNumber: 87,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-400",
                                                children: [
                                                    Number(cat.total_amount).toFixed(2),
                                                    " ₴",
                                                    cat.amount_limit > 0 && ` / ${cat.amount_limit.toFixed(2)} ₴`
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AnalyticsSection.tsx",
                                                lineNumber: 88,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AnalyticsSection.tsx",
                                        lineNumber: 86,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: `${percentage}%`
                                            },
                                            className: `h-full rounded-full transition-all duration-500 shadow-sm ${cat.is_exceeded ? 'bg-rose-500 shadow-rose-500/40 animate-pulse' : 'bg-indigo-500 shadow-indigo-500/40'}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AnalyticsSection.tsx",
                                            lineNumber: 97,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalyticsSection.tsx",
                                        lineNumber: 95,
                                        columnNumber: 19
                                    }, this),
                                    cat.is_exceeded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-rose-400 font-semibold animate-pulse flex items-center gap-1",
                                        children: "⚠️ Увага! Перевищено місячний ліміт бюджету на цю категорію!"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalyticsSection.tsx",
                                        lineNumber: 109,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, cat.category_name, true, {
                                fileName: "[project]/src/components/AnalyticsSection.tsx",
                                lineNumber: 84,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/AnalyticsSection.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-4 border-t border-slate-700 flex justify-between items-center text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-400",
                                children: "Всього витрачено:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalyticsSection.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-lg font-extrabold text-rose-400",
                                children: [
                                    totalSpent.toFixed(2),
                                    " ₴"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AnalyticsSection.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AnalyticsSection.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AnalyticsSection.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-4 border-t border-slate-700 space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowBudgetForm(!showBudgetForm),
                        className: "w-full text-center text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors py-1 bg-slate-900/40 rounded-lg border border-slate-700/60",
                        children: showBudgetForm ? '✕ Закрити налаштування лімітів' : '⚙️ Встановити ліміти на категорії'
                    }, void 0, false, {
                        fileName: "[project]/src/components/AnalyticsSection.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this),
                    showBudgetForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleBudgetSubmit,
                        className: "space-y-3 p-3 bg-slate-900 rounded-xl border border-slate-700 animate-fadeIn",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        required: true,
                                        value: selectedCategory,
                                        onChange: (e)=>setSelectedCategory(e.target.value),
                                        className: "bg-slate-800 border border-slate-600 rounded-xl px-2 py-1 text-xs text-white focus:outline-none focus:border-indigo-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "-- Категорія --"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AnalyticsSection.tsx",
                                                lineNumber: 146,
                                                columnNumber: 17
                                            }, this),
                                            chartData.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: cat.category_name,
                                                    children: cat.category_name
                                                }, cat.category_name, false, {
                                                    fileName: "[project]/src/components/AnalyticsSection.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AnalyticsSection.tsx",
                                        lineNumber: 140,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        required: true,
                                        min: "0",
                                        placeholder: "Ліміт (0 - прибрати)",
                                        value: budgetLimit,
                                        onChange: (e)=>setBudgetLimit(e.target.value),
                                        className: "bg-slate-800 border border-slate-600 rounded-xl px-2 py-1 text-xs text-white focus:outline-none focus:border-indigo-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AnalyticsSection.tsx",
                                        lineNumber: 152,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AnalyticsSection.tsx",
                                lineNumber: 139,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: budgetMutation.isPending,
                                className: "w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 text-white text-xs font-bold py-1.5 rounded-xl transition-colors",
                                children: budgetMutation.isPending ? 'Збереження...' : 'Зберегти ліміт бюджету'
                            }, void 0, false, {
                                fileName: "[project]/src/components/AnalyticsSection.tsx",
                                lineNumber: 163,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AnalyticsSection.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AnalyticsSection.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AnalyticsSection.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(AnalyticsSection, "8HPItbXz5DEfvLXfZOHI/bdWqMU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAnalytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnalytics"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
_c = AnalyticsSection;
var _c;
__turbopack_context__.k.register(_c, "AnalyticsSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/TransactionSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TransactionSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAccounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAccounts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTransactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useTransactions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/axiosClient.ts [app-client] (ecmascript)");
var __TURBOPACK__import$2e$meta__ = {
    get url () {
        return __turbopack_context__.F("src/components/TransactionSection.tsx");
    },
    env: {
        DEV: true,
        PROD: false,
        MODE: "development",
        BASE_URL: "/",
        SSR: false
    },
    get turbopackHot () {
        return __turbopack_context__.m.hot;
    }
};
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function TransactionSection() {
    _s();
    const { accounts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAccounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccounts"])();
    // 1. Створюємо локальні стейти для фільтрів на фронтенді
    const [filterAccount, setFilterAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [filterCategory, setFilterCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // 2. Перший виклик: Тільки для збору УСІХ категорій за обраним рахунком
    const { transactions: allTransactions } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTransactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransactions"])({
        account_id: filterAccount || undefined
    });
    // 3. Другий виклик: Фінальний список + ТУТ МИ ЗАБИРАЄМО МУТАЦІЇ create ТА delete
    const { transactions, isLoadingTransactions, exportUrl, createTransaction, deleteTransaction// Переконайся, що цей рядок присутній!
     } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTransactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransactions"])({
        account_id: filterAccount || undefined,
        category_name: filterCategory || undefined
    });
    // 4. Динамічний збір унікальних категорій
    const dynamicCategories = Array.from(new Set(allTransactions.map((tx)=>tx.category_name).filter((cat)=>!!cat && cat.trim() !== '')));
    const [txAmount, setTxAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [txAccount, setTxAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [txCategory, setTxCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Будуємо динамічний URL для скачування CSV з урахуванням фільтрів екрану
    // Оскільки backend очікує порт 8000 та префікс /api/v1/
    const baseUrl = __TURBOPACK__import$2e$meta__.env.VITE_API_URL || 'http://localhost:8000/api/v1';
    const handleDownloadReport = async ()=>{
        try {
            // 1. Формуємо параметри фільтрації, як і раніше
            const params = {};
            if (filterAccount) params.account_id = filterAccount;
            if (filterCategory) params.category_name = filterCategory;
            // 2. Робимо запит через axiosClient, який ГАРАНТОВАНО підставить правильний токен!
            // Важливо вказати responseType: 'blob', щоб передати файл як бінарний потік
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/transactions/export', {
                params,
                responseType: 'blob'
            });
            // 3. Перетворюємо бінарну відповідь у файл та завантажуємо в браузері
            const blob = new Blob([
                response.data
            ], {
                type: 'text/csv; charset=utf-8'
            });
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            // Генеруємо красиву назву файлу з поточною датою
            a.download = `financial_report_${new Date().toISOString().slice(0, 10)}.csv`;
            document.body.appendChild(a);
            a.click();
            // Очищаємо пам'ять за собою
            a.remove();
            window.URL.revokeObjectURL(downloadUrl);
        } catch (err) {
            console.error("Експорт звіту провалився:", err);
            alert("Не вдалося завантажити фінансовий звіт. Перевірте авторизацію.");
        }
    };
    // Допоміжна функція для скачування Blob файлів (можна додати вгорі файлу або компонента)
    const downloadFile = async (url, token)=>{
        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error("Помилка генерації звіту");
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = `financial_report_${new Date().toISOString().slice(0, 10)}.csv`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (err) {
            alert("Не вдалося завантажити фінансовий звіт");
        }
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!txAmount || !txAccount || !txCategory) return;
        await createTransaction({
            account_id: txAccount,
            amount: parseFloat(txAmount),
            type: 'EXPENSE',
            category_name: txCategory,
            description: 'Фронтенд операція'
        });
        setTxAmount('');
        setTxCategory('');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 md:grid-cols-2 gap-6 lg:col-span-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-sm h-fit",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold mb-4 text-indigo-400",
                        children: "Додати Витрату"
                    }, void 0, false, {
                        fileName: "[project]/src/components/TransactionSection.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-bold text-indigo-400",
                                        children: "Історія операцій"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TransactionSection.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-400",
                                        children: "Список ваших фінансових подій"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TransactionSection.tsx",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TransactionSection.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: filterAccount,
                                        onChange: (e)=>setFilterAccount(e.target.value),
                                        className: "bg-slate-900  border border-slate-600 rounded-xl px-2 py-1 text-xs text-white focus:outline-none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Всі рахунки"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TransactionSection.tsx",
                                                lineNumber: 138,
                                                columnNumber: 15
                                            }, this),
                                            accounts.map((acc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: acc.id,
                                                    children: acc.name
                                                }, acc.id, false, {
                                                    fileName: "[project]/src/components/TransactionSection.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TransactionSection.tsx",
                                        lineNumber: 133,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: filterCategory,
                                        onChange: (e)=>setFilterCategory(e.target.value),
                                        className: "bg-slate-900 border border-slate-600 rounded-xl px-2 py-1 text-xs text-white focus:outline-none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Всі категорії"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TransactionSection.tsx",
                                                lineNumber: 150,
                                                columnNumber: 15
                                            }, this),
                                            dynamicCategories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: cat,
                                                    children: cat
                                                }, cat, false, {
                                                    fileName: "[project]/src/components/TransactionSection.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TransactionSection.tsx",
                                        lineNumber: 145,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleDownloadReport,
                                        className: "bg-emerald-500 hover:bg-emerald-600 text-slate-900 text-xs font-bold px-3 py-1 rounded-xl transition-colors flex items-center gap-1 shadow-sm",
                                        title: "Експортувати звіт в Excel/CSV",
                                        children: "📊 Звіт"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TransactionSection.tsx",
                                        lineNumber: 158,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TransactionSection.tsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TransactionSection.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs text-slate-400",
                                        children: "Оберіть рахунок"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TransactionSection.tsx",
                                        lineNumber: 170,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: txAccount,
                                        onChange: (e)=>setTxAccount(e.target.value),
                                        className: "mt-1 w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none",
                                        required: true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "-- Оберіть --"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TransactionSection.tsx",
                                                lineNumber: 177,
                                                columnNumber: 15
                                            }, this),
                                            accounts.map((acc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: acc.id,
                                                    children: acc.name
                                                }, acc.id, false, {
                                                    fileName: "[project]/src/components/TransactionSection.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TransactionSection.tsx",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TransactionSection.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs text-slate-400",
                                        children: "Сума витрати"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TransactionSection.tsx",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        required: true,
                                        placeholder: "0.00",
                                        value: txAmount,
                                        onChange: (e)=>setTxAmount(e.target.value),
                                        className: "mt-1 w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TransactionSection.tsx",
                                        lineNumber: 186,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TransactionSection.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs text-slate-400",
                                        children: "Категорія"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TransactionSection.tsx",
                                        lineNumber: 197,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        required: true,
                                        placeholder: "Напр. Продукти",
                                        value: txCategory,
                                        onChange: (e)=>setTxCategory(e.target.value),
                                        className: "mt-1 w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/TransactionSection.tsx",
                                        lineNumber: 198,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TransactionSection.tsx",
                                lineNumber: 196,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "w-full bg-red-600 hover:bg-red-700 text-sm font-medium py-2 rounded-xl transition-colors",
                                children: "Зафіксувати витрату"
                            }, void 0, false, {
                                fileName: "[project]/src/components/TransactionSection.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TransactionSection.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TransactionSection.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold mb-4 text-indigo-400",
                        children: "Останні операції"
                    }, void 0, false, {
                        fileName: "[project]/src/components/TransactionSection.tsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this),
                    transactions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-400 text-sm",
                        children: "Операцій немає."
                    }, void 0, false, {
                        fileName: "[project]/src/components/TransactionSection.tsx",
                        lineNumber: 218,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 max-h-[350px] overflow-y-auto pr-1",
                        children: transactions.map((tx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-700 p-3 rounded-xl flex justify-between items-center border border-slate-600 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-medium text-white",
                                                children: tx.category_name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TransactionSection.tsx",
                                                lineNumber: 224,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-400",
                                                children: new Date(tx.date).toLocaleDateString()
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TransactionSection.tsx",
                                                lineNumber: 225,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TransactionSection.tsx",
                                        lineNumber: 223,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `font-bold ${tx.type === 'EXPENSE' ? 'text-rose-400' : 'text-emerald-400'}`,
                                                children: [
                                                    tx.type === 'EXPENSE' ? '-' : '+',
                                                    Number(tx.amount).toFixed(2),
                                                    " ₴"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/TransactionSection.tsx",
                                                lineNumber: 228,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>deleteTransaction(tx.id),
                                                className: "text-slate-500 hover:text-red-400 transition-colors",
                                                children: "✕"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/TransactionSection.tsx",
                                                lineNumber: 231,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/TransactionSection.tsx",
                                        lineNumber: 227,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, tx.id, true, {
                                fileName: "[project]/src/components/TransactionSection.tsx",
                                lineNumber: 222,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/TransactionSection.tsx",
                        lineNumber: 220,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TransactionSection.tsx",
                lineNumber: 215,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TransactionSection.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this);
}
_s(TransactionSection, "rpKmmiSBaFgTqbSo7fU/vBpFxfY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAccounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccounts"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTransactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransactions"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTransactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransactions"]
    ];
});
_c = TransactionSection;
var _c;
__turbopack_context__.k.register(_c, "TransactionSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useAccounts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAccounts",
    ()=>useAccounts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$services$2f$accounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/services/accounts.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
const useAccounts = ()=>{
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    // 1. Запит на отримання всіх рахунків
    const accountsQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'accounts'
        ],
        queryFn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$services$2f$accounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["accountsService"].getAll,
        staleTime: 1000 * 60
    });
    // 2. Мутація створення рахунку
    const createAccountMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$services$2f$accounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["accountsService"].create,
        onSuccess: {
            "useAccounts.useMutation[createAccountMutation]": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'accounts'
                    ]
                });
            }
        }["useAccounts.useMutation[createAccountMutation]"]
    });
    // 3. Мутація переказу коштів
    const transferMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$services$2f$accounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["accountsService"].transfer,
        onSuccess: {
            "useAccounts.useMutation[transferMutation]": ()=>{
                // Оновлюємо і рахунки, і транзакції, бо переказ створює нові записи в історії
                queryClient.invalidateQueries({
                    queryKey: [
                        'accounts'
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        'transactions'
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        'analytics'
                    ]
                });
            }
        }["useAccounts.useMutation[transferMutation]"]
    });
    // 4. Мутація видалення рахунку
    const deleteAccountMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$services$2f$accounts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["accountsService"].delete,
        onSuccess: {
            "useAccounts.useMutation[deleteAccountMutation]": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'accounts'
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        'transactions'
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        'analytics'
                    ]
                });
            }
        }["useAccounts.useMutation[deleteAccountMutation]"]
    });
    return {
        accounts: accountsQuery.data || [],
        isLoadingAccounts: accountsQuery.isLoading,
        accountsError: accountsQuery.error,
        createAccount: createAccountMutation.mutateAsync,
        isCreatingAccount: createAccountMutation.isPending,
        transferFunds: transferMutation.mutateAsync,
        isTransferring: transferMutation.isPending,
        deleteAccount: deleteAccountMutation.mutateAsync,
        isDeletingAccount: deleteAccountMutation.isPending
    };
};
_s(useAccounts, "6Vab1Xp97KEBeDzr2nBF56eQ+d0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useAnalytics.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAnalytics",
    ()=>useAnalytics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/axiosClient.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
const useAnalytics = ()=>{
    _s();
    const analyticsQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'analytics'
        ],
        queryFn: {
            "useAnalytics.useQuery[analyticsQuery]": async ()=>{
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/analytics/categories');
                return response.data;
            }
        }["useAnalytics.useQuery[analyticsQuery]"],
        staleTime: 1000 * 30
    });
    return {
        analyticsData: analyticsQuery.data,
        isLoadingAnalytics: analyticsQuery.isLoading,
        analyticsError: analyticsQuery.error
    };
};
_s(useAnalytics, "nqbRDHWwmXTkpeG3gq6nMqBpbZ0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useTransactions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTransactions",
    ()=>useTransactions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$services$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/services/transactions.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
const useTransactions = (filters)=>{
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    // 1. Запит на стрічку транзакцій (автоматично перестрілює при зміні фільтрів)
    const transactionsQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'transactions',
            filters
        ],
        queryFn: {
            "useTransactions.useQuery[transactionsQuery]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$services$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transactionsService"].getAll(filters)
        }["useTransactions.useQuery[transactionsQuery]"]
    });
    // 2. Мутація створення транзакції
    const createTransactionMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$services$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transactionsService"].create,
        onSuccess: {
            "useTransactions.useMutation[createTransactionMutation]": ()=>{
                // Інвалідуємо ПОВНІСТЮ ВСЕ, бо транзакція міняє баланс рахунку, історію та аналітику!
                queryClient.invalidateQueries({
                    queryKey: [
                        'transactions'
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        'accounts'
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        'analytics'
                    ]
                });
            }
        }["useTransactions.useMutation[createTransactionMutation]"]
    });
    // 3. Мутація видалення транзакції
    const deleteTransactionMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$services$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transactionsService"].delete,
        onSuccess: {
            "useTransactions.useMutation[deleteTransactionMutation]": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'transactions'
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        'accounts'
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        'analytics'
                    ]
                });
            }
        }["useTransactions.useMutation[deleteTransactionMutation]"]
    });
    return {
        transactions: transactionsQuery.data || [],
        isLoadingTransactions: transactionsQuery.isLoading,
        createTransaction: createTransactionMutation.mutateAsync,
        isCreatingTransaction: createTransactionMutation.isPending,
        deleteTransaction: deleteTransactionMutation.mutateAsync,
        isDeletingTransaction: deleteTransactionMutation.isPending,
        exportUrl: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$services$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transactionsService"].getExportUrl()
    };
};
_s(useTransactions, "aABP26jznVQJTLCmjtiRcdA35F8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_17d66enwyg_5p._.js.map