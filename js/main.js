
// inputs variables
let productNameInput = document.getElementById('productName');
let productPriceInput = document.getElementById('productPrice');
let productCategoryInput = document.getElementById('productCategory');
let productSaleInput = document.getElementById('productSale');
let productDescriptionInput = document.getElementById('productDescription');
let productsSearchInput = document.getElementById('productSearch');

// global variables
let addOrUpdateProductButton = document.getElementById('addOrUpdateProductButton');
let globalIndex;
let productsList = [];

// regex variables
let productNameRegex = /^[^*]{3,16}$/;
let productPriceRegex = /^(1000000|[1-9]\d{3,5})$/;
let productCategoryRegex = /^(?!selectCategory$).*/;

if (localStorage.getItem('products') != null) {
    productsList = JSON.parse(localStorage.getItem('products'));
}

displayProducts();

function addOrUpdateProduct() {

    let nameValidation = validateName();
    let priceValidation = validatePrice();
    let categoryValidation = validateCategory();

    if (!nameValidation) {
        return;
    }

    if (!priceValidation) {
        return;
    }

    if (!categoryValidation) {
        return;
    }

    let product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        sale: productSaleInput.checked,
        description: productDescriptionInput.value
    }

    let operator = addOrUpdateProductButton.dataset.operator;

    if (operator == 'add') {
        productsList.push(product);
    } else if (operator == 'update') {
        productsList.splice(globalIndex, 1, product);
        addOrUpdateProductButton.dataset.operator = 'add';
        addOrUpdateProductButton.classList.replace('btn-outline-warning', 'btn-outline-info');
        addOrUpdateProductButton.innerText = 'Add Product';
    }

    addToLocalStorage();
    clearForm();
    displayProducts();
}

function addToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(productsList));
}

addOrUpdateProductButton.addEventListener('click', addOrUpdateProduct);

function displayProducts() {
    let content = ``;

    productsList.forEach((product, index) => {
        content += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td>${product.category}</td>
                        <td>${product.sale ? 'yes' : 'No'}</td>
                        <td>${product.description}</td>
                        <td>
                            <button onclick="updateProduct(${index})" class="btn btn-warning" type="button">
                                <i class="fa-solid fa-pen-to-square me-2"></i><span>Update</span>
                            </button>
                        </td>
                        <td>
                            <button onclick="deleteProduct(${index})" class="btn btn-danger" type="button">
                                <i class="fa-solid fa-trash me-2"></i><span>Delete</span>
                            </button>
                        </td>
                    </tr>
        `;
    });

    if (content == ``) {
        content = `
                    <tr>
                        <td colspan="8" class="text-uppercase text-danger fw-bold fs-3">no products found</td>
                    </tr>
        `;
    }

    document.getElementById('tableContent').innerHTML = content;
}

function clearForm() {
    productNameInput.value = ``;
    productPriceInput.value = ``;
    productCategoryInput.value = `selectCategory`;
    productSaleInput.checked = false;
    productDescriptionInput.value = ``;
}

document.getElementById('clearFormButton').addEventListener('click', clearForm);

function deleteProduct(index) {
    productsList.splice(index, 1);
    addToLocalStorage();
    displayProducts();
}

function updateProduct(index) {
    globalIndex = index;
    let productToUpdate = productsList[index];

    productNameInput.value = productToUpdate.name;
    productPriceInput.value = productToUpdate.price;
    productCategoryInput.value = productToUpdate.category;
    productSaleInput.checked = productToUpdate.sale;
    productDescriptionInput.value = productToUpdate.description;

    addOrUpdateProductButton.dataset.operator = 'update';
    addOrUpdateProductButton.classList.replace('btn-outline-info', 'btn-outline-warning');
    addOrUpdateProductButton.innerText = 'Confirm changes';
}

document.getElementById('productSearch').addEventListener('keyup', searchProducts);

function searchProducts() {
    let searchValue = productsSearchInput.value.toLowerCase();

    let content = ``;
    productsList.forEach((product, index) => {
        if (product.name.toLowerCase().includes(searchValue)) {
            content += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${product.name.toLowerCase().replace(searchValue, `<span class="rounded mx-1 bg-warning text-dark">${searchValue}</span>`)}</td>
                        <td>${product.price}</td>
                        <td>${product.category}</td>
                        <td>${product.sale ? 'yes' : 'No'}</td>
                        <td>${product.description}</td>
                        <td>
                            <button onclick="updateProduct(${index})" class="btn btn-warning" type="button">
                                <i class="fa-solid fa-pen-to-square me-2"></i><span>Update</span>
                            </button>
                        </td>
                        <td>
                            <button onclick="deleteProduct(${index})" class="btn btn-danger" type="button">
                                <i class="fa-solid fa-trash me-2"></i><span>Delete</span>
                            </button>
                        </td>
                    </tr>
                    `;
        }
    });

    if (content == ``) {
        content = `
                    <tr>
                        <td colspan="8" class="text-uppercase text-danger fw-bold fs-3 text-uppercase text-danger fs-1">no matches</td>
                    </tr>
        `;
    }

    document.getElementById('tableContent').innerHTML = content;
}

// validation 
function regexCheck(regex, input) {
    return regex.test(input);
}

productNameInput.addEventListener('input', validateName);

function validateName() {
    if (regexCheck(productNameRegex, productNameInput.value)) {
        productNameInput.classList.add('is-valid');
        productNameInput.classList.remove('is-invalid');
        document.getElementById('nameAlert').classList.add('d-none');
        return true;
    } else {
        productNameInput.classList.add('is-invalid');
        productNameInput.classList.remove('is-valid');
        document.getElementById('nameAlert').classList.remove('d-none');
        return false;
    }
}

productPriceInput.addEventListener('input', validatePrice);

function validatePrice() {
    if (regexCheck(productPriceRegex, productPriceInput.value)) {
        productPriceInput.classList.add('is-valid');
        productPriceInput.classList.remove('is-invalid');
        document.getElementById('priceAlert').classList.add('d-none');
        return true;
    } else {
        productPriceInput.classList.remove('is-valid');
        productPriceInput.classList.add('is-invalid');
        document.getElementById('priceAlert').classList.remove('d-none');
        return false;
    }
}

productCategoryInput.addEventListener('change', validateCategory)

function validateCategory() {
    if (productCategoryInput.value == 'selectCategory') {
        document.getElementById('categoryAlert').classList.remove('d-none');
        productCategoryInput.classList.add('is-invalid');
        productCategoryInput.classList.remove('is-valid');
        return false;
    } else {
        document.getElementById('categoryAlert').classList.add('d-none');
        productCategoryInput.classList.remove('is-invalid');
        productCategoryInput.classList.add('is-valid');
        return true;
    }
}