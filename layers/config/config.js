BR.confLayers = {};

//TODO: consolidate permenenant and default layers as they probably do the same thing now
BR.confLayers.permanentBaseLayers = [
    'standard'
];

BR.confLayers.defaultBaseLayers = [
    'OpenTopoMap',
    'Esri.WorldImagery'
];

// worldwide monolingual layers to add as default when browser language matches
BR.confLayers.languageDefaultLayers = [];

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
    'OpenTopoMap': 'OpenTopoMap',
    'Esri World Imagery': 'Esri.WorldImagery'
};

BR.confLayers.leafletProvidersIncludeList = [
    'Esri.WorldImagery'
];
