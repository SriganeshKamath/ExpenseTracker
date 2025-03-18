// Homepage.js

// Get references to the DOM elements
const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const clearHistoryButton = document.getElementById('clear-history');
const dateInput = document.getElementById('date'); // Reference to the date input
const amountInput = document.getElementById('amount'); // Reference to the amount input
const typeSelect = document.getElementById('type'); // Reference to the type select

// Function to set the default date to today
function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    dateInput.value = today; // Set the value of the date input
}

// Function to add a transaction
function addTransaction(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get values from the form
    const description = document.getElementById('description').value;
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value; // Get the selected type
    const date = dateInput.value; // Get the selected date

    // Create a new list item for the transaction
    const transactionItem = document.createElement('li');

    // Create a span for the description
    const descriptionSpan = document.createElement('span');
    descriptionSpan.textContent = description;
    descriptionSpan.className = 'transaction-description'; // Add class for styling

    // Create a span for the amount
    const amountSpan = document.createElement('span');
    amountSpan.textContent = `${type === 'income' ? '+' : '-'}$${Math.abs(amount).toFixed(2)}`;
    amountSpan.className = 'transaction-amount ' + (type === 'income' ? 'income' : 'expense'); // Add class for styling

    // Create a span for the date
    const dateSpan = document.createElement('span');
    dateSpan.textContent = date;
    dateSpan.className = 'transaction-date'; // Add class for styling

    // Append the spans to the transaction item
    transactionItem.appendChild(descriptionSpan);
    transactionItem.appendChild(amountSpan);
    transactionItem.appendChild(dateSpan);

    // Append the transaction item to the transaction list
    transactionList.appendChild(transactionItem);

    // Clear the form fields
    transactionForm.reset();
    setDefaultDate(); // Reset the date input to today's date after adding a transaction
}

// Function to clear transaction history
function clearHistory() {
    transactionList.innerHTML = ''; // Clear the transaction list
}

// Function to handle Enter key press
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission
        if (event.target === document.getElementById('description')) {
            // If Enter is pressed in the description input, focus on the amount input
            amountInput.focus();
        } else if (event.target === amountInput) {
            // If Enter is pressed in the amount input, focus on the type select
            typeSelect.focus();
        } else if (event.target === typeSelect) {
            // If Enter is pressed in the type select, focus on the date input
            dateInput.focus();
        } else if (event.target === dateInput) {
            // If Enter is pressed in the date input, add the transaction
            addTransaction(event);
        }
    }
}

// Set the default date when the page loads
window.onload = setDefaultDate;

// Event listeners
transactionForm.addEventListener('submit', addTransaction);
clearHistoryButton.addEventListener('click', clearHistory);

// Add keydown event listeners for the inputs
document.getElementById('description').addEventListener('keydown', handleEnterKey);
amountInput.addEventListener('keydown', handleEnterKey);
typeSelect.addEventListener('keydown', handleEnterKey);
dateInput.addEventListener('keydown', handleEnterKey);