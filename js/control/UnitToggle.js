/**
 * Unit toggle control for switching between imperial and metric units
 */
BR.UnitToggle = L.Class.extend({
    /**
     * Initialize the unit toggle control
     * @param {Object} options - Configuration options
     * @param {Function} options.onUpdate - Callback to trigger when unit system changes
     */
    initialize(options) {
        this.options = options || {};
        this.miButton = document.getElementById('unit-toggle-mi');
        this.kmButton = document.getElementById('unit-toggle-km');

        if (!this.miButton || !this.kmButton) {
            console.error('Unit toggle buttons not found in DOM');
            return;
        }

        // Set initial active state
        this.updateActiveState();

        // Bind click handlers
        L.DomEvent.on(this.miButton, 'click', () => this.setUnit(BR.UnitSystem.IMPERIAL), this);
        L.DomEvent.on(this.kmButton, 'click', () => this.setUnit(BR.UnitSystem.METRIC), this);

        // Listen for unit system changes from other sources
        window.addEventListener('unitSystemChanged', L.bind(this.onUnitSystemChanged, this));
    },

    /**
     * Set the unit system
     * @param {string} system - 'metric' or 'imperial'
     */
    setUnit(system) {
        if (BR.UnitSystem.getUnitSystem() === system) {
            return; // Already set, no change needed
        }

        BR.UnitSystem.setUnitSystem(system);
        this.updateActiveState();

        // Trigger update callback to refresh all displays
        if (this.options.onUpdate) {
            this.options.onUpdate();
        }
    },

    /**
     * Update the active state of the buttons
     */
    updateActiveState() {
        if (!this.miButton || !this.kmButton) return;

        const isImperial = BR.UnitSystem.isImperial();

        if (isImperial) {
            this.miButton.classList.add('active');
            this.kmButton.classList.remove('active');
        } else {
            this.miButton.classList.remove('active');
            this.kmButton.classList.add('active');
        }
    },

    /**
     * Handle unit system changed event
     */
    onUnitSystemChanged() {
        this.updateActiveState();

        // Trigger update callback to refresh all displays
        if (this.options.onUpdate) {
            this.options.onUpdate();
        }
    },

    /**
     * Cleanup event listeners
     */
    remove() {
        if (this.miButton) {
            L.DomEvent.off(this.miButton, 'click');
        }
        if (this.kmButton) {
            L.DomEvent.off(this.kmButton, 'click');
        }
        window.removeEventListener('unitSystemChanged', L.bind(this.onUnitSystemChanged, this));
    },
});
