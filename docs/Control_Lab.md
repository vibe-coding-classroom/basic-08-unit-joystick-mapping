# Joystick Mapping Lab: Control Quality Report

## Lab 1: Normalization & Deadzone
| Input State | Raw Value (X, Y) | Normalized Value | Deadzone Filtered | Result (Pass/Fail) |
| :--- | :--- | :--- | :--- | :--- |
| **Center (Idle)** | (0, 0) | | | |
| **Center (Small Noise)** | (3, -2) | | | |
| **Full Forward** | (0, 100) | | | |
| **Full Left** | (-100, 0) | | | |

**Observation:**
*   How did the deadzone help stabilize the output when the joystick was at rest?
*   What happens if the deadzone is too large (e.g., 0.5)?

---

## Lab 2: Exponential vs Linear Mapping
Experiment with different `exponent` values (e.g., 1.0, 1.5, 2.0).

| Mapping Mode | Exponent | Output at 20% Input | Output at 50% Input | Output at 100% Input | Control Feel (Description) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Linear** | 1.0 | 0.20 | 0.50 | 1.00 | Direct, but sensitive at start |
| **Soft Start** | 1.5 | | | | |
| **Aggressive Soft** | 2.0 | | | | |

**Analysis:**
*   Why is exponential mapping preferred for precision steering or throttle control?
*   Draw or describe the curve difference between Linear and Exponential.

---

## Lab 3: Throttling & Efficiency
Check your browser's Network Tab or Console logs.

*   **Max Frequency:** ________ ms (Target: 100ms)
*   **Packet Count (30s frantic movement):** ________ packets
*   **Observations:** Describe how the throttling mechanism prevents network congestion while maintaining responsiveness.
