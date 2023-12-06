/* pseudo code
------ html structure (check)
------ get values from html inputs into js vars (check)
------ create an object for each product (check)
------ add object to an array of objects (check)
------ loop on array to create an html element (row)  (check)
------ display the above html in index file (document) (check)
*/

/* issues
********* no entries handling
*/

var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productSaleInput = document.getElementById('productSale');
var productDescriptionInput = document.getElementById('productDescription');

var productsList = [];

function addProduct() {

    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        sale: productSaleInput.checked,
        description: productDescriptionInput.value
    }

    productsList.push(product);


    viewProducts();
}

function viewProducts() {
    var content = ``;

    for (var i = 0; i < productsList.length; i++) {

        content += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${productsList[i].name}</td>
                            <td>${productsList[i].price}</td>
                            <td>${productsList[i].category}</td>
                            <td>${productsList[i].sale}</td>
                            <td>${productsList[i].description}</td>
                            <td>
                                <button class="btn btn-warning">Update</button>
                            </td>
                            <td>
                                <button class="btn btn-danger">Delete</button>
                            </td>
                        </tr>
        `;
    }

    document.getElementById('tableContent').innerHTML = content;
}




