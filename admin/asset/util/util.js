// Hàm để sắp xếp mảng dữ liệu theo giá tiền tăng dần
function sortByPriceAscending(data) {
    return data.sort((a, b) => a.price - b.price);
}

// Hàm để sắp xếp mảng dữ liệu theo giá tiền giảm dần
function sortByPriceDescending(data) {
    return data.sort((a, b) => b.price - a.price);
}

// Hàm thêm d-block
function handleBtnBlock(selector) {
    document.querySelector(selector).classList.remove("d-none");
    document.querySelector(selector).classList.add("d-block");
}

// Hàm thêm d-none
function handleBtnNone(selector) {
    document.querySelector(selector).classList.remove("d-block");
    document.querySelector(selector).classList.add("d-none");
}
