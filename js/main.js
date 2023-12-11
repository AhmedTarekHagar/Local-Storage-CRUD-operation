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
var searchInput = document.getElementById('searchInput');

var productIndexGlobal;

var productsList = [];
viewProducts();

if (localStorage.getItem('products') != null) {
    productsList = JSON.parse(localStorage.getItem('products'));
    viewProducts();
}

function addProduct() {

    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        sale: productSaleInput.checked,
        description: productDescriptionInput.value
    }

    if (document.getElementById('insertProduct').innerHTML == "Add Product") {
        productsList.push(product);
    } else if (document.getElementById('insertProduct').innerHTML == "Update Product") {
        productsList.splice(productIndexGlobal, 1, product);
        document.getElementById('insertProduct').innerHTML = 'Add Product';
        document.getElementById('insertProduct').classList.add('btn-outline-success');
        document.getElementById('insertProduct').classList.remove('btn-info');
    }

    addToLocalStorage();
    clearForm();
    viewProducts();
}

function addToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(productsList));
}

function clearForm() {
    productNameInput.value = ``;
    productPriceInput.value = ``;
    productSaleInput.checked = false;
    productDescriptionInput.value = ``;
}

function viewProducts() {
    if (localStorage.getItem('products') == null) {
        document.getElementById('tableContent').innerHTML = `<tr>
        <td colspan="8" class="fw-bold text-danger">No Products Found</td>
    </tr>`
    } else {
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
                                <button onclick="updateProduct(${i})" class="btn btn-warning">Update</button>
                            </td>
                            <td>
                                <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
                            </td>
                        </tr>
        `;
        }

        document.getElementById('tableContent').innerHTML = content;
    }
}

function search() {
    var searchValue = searchInput.value.toLowerCase();

    var content = ``;

    for (var i = 0; i < productsList.length; i++) {
        if (productsList[i].name.toLowerCase().includes(searchValue)) {
            content += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${productsList[i].name}</td>
                            <td>${productsList[i].price}</td>
                            <td>${productsList[i].category}</td>
                            <td>${productsList[i].sale}</td>
                            <td>${productsList[i].description}</td>
                            <td>
                                <button onclick="updateProduct(${i})" class="btn btn-warning">Update</button>
                            </td>
                            <td>
                                <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                        `;
        }
    }

    document.getElementById('tableContent').innerHTML = content;

}

function deleteProduct(productIndex) {
    productsList.splice(productIndex, 1);
    addToLocalStorage();
    viewProducts();
}

function updateProduct(productIndex) {
    productNameInput.value = productsList[productIndex].name;
    productPriceInput.value = productsList[productIndex].price;
    productCategoryInput.value = productsList[productIndex].category;
    productSaleInput.checked = productsList[productIndex].sale;
    productDescriptionInput.value = productsList[productIndex].description;
    productIndexGlobal = productIndex;
    document.getElementById('insertProduct').innerHTML = 'Update Product';
    document.getElementById('insertProduct').classList.remove('btn-outline-success');
    document.getElementById('insertProduct').classList.add('btn-info');
}

function clearAll() {
    localStorage.removeItem('products');
    viewProducts();
}


