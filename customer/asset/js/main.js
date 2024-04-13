/* Hiển thị sản phẩm tử API ra giao diện */
function fetchProductList() {
    productServ
        .getProduct()
        .then(function (response) {
            // console.log(response.data);
            renderProductList(response.data);
        })
        .catch(function (err) {
            console.log("err", err);
        });
}
fetchProductList();

/* Lọc sản phẩm */
function filterProduct() {
    var type = document.querySelector("#dropdownProduct").value;
    productServ
        .getProduct()
        .then(function (response) {
            var productList = response.data;
            var result = productList.filter(function (item) {
                return item.type.toLowerCase().includes(type);
            })
            // Render sp
            renderProductList(result);
        })
        .catch(function (err) {
            console.log("err", err);
        });
}

/* Tạo một mảng danh sách giỏ hàng */
var DSGH = [];

/* Lấy thông tin sản phẩm từ Local Storage và hiển thị trên màn hình */
var jsonData = localStorage.getItem("CartList_Local");
if (jsonData != null) {
    // Chuyển thành mảng JavaScript
    jsonData = JSON.parse(jsonData);
    //
    DSGH = jsonData.map(function (pdata) {
        return new cart(pdata.name, pdata.price, pdata.screen, pdata.backCamera, pdata.frontCamera, pdata.img, pdata.desc, pdata.type, pdata.id, pdata.quantity);
    });
    renderCart(DSGH);
}
// console.log(DSGH);

/* Tính số lượng sản phẩm */
function countProduct(DSGH) {
    var count = 0;
    for (var i = 0; i < DSGH.length; i++) {
        count += DSGH[i].quantity;
    }
    document.querySelector(".bag-count").innerHTML = count;
    document.querySelector(".count").innerHTML = count;
}
countProduct(DSGH);

/* Tính subtotal */
function subtotal(DSGH) {
    var sum = 0;
    for (var i = 0; i < DSGH.length; i++) {
        sum += (DSGH[i].quantity * DSGH[i].price);
    }
    document.querySelector(".amount").innerHTML = `$${sum}`;
}
subtotal(DSGH);

/* Hàm cập nhật giỏ hàng */
function updateCart(DSGH) {
    saveLocalStorage(DSGH);
    renderCart(DSGH);
    subtotal(DSGH);
    countProduct(DSGH);
}

/* Thêm sản phẩm */
function addToCart(id) {
    productServ
        .getProductByID(id)
        .then(function (response) {
            var pdata = response.data;
            var cartIndex = DSGH.findIndex(function (item) {
                return item.id === response.data.id;
            })
            if (cartIndex == -1) {
                var qty = +document.getElementById(`qty-input-${pdata.id}`).value;
                var cartList = new cart(pdata.name, pdata.price, pdata.screen, pdata.backCamera, pdata.frontCamera, pdata.img, pdata.desc, pdata.type, pdata.id, qty);
                DSGH.push(cartList);
                updateCart(DSGH);
                alert("Thêm thành công");
                // Đặt lại số lượng = 1
                document.getElementById(`qty-input-${pdata.id}`).value = 1;
            }
            else {
                // Xử lý giỏ hàng khi thêm sp đã tồn tại trong giỏ
                // Lấy giá trị của ô input tại id của sp đc chọn
                var qty = +document.getElementById(`qty-input-${pdata.id}`).value;
                // Cộng với số lượng sp hiện tại trong giỏ hàng
                DSGH[cartIndex].quantity += qty;
                updateCart(DSGH);
                alert("Thêm thành công");
                // Đặt lại số lượng = 1
                document.getElementById(`qty-input-${pdata.id}`).value = 1;
            }
        })
        .catch(function (err) {
            console.log("err", err);
        });
}

/* Xóa sản phẩm */
function delProductCart(id) {
    var index = DSGH.findIndex(function (item) {
        return item.id == id;
    })
    if (index != -1) {
        const result = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
        if (result == true) {
            DSGH.splice(index, 1);
            updateCart(DSGH);
            alert("xóa thành công!");
        }
    }
}

/* giảm sl sp trong giỏ hàng */
function handleMinus(id) {
    var quantity = +document.getElementById(`qty-cartInput-${id}`).value;
    quantity = quantity - 1
    var index = DSGH.findIndex(function (item) {
        return item.id == id;
    })
    if (quantity > 0) {
        // console.log(DSGH[index]);
        DSGH[index].quantity = quantity;
        updateCart(DSGH);
    }
    else {
        delProductCart(id);
    }
}

/* tăng sl sp trong giỏ hàng */
function handlePlus(id) {
    var quantity = +document.getElementById(`qty-cartInput-${id}`).value;
    var index = DSGH.findIndex(function (item) {
        return item.id == id;
    })
    // console.log(DSGH[index]);
    DSGH[index].quantity = quantity + 1;
    updateCart(DSGH);
}

/* Clear giỏ hàng */
document.querySelector(".checkout-button").onclick = function () {
    DSGH = [];
    saveLocalStorage(DSGH)
    renderCart(DSGH);
    // Tính amout 
    subtotal(DSGH);
    // Tính lại tổng sl sản phẩm khi xóa
    countProduct(DSGH);
}