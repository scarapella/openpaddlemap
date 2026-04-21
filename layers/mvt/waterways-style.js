const noaccessValsLiteral = ["literal", ["no", "private", "discouraged"]]; 
const accessValsLiteral = ["literal", ["yes", "permit", "designated", "permissive", "customers"]];
const isBigWaterwayExpression = ["in", ["get", "waterway"], ["literal",["river","flowline","fairway","link","canal","canoe_pass","tidal_channel"]]]; 
const isSmallWaterwayExpression = ["in", ["get", "waterway"], ["literal",["stream","ditch","drain"]]]; 
const isWaterwayExpression = ["any", isBigWaterwayExpression, isSmallWaterwayExpression];

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
        ["in",["get", "tunnel"], "flooded"]  // we treat flooded tunnels as an access restriction, but I'm not convinced by that implementation.  
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
                    isWaterwayExpression,
                    canoeNoaccessExpression
                ],
                [
                    "all",
                    isWaterwayExpression,
                    ["!", canoeAccessExpression],
                    [
                        "any",
                        ["==", ["get", "intermittent"], "yes"],
                        isSmallWaterwayExpression
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
                    isBigWaterwayExpression,
                    ["!", canoeNoaccessExpression ],
                    ["!", ["==", ["get", "intermittent"], "yes"]]
                ],
                [
                    "all",
                    isWaterwayExpression,
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