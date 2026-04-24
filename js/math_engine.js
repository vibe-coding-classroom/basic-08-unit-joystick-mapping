/**
 * Joystick Math Engine
 * Implementation of normalization, deadzone filtering, and exponential mapping.
 */

class JoystickMathEngine {
    constructor(config = {}) {
        this.deadzone = config.deadzone || 0.1; // 10% default
        this.exponent = config.exponent || 2.0; // 2.0 default for exponential mapping
        this.precision = config.precision || 2; // Number of decimal places
    }

    /**
     * Task 1: Normalize physical coordinates to [-1.0, 1.0]
     * @param {number} value - The raw input value
     * @param {number} maxRange - The maximum physical range
     * @returns {number} - Normalized value between -1.0 and 1.0
     */
    normalize(value, maxRange) {
        // TODO: Implement normalization
        // Step 1: Divide value by maxRange to get range [-1, 1]
        // Step 2: Ensure the value doesn't exceed 1.0 or -1.0
        return 0;
    }

    /**
     * Task 1: Apply deadzone filtering
     * @param {number} value - Normalized value [-1.0, 1.0]
     * @returns {number} - Value after applying deadzone (returns 0 if within threshold)
     */
    applyDeadzone(value) {
        // TODO: Implement deadzone logic
        // If absolute value is less than this.deadzone, return 0
        // CHALLENGE: How to avoid a "jump" in value when moving out of the deadzone?
        // (i.e., mapping [deadzone, 1.0] to [0.0, 1.0])
        return 0;
    }

    /**
     * Task 2: Apply Exponential Mapping
     * Formula: output = sgn(input) * pow(abs(input), exponent)
     * @param {number} value - Value after deadzone
     * @returns {number} - Value after exponential mapping
     */
    applyExponentialMapping(value) {
        // TODO: Implement exponential mapping
        // Hint: Math.sign(value), Math.abs(value), Math.pow(...)
        // Ensure that 1.0 remains 1.0 and -1.0 remains -1.0
        return 0;
    }

    /**
     * Task 3: Format and Throttling Helper
     * @param {number} value - Final processed value
     * @returns {number} - Value limited to specific decimal precision
     */
    formatValue(value) {
        return parseFloat(value.toFixed(this.precision));
    }

    /**
     * Process full input chain
     * @param {number} rawX 
     * @param {number} rawY 
     * @param {number} maxRange 
     * @returns {Object} {x, y}
     */
    process(rawX, rawY, maxRange) {
        let nx = this.normalize(rawX, maxRange);
        let ny = this.normalize(rawY, maxRange);

        // Apply Deadzone
        nx = this.applyDeadzone(nx);
        ny = this.applyDeadzone(ny);

        // Apply Mapping (e.g. Exponential)
        let finalX = this.applyExponentialMapping(nx);
        let finalY = this.applyExponentialMapping(ny);

        return {
            x: this.formatValue(finalX),
            y: this.formatValue(finalY)
        };
    }
}

// Export for use in index.html or testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JoystickMathEngine;
}
