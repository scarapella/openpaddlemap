BR.TrackStats = L.Class.extend({
    update(polyline, segments) {
        if (segments.length == 0) {
            $('#stats-container').hide();
            $('#stats-info').show();
            return;
        }

        $('#stats-container').show();
        $('#stats-info').hide();

        document.getElementById('beeline-warning').hidden = !BR.Routing.hasBeeline(segments);

        var stats = this.calcStats(polyline, segments),
            length1 = BR.UnitSystem.formatDistance(stats.trackLength, 1),
            length3 = BR.UnitSystem.formatDistancePrecise(stats.trackLength),
            distanceUnit = BR.UnitSystem.getDistanceUnit(),
            lengthYards = L.Util.formatNum(stats.trackLength / 0.9144, 0).toLocaleString(),
            formattedAscend = BR.UnitSystem.formatElevation(stats.filteredAscend),
            formattedPlainAscend = BR.UnitSystem.formatElevation(stats.plainAscend),
            elevationUnit = BR.UnitSystem.getElevationUnit(),
            formattedCost = stats.cost.toLocaleString(),
            meanCostFactor = stats.trackLength
                ? L.Util.formatNum(stats.cost / stats.trackLength, 2).toLocaleString()
                : '0',
            formattedTime =
                Math.trunc(stats.totalTime / 3600) + ':' + ('0' + Math.trunc((stats.totalTime % 3600) / 60)).slice(-2),
            formattedTimeHMS = formattedTime + ':' + ('0' + Math.trunc(stats.totalTime % 60)).slice(-2),
            formattedEnergy = L.Util.formatNum(stats.totalEnergy / 3600000, 2).toLocaleString(),
            meanEnergy = stats.trackLength
                ? L.Util.formatNum(stats.totalEnergy / 36 / stats.trackLength, 2).toLocaleString()
                : '0';

        $('#distance').html(length1);
        // alternative 3-digit format with current unit as tooltip
        $('#distance').attr('title', length3 + ' ' + distanceUnit);
        $('#ascend').html(formattedAscend);
        $('#plainascend').html(formattedPlainAscend);
        // Update unit labels
        $('#distance-unit').html(distanceUnit);
        $('.elevation-unit').html(elevationUnit);
        $('#cost').html(formattedCost);
        $('#meancostfactor').html(meanCostFactor);
        $('#totaltime').html(formattedTime);
        // alternative time format with seconds display as tooltip
        $('#totaltime').attr('title', formattedTimeHMS + ' h');
        $('#totalenergy').html(formattedEnergy);
        $('#meanenergy').html(meanEnergy);
    },

    calcStats(polyline, segments) {
        var stats = {
            trackLength: 0,
            filteredAscend: 0,
            plainAscend: 0,
            totalTime: 0,
            totalEnergy: 0,
            cost: 0,
        };
        var i, props;

        for (i = 0; segments && i < segments.length; i++) {
            props = segments[i].feature.properties;
            stats.trackLength += +props['track-length'];
            stats.filteredAscend += +props['filtered ascend'];
            stats.plainAscend += +props['plain-ascend'];
            stats.totalTime += +props['total-time'];
            stats.totalEnergy += +props['total-energy'];
            stats.cost += +props['cost'];
        }

        return stats;
    },
});
