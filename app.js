/* selector  */
const invoiceBtn = document.getElementById("create-invoice");
const modal = document.getElementById("invoice-modal");
const buyerInfo = document.getElementById("buyer-details");
const invoiceNumber = document.getElementById("invoice-number");
const itemName = document.getElementsByClassName('item-name');
const itemPrice = document.getElementsByClassName('item-price');
const itemQty = document.getElementsByClassName('item-qty');
const itemTotal = document.getElementsByClassName('item-total');
const itemLists = document.getElementById("items-list");
const itemInputList = document.querySelector("#item-input-list");

/* 1. add input items in table  */
function addLineInputItem() {
    const createTr = document.createElement('tr');
    createTr.innerHTML = `<td><input type="text" placeholder="Item name" class="item-name"></td>
                          <td><input type="number" placeholder="Item Price" class="item-price"></td>
                          <td><input type="number" placeholder="Item Quantity" class="item-qty"></td>
                          <td><input type="number" readonly placeholder="00" class="item-total"></td>
                          <td><button class="item-delete" >&times;</button></td>`;
    itemInputList.appendChild(createTr);
    deleteLineItem();
    blurring()
    calculateTwoItem()
}
/* 2. delete item input in table  */
function deleteLineItem() {
    const itemDelete = document.getElementsByClassName("item-delete");
    for (let item of itemDelete) {
        item.addEventListener('click', function () {
            item.closest('tr').remove();
        })
    }

}
/* 3. get all of items particularly  */
function calculateTwoItem() {
    let priceAmount = 0;
    let quantity = 0;
    let totalItem;
    // get item name 
    for (let price of itemPrice) {
        priceAmount = parseFloat(price.value);
    }
    // get item qty 
    for (let qty of itemQty) {
        quantity = parseFloat(qty.value);
        totalItem = qty.parentElement.nextElementSibling.querySelector('input');
    }
    let result = priceAmount * quantity;
    totalItem.value = result;
    calculateGrandTotal();

}
//  blurring  
function blurring() {
    for (let item of itemPrice) {
        item.addEventListener('blur', calculateTwoItem);
    }
    for (let quantity of itemQty) {
        quantity.addEventListener('blur', calculateTwoItem);
    }
}

// call all of function
blurring()
deleteLineItem();


/* 4. function for create element for invoice table inside of invoice  */

function createInvoiceElement() {
    let trElements = itemInputList.getElementsByTagName('tr');
    for (var i = 0; i < trElements.length; i++) {
        let item_name = trElements[i].querySelector('.item-name').value;
        let item_price = trElements[i].querySelector('.item-price').value;
        let item_qty = trElements[i].querySelector('.item-qty').value;
        let itemTotalAmount = trElements[i].querySelector('.item-total').value;
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        const price_td = document.createElement('td');
        const qty_td = document.createElement('td');
        const total_td = document.createElement('td');
        th.innerText = item_name;
        price_td.innerText = item_price;
        qty_td.innerText = item_qty;
        total_td.innerText = itemTotalAmount;
        tr.appendChild(th);
        tr.appendChild(price_td);
        tr.appendChild(qty_td);
        tr.appendChild(total_td);
        itemLists.appendChild(tr);
    }
    clearInputField();

}



/* 5. function for random invoice numbers  */
function randomInvoice() {
    let randInv = Math.floor(Math.random() * 150000);
    invoiceNumber.value = `#inv-${randInv}`;
}

randomInvoice();

/* 6. function for today date  */
function todayDate() {
    let date = new Date();
    document.getElementById("today-date").innerText = date.toLocaleDateString();
}

/* 7. function for create invoice  */

invoiceBtn.addEventListener("click", function () {
    // get all input value for validations 
    let buyerValue = buyerInfo.value;
    let invNumber = invoiceNumber.value;
    let item_name_value = '';
    let item_price_value;
    let item_qty_value;
    for (let item_name of itemName) {
        item_name_value = item_name.value;
    }
    for (let item_price of itemPrice) {
        item_price_value = item_price.value;
    }
    for (let item_qty of itemQty) {
        item_qty_value = item_qty.value;
    }

    if (buyerValue === '' || item_name_value === '' || item_price_value === '' || item_price_value < 0 || item_qty_value < 0 || item_qty_value === '') {
        alert("Please Enter All Required Fields.");
    } else {
        document.querySelector(".text").style.opacity = '0';
        document.querySelector('.spin').style.opacity = '1';
        setTimeout(() => {
            createInvoiceElement();
            // set buyer info 
            document.getElementById("buyer-info").innerText = buyerValue;
            // set invoice id 
            document.getElementById('invoice-id').innerText = invNumber;
            // call function 
            todayDate();
            showModal()
        }, 3000);

    }
})



/* 8. show modal function */

function showModal() {
    modal.classList.add("active");
    modal.querySelector('.close-btn').addEventListener('click', function () {
        modal.classList.remove('active');
        document.querySelector(".text").style.opacity = '1';
        document.querySelector('.spin').style.opacity = '0';
    })
}

/* 9. Empty all field when created invoice  */
function clearInputField() {
    buyerInfo.value = '';
    for (let price of itemPrice) {
        price.parentElement.parentElement.remove();
    }
    for (let qty of itemQty) {
        qty.parentElement.parentElement.remove();
    }
    for (let name of itemName) {
        name.parentElement.parentElement.remove();
    }
    for (let totalItem of itemTotal) {
        totalItem.parentElement.parentElement.remove();
    }
}

/* 10. get sub total */

function calculateGrandTotal() {
    let totalSubAmount = 0;
    for (let item_total of itemTotal) {
        totalSubAmount = totalSubAmount + parseFloat(item_total.value);
    }
    // set sub total 
    document.getElementById('sub-total').innerText = totalSubAmount;
    // calculate tax 
    document.getElementById('tax').innerText = (totalSubAmount * 0.2).toFixed(2);
    // calculate grand total 
    document.getElementById('grand-total').innerText = totalSubAmount + (totalSubAmount * 0.2);
    document.getElementById('grand-total-1').innerText = totalSubAmount + (totalSubAmount * 0.2);

};