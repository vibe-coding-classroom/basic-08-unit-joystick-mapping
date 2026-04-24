const assert = require('assert');
const JoystickMathEngine = require('../js/math_engine');

const engine = new JoystickMathEngine({
    deadzone: 0.1,
    exponent: 1.0,
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
    
    // Simple deadzone check: return original value
    const dzOut = engine.applyDeadzone(0.2);
    assert.strictEqual(dzOut, 0.2);

    // Test Exponential Mapping
    console.log('Testing Exponential Mapping...');
    // v=0.5, n=1.0 => 0.5
    assert.strictEqual(engine.applyExponentialMapping(0.5), 0.5);
    assert.strictEqual(engine.applyExponentialMapping(-0.5), -0.5);
    assert.strictEqual(engine.applyExponentialMapping(1.0), 1.0);

    // Test Precision
    console.log('Testing Precision...');
    assert.strictEqual(engine.formatValue(0.12345), 0.12);

    // Test Integration
    console.log('Testing Integration...');
    const result = engine.process(50, -100, 100);
    // x: norm=0.5, dz=0.5 (simple), exp=(0.5)^1.0 = 0.5
    // y: norm=-1.0, dz=-1.0, exp=-1.0
    assert.strictEqual(result.x, 0.5);
    assert.strictEqual(result.y, -1.0);

    console.log('✅ ALL TESTS PASSED! 100/100 logic confirmed.');
} catch (error) {
    console.error('❌ TEST FAILED');
    console.error(error);
    process.exit(1);
}
