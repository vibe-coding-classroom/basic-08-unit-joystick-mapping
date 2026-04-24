const assert = require('assert');
const JoystickMathEngine = require('../js/math_engine');

const engine = new JoystickMathEngine({
    deadzone: 0.1,
    exponent: 2.0,
    precision: 2
});

console.log('🚀 Starting manual verification...');

try {
    // Test Normalization
    console.log('Testing Normalization...');
    assert.strictEqual(engine.normalize(100, 100), 1.0);
    assert.strictEqual(engine.normalize(-100, 100), -1.0);
    assert.strictEqual(engine.normalize(0, 100), 0.0);
    assert.strictEqual(engine.normalize(50, 100), 0.5);

    // Test Deadzone
    console.log('Testing Deadzone...');
    assert.strictEqual(engine.applyDeadzone(0.05), 0);
    assert.strictEqual(engine.applyDeadzone(-0.09), 0);
    
    // Smooth deadzone check: (0.2 - 0.1) / (1.0 - 0.1) = 0.1 / 0.9 = 0.111...
    const dzOut = engine.applyDeadzone(0.2);
    assert.ok(Math.abs(dzOut - 0.111) < 0.01);

    // Test Exponential Mapping
    console.log('Testing Exponential Mapping...');
    // v=0.5, n=2.0 => 0.25
    assert.strictEqual(engine.applyExponentialMapping(0.5), 0.25);
    assert.strictEqual(engine.applyExponentialMapping(-0.5), -0.25);
    assert.strictEqual(engine.applyExponentialMapping(1.0), 1.0);

    // Test Precision
    console.log('Testing Precision...');
    assert.strictEqual(engine.formatValue(0.12345), 0.12);

    // Test Integration
    console.log('Testing Integration...');
    const result = engine.process(50, -100, 100);
    // x: norm=0.5, dz=(0.5-0.1)/0.9 = 0.444, exp=(0.444)^2 = 0.197...
    // y: norm=-1.0, dz=-1.0, exp=-1.0
    assert.ok(result.x > 0);
    assert.strictEqual(result.y, -1.0);

    console.log('✅ ALL TESTS PASSED! 100/100 logic confirmed.');
} catch (error) {
    console.error('❌ TEST FAILED');
    console.error(error);
    process.exit(1);
}
