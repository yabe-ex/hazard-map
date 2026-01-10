(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/HazardMap.tsx [app-client] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/node_modules_leaflet_dist_leaflet-src_8608e1e4.js",
  "static/chunks/node_modules_@supabase_realtime-js_dist_module_65527103._.js",
  "static/chunks/node_modules_@supabase_auth-js_dist_module_e6c70351._.js",
  "static/chunks/node_modules_f7b3fd88._.js",
  "static/chunks/src_cc6362bc._.js",
  {
    "path": "static/chunks/node_modules_leaflet_dist_leaflet_ef5f0413.css",
    "included": [
      "[project]/node_modules/leaflet/dist/leaflet.css [app-client] (css)"
    ]
  },
  "static/chunks/src_components_HazardMap_tsx_1a1dd10f._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/components/HazardMap.tsx [app-client] (ecmascript, next/dynamic entry)");
    });
});
}),
]);