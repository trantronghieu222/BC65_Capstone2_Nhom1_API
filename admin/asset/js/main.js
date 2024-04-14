// Hàm validate
function validateSP(name, price, screen, backCamera, frontCamera, img, desc, type) {
    isValid = kiemTraRong(name, "#tbName", "Không được để trống tên");
    isValid &= kiemTraRong(price, "#tbPrice", "Không được để trống giá tiền");
    isValid &= kiemTraRong(screen, "#tbScreen", "Không được để trống screen");
    isValid &= kiemTraRong(backCamera, "#tbBackCamera", "Không được để trống backCamera");
    isValid &= kiemTraRong(frontCamera, "#tbFrontCamera", "Không được để trống frontCamera");
    isValid &= kiemTraRong(img, "#tbImg", "Không được để trống hình ảnh");
    isValid &= kiemTraRong(desc, "#tbDesc", "Không được để trống desc");
    isValid &= kiemTraDropdown(type, "#tbType", "Kiểu không hợp lệ");
    return isValid;
}

// In sp
function fetchProductList() {
    productServ
        .getProduct()
        .then(function (response) {
            renderProductList(response.data);
        })
        .catch(function (err) {
            console.log("err", err);
        });
}
fetchProductList();

// Xóa sp
function delProduct(id) {
    var result = confirm("Bạn có chắc chắn xóa?");
    if (result === true) {
        productServ
            .delProductByID(id)
            .then(function (response) {
                fetchProductList();
            })
            .catch(function (err) {
                console.log("err: ", err);
            });
        alert("Xóa thành công!");
    }
}


// thêm sp
function addProduct() {
    var sp = getInfo();
    // console.log("sp: ", sp);
    isValid = validateSP(sp.name, sp.price, sp.screen, sp.backCamera, sp.frontCamera, sp.img, sp.desc, sp.type);
    // console.log(isValid);
    if (isValid) {
        productServ
            .addProduct(sp)
            .then(function (response) {
                // console.log("response: ", response);
                // tắt modal của BS sau khi thêm thành tắt công
                $("#myModal").modal("hide");
                resetForm();
                // lấy lại danh sách sp mới nhất từ api
                fetchProductList();
                alert("Thêm thành công");
            })
            .catch(function (error) {
                console.log("error: ", error);
            });
    }
}

// Cập nhật sp
function editProduct(id) {
    // Ẩn button thêm và hiện button cập nhật
    handleBtnBlock("#btnCapNhat");
    handleBtnNone("#btnThemSP");
    productServ
        .getProductByID(id)
        .then(function (response) {
            // console.log("response: ", response.data);
            var sp = response.data;
            // hiển thị thông sp cần sửa lên modal
            document.getElementById("MaSP").value = sp.id;
            document.getElementById("name").value = sp.name;
            document.getElementById("price").value = sp.price;
            document.getElementById("screen").value = sp.screen;
            document.getElementById("backCamera").value = sp.backCamera;
            document.getElementById("frontCamera").value = sp.frontCamera;
            document.getElementById("img").value = sp.img;
            document.getElementById("desc").value = sp.desc;
            document.getElementById("type").value = sp.type;
            // mở modal
            $("#myModal").modal("show");
        })
        .catch(function (err) {
            console.log("err: ", err);
        });
}

function updateProduct() {
    var sp = getInfo();
    isValid = validateSP(sp.name, sp.price, sp.screen, sp.backCamera, sp.frontCamera, sp.img, sp.desc, sp.type);
    // console.log("sp: ", sp);
    if (isValid) {
        productServ
            .updateProductByID(sp.id, sp)
            .then(function (response) {
                // console.log("response: ", response);
                //tắt modal sau khi update thành công
                $("#myModal").modal("hide");
                resetForm();
                // lấy lại data mới nhất
                fetchProductList();
                alert("Cập nhật thành công");
            })
            .catch(function (err) {
                console.log("err: ", err);
            });
    }
}

/* Tìm kiếm */
function searchProductByName() {
    var name = document.querySelector("#searchName").value.trim().toLowerCase();
    productServ
        .getProduct()
        .then(function (response) {
            // console.log("response: ", response);
            // array data
            var productList = response.data;
            // tìm kiếm tên người dùng nhập
            var result = productList.filter(function (sp) {
                return sp.name.toLowerCase().includes(name);
            });
            // render lại kết quả tìm thấy
            renderProductList(result);
        })
        .catch(function (err) {
            console.log("err", err);
        });
}

document
    .querySelector("#searchName")
    .addEventListener("keydown", function (event) {
        if (event.key !== "Enter") return;
        var name = event.target.value;
        productServ
            .getProduct(name)
            .then(function (response) {
                renderProductList(response.data);
            })
            .catch(function (err) {
                console.log("err: ", err);
            });
    });


/* Sắp xếp */
document.querySelector("#sortProduct").onchange = function () {
    var value = document.querySelector("#sortProduct").value;
    productServ
        .getProduct()
        .then(function (response) {
            if (value == "giam") {
                // console.log("response: ", response.data);
                var sortDown = sortByPriceDescending(response.data);
                renderProductList(sortDown);
                // console.log("response: ", sortDown);
            }
            else if (value == "tang") {
                // console.log("response: ", response.data);
                var sortUp = sortByPriceAscending(response.data);
                renderProductList(sortUp);
                // console.log("response: ", sortUp);
            }
            else {
                renderProductList(response.data);
                // console.log("response: ", response.data);
            }
        })
        .catch(function (err) {
            console.log("err", err);
        });
}

// reset form
function resetForm() {
    document.getElementById("MaSP").value = "";
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("screen").value = "";
    document.getElementById("backCamera").value = "";
    document.getElementById("frontCamera").value = "";
    document.getElementById("img").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("type").value = "Type";

    document.getElementById("tbName").classList.remove("d-block");
    document.getElementById("tbPrice").classList.remove("d-block");
    document.getElementById("tbScreen").classList.remove("d-block");
    document.getElementById("tbBackCamera").classList.remove("d-block");
    document.getElementById("tbFrontCamera").classList.remove("d-block");
    document.getElementById("tbImg").classList.remove("d-block");
    document.getElementById("tbDesc").classList.remove("d-block");
    document.getElementById("tbType").classList.remove("d-block");
}

document.querySelector("#btnDong").onclick = function () {
    resetForm();
}

// Hiện btn thêm và ẩn button cập nhật
document.querySelector("#btnThem").onclick = function(){
    handleBtnBlock("#btnThemSP");
    handleBtnNone("#btnCapNhat");
}