const noaccessValsLiteral = ["literal", ["no", "private", "discouraged"]]; 
const accessValsLiteral = ["literal", ["yes", "permit", "designated", "permissive", "customers"]];
const bigWaterwayValsLiteral = ["literal",["river","flowline","fairway","link","canal","canoe_pass","tidal_channel"]]; 
const smallWaterwayValsLiteral = ["literal",["stream","ditch","drain"]]; 


const canoeNoaccessExpression = [
    "any",
    ["in", ["get", "canoe"], noaccessValsLiteral],
    [
        "all",
        ["!", ["has", "canoe"]],
        ["in", ["get", "boat"], noaccessValsLiteral]
    ],
    [
        "all",
        ["!", ["has", "canoe"]],
        ["!", ["has", "boat"]],
        ["in", ["get", "access"], noaccessValsLiteral]
    ],
    [
        "all",
        ["!", ["has", "canoe"]],
        ["!", ["has", "boat"]],
        ["!", ["has", "access"]],
        ["in",["get", "tunnel"], "flooded"]
    ]
];

const canoeAccessExpression = [
    "any",
    ["in", ["get", "canoe"], accessValsLiteral],
    [
        "all",
        ["!", ["has", "canoe"]],
        ["in", ["get", "boat"], accessValsLiteral]
    ],
    [
        "all",
        ["!", ["has", "canoe"]],
        ["!", ["has", "boat"]],
        ["in", ["get", "portage"], accessValsLiteral] 
    ],
    [
        "all",
        ["!", ["has", "canoe"]],
        ["!", ["has", "boat"]],
        ["!", ["has", "portage"]],
        ["in", ["get", "access"], accessValsLiteral]
    ]
];


const style = {
    "version": 8,
    "sources": {
        "trails": {
            "type": "vector",
            "tiles": [
                "https://paddlemap-tiles-770576063346.northamerica-northeast2.run.app/waterways/{z}/{x}/{y}.mvt"
            ],
            "minzoom": 0,
            "maxzoom": 14
        }
    },
    "sprite": "https://opentrailmap.us/style/sprites/opentrailmap",
    "layers": [
        {
            "id": "restricted-waterways",
            "type": "line",
            "source": "trails",
            "source-layer": "trail",
            "minzoom": 5,
            "filter": [
                "any",
               [
                   "all",
                    ["has", "waterway"],
                    canoeNoaccessExpression
                ],
                [
                    "all",
                    ["has","waterway"],
                    ["!", canoeAccessExpression],
                    [
                        "any",
                        ["==", ["get", "intermittent"], "yes"],
                        ["in", ["get", "waterway"], smallWaterwayValsLiteral]
                    ]
                ]
            ],
            "paint": {
                "line-dasharray": [1,7],
                "line-width": ["interpolate",["linear"],["zoom"],12,1,22,5],
                "line-color": "#b1b5ba"
            }
        },
        {
            "id": "unrestricted-waterways",
            "type": "line",
            "source": "trails",
            "source-layer": "trail",
            "minzoom": 5,
            "filter": [
                "any",
                [
                    "all",
                    ["in", ["get", "waterway"], bigWaterwayValsLiteral],
                    ["!", canoeNoaccessExpression ],
                    [
                        "!",
                        [
                            "any",
                            ["==", ["get", "intermittent"], "yes"],
                            ["in", ["get", "waterway"], smallWaterwayValsLiteral]
                        ]
                    ]
                ],
                [
                    "all",
                    ["has", "waterway"],
                    canoeAccessExpression
                ]   
            ], 
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "paint": {
                "line-dasharray": [2,6],
                "line-width": ["interpolate",["linear"],["zoom"],12,1,22,5],
                "line-color": "#85a0c9"
            }
        }
    ]
}

module.exports = style;