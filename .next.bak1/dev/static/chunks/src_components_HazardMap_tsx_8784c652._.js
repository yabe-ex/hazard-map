(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/HazardMap.tsx [app-client] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/src_components_HeatmapLayer_tsx_54ce1a1b._.js",
  "static/chunks/node_modules_leaflet_dist_leaflet-src_8608e1e4.js",
  "static/chunks/node_modules_@supabase_realtime-js_dist_module_65527103._.js",
  "static/chunks/node_modules_@supabase_auth-js_dist_module_e6c70351._.js",
  "static/chunks/node_modules_ea0e5bfe._.js",
  "static/chunks/src_cc6362bc._.js",
  {
    "path": "static/chunks/node_modules_2d9b6395._.css",
    "included": [
      "[project]/node_modules/leaflet/dist/leaflet.css [app-client] (css)",
      "[project]/node_modules/leaflet.markercluster/dist/MarkerCluster.css [app-client] (css)",
      "[project]/node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css [app-client] (css)"
    ],
    "moduleChunks": [
      "static/chunks/node_modules_leaflet_dist_leaflet_css_bad6b30c._.single.css",
      "static/chunks/node_modules_leaflet_markercluster_dist_MarkerCluster_css_bad6b30c._.single.css",
      "static/chunks/node_modules_leaflet_markercluster_dist_MarkerCluster_Default_css_bad6b30c._.single.css"
    ]
  },
  "static/chunks/src_components_HazardMap_tsx_20184aaa._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/components/HazardMap.tsx [app-client] (ecmascript, next/dynamic entry)");
    });
});
}),
]);