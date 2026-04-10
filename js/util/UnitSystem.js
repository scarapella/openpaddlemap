/**
 * Utility for managing unit system preference (imperial/metric)
 * and converting between units.
 */
BR.UnitSystem = {
    /**
     * Unit system constants
     */
    METRIC: 'metric',
    IMPERIAL: 'imperial',

    /**
     * Local storage key
     */
    STORAGE_KEY: 'unitSystem',

    /**
     * Conversion constants
     */
    METERS_TO_FEET: 3.28084,
    METERS_TO_MILES: 0.000621371,
    KILOMETERS_TO_MILES: 0.621371,

    /**
     * Get the current unit system preference
     * @returns {string} 'metric' or 'imperial'
     */
    getUnitSystem() {
        if (BR.Util.localStorageAvailable()) {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored === this.METRIC || stored === this.IMPERIAL) {
                return stored;
            }
        }
        // Default to imperial (miles)
        return this.IMPERIAL;
    },

    /**
     * Set the unit system preference
     * @param {string} system - 'metric' or 'imperial'
     */
    setUnitSystem(system) {
        if (system !== this.METRIC && system !== this.IMPERIAL) {
            throw new Error('Invalid unit system: ' + system);
        }

        if (BR.Util.localStorageAvailable()) {
            localStorage.setItem(this.STORAGE_KEY, system);
        }

        // Trigger custom event so other components can react
        if (typeof window.CustomEvent === 'function') {
            window.dispatchEvent(new CustomEvent('unitSystemChanged', { detail: { system } }));
        }
    },

    /**
     * Toggle between metric and imperial
     * @returns {string} The new unit system
     */
    toggleUnitSystem() {
        const current = this.getUnitSystem();
        const newSystem = current === this.METRIC ? this.IMPERIAL : this.METRIC;
        this.setUnitSystem(newSystem);
        return newSystem;
    },

    /**
     * Check if currently using imperial units
     * @returns {boolean}
     */
    isImperial() {
        return this.getUnitSystem() === this.IMPERIAL;
    },

    /**
     * Check if currently using metric units
     * @returns {boolean}
     */
    isMetric() {
        return this.getUnitSystem() === this.METRIC;
    },

    /**
     * Convert meters to the current distance unit
     * @param {number} meters - Distance in meters
     * @returns {number} Distance in miles or kilometers
     */
    convertDistance(meters) {
        if (this.isImperial()) {
            return meters * this.METERS_TO_MILES;
        }
        return meters / 1000; // convert to kilometers
    },

    /**
     * Convert meters to the current elevation unit
     * @param {number} meters - Elevation in meters
     * @returns {number} Elevation in feet or meters
     */
    convertElevation(meters) {
        if (this.isImperial()) {
            return meters * this.METERS_TO_FEET;
        }
        return meters;
    },

    /**
     * Format distance with appropriate decimal places
     * @param {number} meters - Distance in meters
     * @param {number} decimals - Number of decimal places (default: 1)
     * @returns {string} Formatted distance
     */
    formatDistance(meters, decimals = 1) {
        const distance = this.convertDistance(meters);
        return L.Util.formatNum(distance, decimals).toLocaleString();
    },

    /**
     * Format distance with extended precision (for tooltips)
     * @param {number} meters - Distance in meters
     * @returns {string} Formatted distance with 3 decimal places
     */
    formatDistancePrecise(meters) {
        const distance = this.convertDistance(meters);
        return L.Util.formatNum(distance, 3).toLocaleString(undefined, {
            minimumFractionDigits: 3,
        });
    },

    /**
     * Format distance for analysis tables (2 decimal places)
     * @param {number} meters - Distance in meters
     * @returns {string} Formatted distance
     */
    formatDistanceAnalysis(meters) {
        const distance = this.convertDistance(meters);
        return distance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    },

    /**
     * Get the distance unit label (abbreviated)
     * @returns {string} 'mi' or 'km'
     */
    getDistanceUnit() {
        return this.isImperial() ? i18next.t('footer.mile-abbrev') : i18next.t('footer.kilometer-abbrev');
    },

    /**
     * Get the distance unit label (full)
     * @returns {string} 'miles' or 'kilometers'
     */
    getDistanceUnitFull() {
        return this.isImperial() ? i18next.t('footer.mile') : i18next.t('footer.kilometer');
    },

    /**
     * Get the elevation unit label (abbreviated)
     * @returns {string} 'ft' or 'm'
     */
    getElevationUnit() {
        return this.isImperial() ? i18next.t('footer.feet-abbrev') : i18next.t('footer.meter-abbrev');
    },

    /**
     * Get the elevation unit label (full)
     * @returns {string} 'feet' or 'meters'
     */
    getElevationUnitFull() {
        return this.isImperial() ? i18next.t('footer.feet') : i18next.t('footer.meter');
    },

    /**
     * Format elevation value
     * @param {number} meters - Elevation in meters
     * @returns {string} Formatted elevation
     */
    formatElevation(meters) {
        const elevation = this.convertElevation(meters);
        return Math.round(elevation).toLocaleString();
    },
};
