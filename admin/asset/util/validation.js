/* --------------- Hàm kiểm tra rỗng --------------- */
function kiemTraRong(value, idErr, message) {
    if (value.trim() === "") {
        document.querySelector(idErr).innerHTML = message;
        document.querySelector(idErr).classList.add("d-block");
        return false;
    }
    else {
        document.querySelector(idErr).innerHTML = "";
        document.querySelector(idErr).classList.remove("d-block");
        return true;
    }
}
/* --------------- Kiểm tra dropdown --------------- */
function kiemTraDropdown(value, idErr, message) {
    if (value === "Type") {
        document.querySelector(idErr).innerHTML = message;
        document.querySelector(idErr).classList.add("d-block");
        return false;
    }
    else {
        document.querySelector(idErr).innerHTML = "";
        document.querySelector(idErr).classList.remove("d-block");
        return true;
    }
}