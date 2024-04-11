function fetchProductList() {
    productServ
        .getProduct()
        .then(function (response) {
            // console.log("response: ", response.data);
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
                console.log("sp đã bị xóa: ", response);
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
    console.log("sp: ", sp);
  
    productServ
      .addProduct(sp)
      .then(function (response) {
        console.log("response: ", response);
  
        // tắt modal của BS sau khi thêm thành tắt công
        $("#myModal").modal("hide");
        resetForm();
  
        // lấy lại danh sách sp mới nhất từ api
        fetchProductList();
      })
      .catch(function (error) {
        console.log("error: ", error);
      });
  }