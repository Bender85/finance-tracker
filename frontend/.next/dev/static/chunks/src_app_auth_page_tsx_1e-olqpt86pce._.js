(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/auth/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__import$2e$meta__ = {
    get url () {
        return __turbopack_context__.F("src/app/auth/page.tsx");
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
function AuthPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isLogin, setIsLogin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // 🌟 НАШ НОВИЙ СТЕЙТ ДЛЯ ДИНАМІЧНИХ ПОМИЛОК БЕКЕНДУ
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setErrorMessage(null); // Скидаємо стару помилку при новій спробі
        const baseUrl = __TURBOPACK__import$2e$meta__.env.VITE_API_URL || 'http://localhost:8000/api/v1';
        const url = isLogin ? `${baseUrl}/auth/login` : `${baseUrl}/auth/register`;
        try {
            let payload;
            let headers = {};
            if (isLogin) {
                payload = new URLSearchParams();
                payload.append('username', email);
                payload.append('password', password);
                headers['Content-Type'] = 'application/x-www-form-urlencoded';
            } else {
                payload = {
                    email,
                    password
                };
            }
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(url, payload, {
                headers
            });
            const token = response.data.access_token || response.data.token;
            if (token) {
                localStorage.setItem('token', token);
                router.push('/');
            }
        } catch (err) {
            console.error("Помилка автентифікації:", err);
            // 🌟 ДИНАМІЧНО ВИЦІПЛЮЄМО ТОЧНИЙ ТЕКСТ ПОМИЛКИ З FASTAPI RESPONSE
            const serverMessage = err.response?.data?.detail;
            if (serverMessage) {
                setErrorMessage(serverMessage);
            } else {
                setErrorMessage(isLogin ? 'Неправильний email або пароль' : 'Не вдалося зареєструвати акаунт');
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-slate-950 p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: handleSubmit,
            className: "bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl w-full max-w-sm space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold text-indigo-400 text-center",
                    children: isLogin ? 'Вхід у кабінет' : 'Реєстрація фінтех-акаунта'
                }, void 0, false, {
                    fileName: "[project]/src/app/auth/page.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this),
                errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs p-3 rounded-xl text-center font-medium animate-headShake",
                    children: [
                        "⚠️ ",
                        errorMessage
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/auth/page.tsx",
                    lineNumber: 66,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "email",
                    placeholder: "Email",
                    required: true,
                    value: email,
                    onChange: (e)=>setEmail(e.target.value),
                    className: "w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white text-sm focus:border-indigo-500"
                }, void 0, false, {
                    fileName: "[project]/src/app/auth/page.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "password",
                    placeholder: "Пароль",
                    required: true,
                    value: password,
                    onChange: (e)=>setPassword(e.target.value),
                    className: "w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white text-sm focus:border-indigo-500"
                }, void 0, false, {
                    fileName: "[project]/src/app/auth/page.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    className: "w-full bg-indigo-500 text-white rounded-xl py-2 text-sm font-bold shadow-lg shadow-indigo-500/20",
                    children: isLogin ? 'Увійти' : 'Зареєструватися'
                }, void 0, false, {
                    fileName: "[project]/src/app/auth/page.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    onClick: ()=>{
                        setIsLogin(!isLogin);
                        setErrorMessage(null); // Скидаємо помилку при перемиканні режимів
                    },
                    className: "text-center text-xs text-slate-400 cursor-pointer hover:text-indigo-300",
                    children: isLogin ? 'Немає акаунту? Створити' : 'Вже є акаунт? Увійти'
                }, void 0, false, {
                    fileName: "[project]/src/app/auth/page.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/auth/page.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/auth/page.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(AuthPage, "hwB2dAQWYsHwsn9PBHJzKeILBOw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthPage;
var _c;
__turbopack_context__.k.register(_c, "AuthPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_auth_page_tsx_1e-olqpt86pce._.js.map