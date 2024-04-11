var productList = [];
var cartList = [];
function fetchProductList() {
    productServ
        .getProduct()
        .then(function (response) {
            productList.push(...response.data)
            renderProductList(response.data);
        })
        .catch(function (err) {
            console.log("err", err);
        });
}
fetchProductList();

console.log(productList);

function addProduct(id){
    var selectedProduct = productList.findIndex(function(product){
        return product.id === id;
    })
    if(selectedProduct != -1){
        cartList.push(productList[selectedProduct])
    }
}

console.log(cartList);

console.log(productList[2]);