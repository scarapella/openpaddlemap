BR.confLayers.getPropertyOverrides = function() {
    return {
        'standard': {
            'name': i18next.t('map.layer.osm'),
            'attribution': {
                'html': '&copy; <a target="_blank" href="https://www.openstreetmap.org/copyright">openstreetmap.org</a>, <a target="_blank" href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a>'
            },
            'mapUrl': 'https://www.openstreetmap.org/#map={zoom}/{lat}/{lon}'
        },
        'OpenTopoMap': {
            'name': i18next.t('map.layer.topo'),
            'attribution': {
                'html': '&copy; <a target="_blank" href="https://opentopomap.org/about#verwendung">OpenTopoMap</a>, <a target="_blank" href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA 3.0</a>; <a target="_blank" href="http://viewfinderpanoramas.org">SRTM</a>'
            },
            'mapUrl': 'https://opentopomap.org/#map={zoom}/{lat}/{lon}'
        },
        'Esri.WorldImagery': {
            'name': i18next.t('map.layer.esri'),
            'nameShort': i18next.t('credits.esri-tiles'),
            'attribution': i18next.t('credits.esri-license'),
            'mapUrl': 'http://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9'
        },
        'waterways': {
            'name': 'Waterways',
            'nameShort': 'Waterways',
            'attribution': {
                'html': '&copy; <a target="_blank" href="https://opentrailmap.us/">OpenTrailMap</a>, <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC-BY-SA 4.0</a>'
            },
            'mapUrl': 'https://opentrailmap.us/#map={zoom}/{lat}/{lon}&mode=canoe'
        },
        'opentrailmap-canoe': {
            'name': 'Canoe and Portage Trails',
            'nameShort': 'Canoe Trails',
            'attribution': {
                'html': '&copy; <a target="_blank" href="https://opentrailmap.us/">OpenTrailMap</a>, <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC-BY-SA 4.0</a>'
            },
            'mapUrl': 'https://opentrailmap.us/#map={zoom}/{lat}/{lon}&mode=canoe'
        },
        'opentrailmap-canoe-pois': {
            'name': 'Canoe POIs',
            'nameShort': 'Canoe POIs',
            'attribution': {
                'html': '&copy; <a target="_blank" href="https://opentrailmap.us/">OpenTrailMap</a>, <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC-BY-SA 4.0</a>'
            },
            'mapUrl': 'https://opentrailmap.us/#map={zoom}/{lat}/{lon}&mode=canoe'
        },
        'terrarium-hillshading': {
            'name': i18next.t('map.layer.hillshading')
        }
    };
};
