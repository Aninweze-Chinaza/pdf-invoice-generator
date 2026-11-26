const tbody = document.getElementById("items-tbody");
const addItemBtn = document.getElementById("add-item-btn");
const currencySelect = document.getElementById("currency-select");
const taxRateInput = document.getElementById("tax-rate");
const discountInput = document.getElementById("discount-amount");
const subtotalEl = document.getElementById("subtotal-display");
const totalEl = document.getElementById("total-display");
const printBtn = document.getElementById("print-btn");
const resetBtn = document.getElementById("reset-btn");
const issueDateInput = document.getElementById("issue-date");
const dueDateInput = document.getElementById("due-date");

function formatMoney(amount) {
const symbol = currencySelect.value;
const safeNumber = Number.isFinite(amount) ? amount : 0;
return `${symbol}${safeNumber.toLocaleString("en-US", {
minimumFractionDigits: 2,
maximumFractionDigits: 2
})}`;
}

function recalculate() {
let subtotal = 0;

tbody.querySelectorAll(".item-row").forEach((row) => {
const qty = parseFloat(row.querySelector(".item-qty").value) || 0;
const rate = parseFloat(row.querySelector(".item-rate").value) || 0;
const lineTotal = qty * rate;
subtotal += lineTotal;
row.querySelector(".item-total").textContent = formatMoney(lineTotal);
});

const taxPercent = Math.max(0, parseFloat(taxRateInput.value) || 0);
const discount = Math.max(0, parseFloat(discountInput.value) || 0);
const taxAmount = subtotal * (taxPercent / 100);
const total = Math.max(0, subtotal + taxAmount - discount);

subtotalEl.textContent = formatMoney(subtotal);
totalEl.textContent = formatMoney(total);
}

function addRow(desc = "", qty = "", rate = "", shouldFocus = false) {
const tr = document.createElement("tr");
tr.className = "item-row";
tr.innerHTML = `
<td>
<input type="text" name="item-desc[]" class="item-desc" placeholder="Service or deliverable description" value="${desc}" aria-label="Item description">
</td>
<td>
<input type="number" name="item-qty[]" class="item-qty" min="1" step="1" placeholder="1" value="${qty}" aria-label="Quantity">
</td>
<td>
<input type="number" name="item-rate[]" class="item-rate" min="0" step="0.01" placeholder="0.00" value="${rate}" aria-label="Unit rate">
</td>
<td class="item-total">${formatMoney((parseFloat(qty) || 0) * (parseFloat(rate) || 0))}</td>
<td class="no-print">
<button type="button" class="remove-row-btn" aria-label="Remove item">×</button>
</td>
`;
tbody.appendChild(tr);
recalculate();

if (shouldFocus) {
tr.querySelector(".item-desc").focus();
if (statusEl) statusEl.textContent = "New line item added.";
}
}

function setDefaultDates() {
const today = new Date();
const due = new Date(today);
due.setDate(today.getDate() + 14);

if (issueDateInput && !issueDateInput.value) {
issueDateInput.value = today.toISOString().split("T")[0];
}
if (dueDateInput && !dueDateInput.value) {
dueDateInput.value = due.toISOString().split("T")[0];
}
}

addItemBtn.addEventListener("click", () => addRow("", "", "", true));

tbody.addEventListener("input", (event) => {
if (event.target.matches(".item-qty, .item-rate")) {
recalculate();
}
});

tbody.addEventListener("click", (event) => {
const removeBtn = event.target.closest(".remove-row-btn");
if (!removeBtn) return;

const rows = tbody.querySelectorAll(".item-row");
if (rows.length > 1) {
removeBtn.closest(".item-row").remove();
recalculate();
}
});

[currencySelect, taxRateInput, discountInput].forEach((el) => {
el.addEventListener("input", recalculate);
el.addEventListener("change", recalculate);
});

printBtn.addEventListener("click", () => {
const fromName = document.getElementById("from-name").value.trim();
const toName = document.getElementById("to-name").value.trim();
const hasValidItem = Array.from(tbody.querySelectorAll(".item-row")).some((row) => {
const desc = row.querySelector(".item-desc").value.trim();
const rate = parseFloat(row.querySelector(".item-rate").value) || 0;
return desc !== "" && rate > 0;
});

if (!fromName || !toName || !hasValidItem) {
alert("Please enter your business name, client name, and at least one item with a price before printing.");
return;
}

window.print();
});

resetBtn.addEventListener("click", () => {
tbody.innerHTML = "";
addRow();
taxRateInput.value = 0;
discountInput.value = 0;
recalculate();
});

setDefaultDates();
recalculate();