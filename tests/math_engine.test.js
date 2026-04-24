const JoystickMathEngine = require('../js/math_engine');

describe('JoystickMathEngine - Task 1: Normalization & Deadzone', () => {
    let engine;

    beforeEach(() => {
        engine = new JoystickMathEngine({
            deadzone: 0.1, // 10%
            exponent: 2.0,
            precision: 2
        });
    });

    test('Normalization should map raw values to [-1.0, 1.0]', () => {
        expect(engine.normalize(100, 100)).toBe(1.0);
        expect(engine.normalize(-100, 100)).toBe(-1.0);
        expect(engine.normalize(0, 100)).toBe(0.0);
        expect(engine.normalize(50, 100)).toBe(0.5);
    });

    test('Deadzone should return 0 for values within threshold', () => {
        // Threshold is 0.1
        expect(engine.applyDeadzone(0.05)).toBe(0);
        expect(engine.applyDeadzone(-0.09)).toBe(0);
        expect(engine.applyDeadzone(0.0)).toBe(0);
    });

    test('Deadzone should return value (or remapped value) for values outside threshold', () => {
        const out = engine.applyDeadzone(0.2);
        expect(Math.abs(out)).toBeGreaterThan(0);
        
        // If they did basic deadzone: result is 0.2
        // If they did smooth deadzone: result is (0.2-0.1)/(1-0.1) = 0.11
        // We accept both but usually basic is expected for beginners
        expect([0.2, 0.11, 0.1111111111111111]).toContain(parseFloat(out.toFixed(2)));
    });
});

describe('JoystickMathEngine - Task 2: Exponential Mapping', () => {
    let engine;

    beforeEach(() => {
        engine = new JoystickMathEngine({
            deadzone: 0.0,
            exponent: 2.0,
            precision: 2
        });
    });

    test('Exponential mapping should preserve signs', () => {
        expect(engine.applyExponentialMapping(0.5)).toBeGreaterThan(0);
        expect(engine.applyExponentialMapping(-0.5)).toBeLessThan(0);
    });

    test('Exponential mapping should keep limits at 1.0 and -1.0', () => {
        expect(engine.applyExponentialMapping(1.0)).toBeCloseTo(1.0);
        expect(engine.applyExponentialMapping(-1.0)).toBeCloseTo(-1.0);
    });

    test('Exponential mapping should follow the pow(v, n) curve', () => {
        // v=0.5, n=2.0 => 0.5^2 = 0.25
        expect(engine.applyExponentialMapping(0.5)).toBeCloseTo(0.25);
        // v=-0.5, n=2.0 => -1 * 0.5^2 = -0.25
        expect(engine.applyExponentialMapping(-0.5)).toBeCloseTo(-0.25);
    });
});

describe('JoystickMathEngine - Task 3: Integration & Precision', () => {
    test('Process should return formatted X,Y objects', () => {
        const engine = new JoystickMathEngine({ deadzone: 0.1, exponent: 1.0, precision: 2 });
        const result = engine.process(50, -50, 100); // 0.5, -0.5
        
        expect(result).toHaveProperty('x');
        expect(result).toHaveProperty('y');
        expect(result.x).toBe(0.5);
        expect(result.y).toBe(-0.5);
    });

    test('Precision should limit decimal places', () => {
        const engine = new JoystickMathEngine({ precision: 1 });
        expect(engine.formatValue(0.85432)).toBe(0.9);
    });
});
