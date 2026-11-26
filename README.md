# Zero-Fee PDF Invoice Generator (HTML • CSS • JS)

A lightweight, browser-based invoice generator built with pure HTML5, CSS3, and vanilla JavaScript. No monthly subscriptions, no backend servers, and no external libraries required.

---

## Features
* **Multi-Currency Support:** Switch instantly between NGN (`₦`), USD (`$`), EUR (`€`), and GBP (`£`).
* **Automatic Calculations:** Live row totals, subtotal, percentage tax, and fixed discount math.
* **Clean PDF Export:** Dedicated `@media print` stylesheet strips away buttons, backgrounds, and empty placeholders so your invoice prints on clean A4 paper.
* **Responsive & Accessible:** Works on desktop, tablet, and mobile devices with full keyboard navigation and screen-reader support.

---

## Quick Customization Guide
1. **Change the Default Currency:** Open `index.html`, find `<select id="currency-select">`, and move the `selected` attribute to your preferred `<option>`.
2. **Change the Accent Color:** Open `style.css` and replace `#A3E635` (lime accent) and `#365314` / `#3F6212` (dark green labels) with your own brand hex color.
3. **Host Anywhere:** Upload the folder to Cloudflare Pages, GitHub Pages, Netlify, or any standard web host.

---

## Files Included
* `index.html` — Invoice layout and form structure
* `style.css` — Screen layout, responsive breakpoints, and `@media print` PDF rules
* `script.js` — Live line-item calculation, currency formatting, and validation
* `README.md` — Setup and customization guide