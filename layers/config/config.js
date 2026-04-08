BR.confLayers = {};

BR.confLayers.permanentBaseLayers = [
    'standard'
];

BR.confLayers.defaultBaseLayers = [
    'OpenTopoMap',
    'Stamen.Terrain',
    'Esri.WorldImagery'
];

// worldwide monolingual layers to add as default when browser language matches
BR.confLayers.languageDefaultLayers = [
    'osm-mapnik-german_style',
    'cyclosm',
    '1021' // sputnik.ru
];

BR.confLayers.permanentOverlays = [
    'waterways',
    'opentrailmap-canoe-pois',
    'opentrailmap-canoe'
];

BR.confLayers.defaultActiveOverlays = [
    'waterways',
    'opentrailmap-canoe-pois'
];

BR.confLayers.defaultOverlays =  [
    'terrarium-hillshading'
];

BR.confLayers.legacyNameToIdMap = {
    'OpenStreetMap': 'standard',
    'OpenStreetMap.de': 'osm-mapnik-german_style',
    'OpenTopoMap': 'OpenTopoMap',
    'Esri World Imagery': 'Esri.WorldImagery',
    'Cycling (Waymarked Trails)': 'Waymarked_Trails-Cycling',
    'Hiking (Waymarked Trails)': 'Waymarked_Trails-Hiking',
    'HikeBike.HillShading': 'terrarium-hillshading',
    'mapillary-coverage-raster': 'mapillary-coverage'
};

BR.confLayers.leafletProvidersIncludeList = [
    'Stamen.Terrain',
    'MtbMap',
    'OpenStreetMap.CH',
    'HikeBike.HillShading',
    'Esri.WorldImagery'
];
