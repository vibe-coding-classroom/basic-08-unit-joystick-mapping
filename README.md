# Unit 08: Joystick Mapping - The Art of Control Math

> **Student Name:** [Your Name]
> **Completion Date:** [Date]

## 🎯 Project Overview
In this lab, I implemented the core "Control Math" required for high-precision joystick operation. This includes normalizing raw hardware data, filtering mechanical noise with deadzones, and creating a "pro-feel" with exponential mapping.

## 🛠 Features Implemented
- [ ] **Normalization**: Mapping physical range to a standard `[-1.0, 1.0]` float.
- [ ] **Deadzone Protection**: Ensuring "absolute zero" at the center to prevent motor jitter.
- [ ] **Exponential Mapping**: Smooth low-speed control with full-power capability at the limits.
- [ ] **Network Throttling**: Efficient data transmission to prevent network congestion.

## 📊 Lab Reports
Detailed data comparisons and observations can be found in the [Control Lab Report](docs/Control_Lab.md).

### 1. Mapping Comparison
| Mode | Control Feel Description |
| :--- | :--- |
| **Linear** | [e.g., Very direct, hard to make small adjustments] |
| **Exponential** | [e.g., Silky smooth at low speeds, great for precision] |

### 2. Throttling Proof
![Packet Log Log](assets/packet_log.png)
*(Replace this with a screenshot of your Network Tab or Console logs showing the stable frequency of data packets)*

## 🧠 Reflection
**How does mathematical mapping change the user experience of a remote-controlled system?**
[Your reflection here...]

---
### Getting Started
1. Open `index.html` in your browser.
2. Open `js/math_engine.js` and implement the TODO sections.
3. Test your logic using the interactive UI and update the reports.
