document.getElementById('expense-form').addEventListener('submit', function(e){
    e.preventDefault();
    const expenseName = document.getElementById('expense-name').value;
    const expenseNumber = parseFloat(document.getElementById('expense-amount').value);
    addExpense(expenseName, expenseNumber); 
    saveExpenseToLocalStorage(expenseName, expenseNumber);
    document.getElementById('expense-name').value = ''; 
    document.getElementById('expense-amount').value = '';
})

function addExpense(name, amount){
    const expenseList = document.getElementById('expense-list');
    const listItem = document.createElement('li'); 
    const deleteBtn = document.createElement('button'); 
    listItem.innerHTML = `${name}<span>$${amount.toFixed(2)}</span>`; 
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');
    listItem.appendChild(deleteBtn);
    expenseList.appendChild(listItem);

    updateTotal(amount);

    deleteBtn.addEventListener('click', function(){
        listItem.remove();
        updateTotal(-amount);
        removeExpensesFromLocalStorage(name, amount);
    })
}

function updateTotal(amount){
    const totalAmountElement = document.getElementById('total-amount'); 
    const currentTotal = parseFloat(totalAmountElement.textContent);
    const newTotal = currentTotal + amount;
    totalAmountElement.textContent = newTotal.toFixed(2);
}

function saveExpenseToLocalStorage(name, amount){
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push({name, amount}); 
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function removeExpensesFromLocalStorage(name, amount){
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(expense => expense.name !== name || expense.amount !== amount); 
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpensesFromLocalStorage(){
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => addExpense(expense.name, expense.amount));
}

window.onload = loadExpensesFromLocalStorage;