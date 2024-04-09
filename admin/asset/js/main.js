var DSNV = [];
/* In thông tin nhân viên từ Local Storage ra màn hình */
var jsonData = localStorage.getItem("DSNV_Local");
if (jsonData != null) {
    // Convert về Json
    jsonData = JSON.parse(jsonData);
    //
    DSNV = jsonData.map(function (item) {
        return new NhanVien(item.taiKhoan, item.hoTen, item.email, item.matKhau, item.ngayLam, item.luongCoBan, item.chucVu, item.gioLamThang);
    });
    renderNV(DSNV);
}

/* Hàm validate */
function validateNV(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLamThang) {
    // Tài khoản
    var isValid = kiemTraRong(taiKhoan, "#tbTKNV", "Tài khoản không được để trống")
        && kiemTraKySo(taiKhoan, "#tbTKNV", "Tài khoản phải là một ký số")
        && kiemTraDoDai(taiKhoan, 4, 6, "#tbTKNV", "Tài khoản phải có từ 4-6 ký tự")
    // Họ tên
    isValid &= kiemTraRong(hoTen, "#tbTen", "Họ tên không được để trống")
        && kiemTraChu(hoTen, "#tbTen", "Họ tên chỉ bao gồm chữ cái");
    // Email
    isValid &= kiemTraRong(email, "#tbEmail", "Email không được để trống")
        && kiemTraEmail(email, "#tbEmail", "Email không hợp lệ");
    // Mật khẩu
    isValid &= kiemTraRong(matKhau, "#tbMatKhau", "Mật khẩu không được để trống")
        && kiemTraMK(matKhau, "#tbMatKhau", "Mật khẩu không hợp lệ")
        && kiemTraDoDai(matKhau, 6, 10, "#tbMatKhau", "Mật khẩu phải từ 6-10 ký tự");
    // Ngày làm
    isValid &= kiemTraRong(ngayLam, "#tbNgay", "Ngày làm không được để trống")
        && kiemTraNgay(ngayLam, "#tbNgay", "Ngày không hợp lệ");
    // Lương cơ bản
    isValid &= kiemTraSoRong(luongCoBan, "#tbLuongCB", "Lương cơ bản không được để trống")
        && kiemTraSo(luongCoBan, 1000000, 20000000, "#tbLuongCB", "Lương cơ bản phải từ 1.000.000 đến 20.000.000");
    // Chức vụ
    isValid &= kiemTraChucVu(chucVu, "#tbChucVu", "Chức vụ không hợp lệ");
    // Số giờ làm
    isValid &= kiemTraSoRong(gioLamThang, "#tbGiolam", "Giờ làm không được để trống")
        && kiemTraSo(gioLamThang, 80, 200, "#tbGiolam", "Giờ làm phải từ 80 - 200");
    // Return
    return isValid;
}

/* Thêm nhân viên */
getEle("#btnThemNV").onclick = function () {
    var nv = layThongTinForm();
    var isValid = validateNV(nv.taiKhoan, nv.hoTen, nv.email, nv.matKhau, nv.ngayLam, nv.luongCoBan, nv.chucVu, nv.gioLamThang);
    /* kiểm tra trùng tài khoản (Cách 1) */
    // isValid &= kiemTraTrungID(nv.taiKhoan, DSNV, "#tbTKNV", "Tài khoản đã tồn tại");
    if (isValid) {
        // Kiểm tra trùng tài khoản (Cách 2)
        var viTriMa = DSNV.findIndex(function (item) {
            return item.taiKhoan == nv.taiKhoan;
        })
        if (viTriMa == -1) {
            DSNV.push(nv);
            saveLocalStorage(DSNV);
            renderNV(DSNV);
            clearForm();
            alert("Thêm thành công");
        }
        else{
            // alert("Tài khoản đã tồn tại!");
            getEle("#tbTKNV").innerHTML = "Tài khoản đã tồn tại";
            getEle("#tbTKNV").classList.add("d-block");
        }      
    }
}

/* Xóa nhân viên */
function xoaNV(taiKhoan) {
    // console.log(taiKhoan);
    var vitri = -1;
    for (var i = 0; i < DSNV.length; i++) {
        if (DSNV[i].taiKhoan === taiKhoan) {
            vitri = i;
        }
    }
    if (vitri != -1) {
        var confirmDelete = "Bạn có chắc chắn muốn xóa nhân viên này?";
        if (confirm(confirmDelete) == true) {
            DSNV.splice(vitri, 1);
            saveLocalStorage(DSNV);
            renderNV(DSNV);
            alert("Xóa thành công");
        }
    }
}

/* Cập nhật nhân viên */
function hienThiNV(taiKhoan) {
    var vitri = DSNV.findIndex(function (item) {
        return item.taiKhoan == taiKhoan;
    });
    getEle("#tknv").value = DSNV[vitri].taiKhoan;
    getEle("#tknv").readOnly = true;

    getEle("#name").value = DSNV[vitri].hoTen;
    getEle("#email").value = DSNV[vitri].email;
    getEle("#password").value = DSNV[vitri].matKhau;
    getEle("#datepicker").value = DSNV[vitri].ngayLam;
    getEle("#luongCB").value = DSNV[vitri].luongCoBan;
    getEle("#chucvu").value = DSNV[vitri].chucVu;
    getEle("#gioLam").value = DSNV[vitri].gioLamThang;
}

getEle("#btnCapNhat").onclick = function () {
    var nv = layThongTinForm();
    // Xác thực nếu ok thì update
    var isValid = validateNV(nv.taiKhoan, nv.hoTen, nv.email, nv.matKhau, nv.ngayLam, nv.luongCoBan, nv.chucVu, nv.gioLamThang)
    if (isValid) {
        var viTri = DSNV.findIndex(function (item) {
            return item.taiKhoan == nv.taiKhoan;
        });
        DSNV[viTri] = nv;
        saveLocalStorage(DSNV);
        renderNV(DSNV);
        // getEle("#tknv").readOnly = false;
        // clearForm();
        alert("Cập nhật thành công");
    }
}

/* Clear */
function clearForm() {
    getEle("#tknv").value = "";
    getEle("#name").value = "";
    getEle("#email").value = "";
    getEle("#password").value = "";
    getEle("#datepicker").value = "";
    getEle("#luongCB").value = "";
    getEle("#chucvu").value = "Chọn chức vụ";
    getEle("#gioLam").value = "";
    //
    getEle("#tbTKNV").classList.remove("d-block");
    getEle("#tknv").readOnly = false;
    getEle("#tbTen").classList.remove("d-block");
    getEle("#tbEmail").classList.remove("d-block");
    getEle("#tbMatKhau").classList.remove("d-block");
    getEle("#tbNgay").classList.remove("d-block");
    getEle("#tbLuongCB").classList.remove("d-block");
    getEle("#tbChucVu").classList.remove("d-block");
    getEle("#tbGiolam").classList.remove("d-block");
}

/* Tìm kiếm */
getEle("#btnTimNV").onclick = function () {
    var xepLoaiNV = getEle("#searchName").value.trim()?.toLowerCase();
    var DsTimKiem = [];
    if (xepLoaiNV.length > 0) {
        DsTimKiem = DSNV.filter(function (nv) {
            return nv.xepLoaiNV(nv.gioLamThang).toLowerCase().includes(xepLoaiNV);
        });
        renderNV(DsTimKiem);
    } else {
        renderNV(DSNV);
    }
}

/* Đóng */
getEle("#btnDong").onclick = function () {
    clearForm();
}