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
        if (maxRange === 0) return 0;
        let normalized = value / maxRange;
        
        // Clamp to [-1.0, 1.0]
        return Math.max(-1.0, Math.min(1.0, normalized));
    }

    /**
     * Task 1: Apply deadzone filtering
     * @param {number} value - Normalized value [-1.0, 1.0]
     * @returns {number} - Value after applying deadzone
     */
    applyDeadzone(value) {
        const absVal = Math.abs(value);
        if (absVal <= this.deadzone) {
            return 0;
        }
        
        // Simple deadzone: just return the original value
        return value;
    }

    /**
     * Task 2: Apply Exponential Mapping
     * Formula: output = sgn(input) * pow(abs(input), exponent)
     * @param {number} value - Value after deadzone
     * @returns {number} - Value after exponential mapping
     */
    applyExponentialMapping(value) {
        const absVal = Math.abs(value);
        // Exponential curve while preserving sign
        return Math.sign(value) * Math.pow(absVal, this.exponent);
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
