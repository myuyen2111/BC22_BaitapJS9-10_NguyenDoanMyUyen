function getEle(id) {
  return document.getElementById(id);
}
// Tạo đối tượng dsnv thuộc lớp đối tượng DSNhanVien
var dsnv = new DSNhanVien();
// Tạo đối tượng validation thuộc lớp đối tượng Validation
  var validation = new Validation();

getLocalStorage();

// tạo hàm lấy thông tin nv
function layThongTinNV() {
  var taiKhoan = getEle("tknv").value;
  var hoTen = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luongCB = getEle("luongCB").value;
  var chucVu = getEle("chucvu").value;
  var gioLam = getEle("gioLam").value;

  // flag
  var isValid = true;

  // Validation taiKhoan
  isValid &=
    validation.kiemTraRong(
      taiKhoan,
      "divErrorTK",
      "(*) Tài khoản không được rỗng"
    ) &&
    validation.kiemTraDoDaiKyTu(
      taiKhoan,
      "divErrorTK",
      "(*) Tài khoản phải có độ dài từ 4-6 kí tự ",
      4,
      6
    );

  //Validation họ và tên
  isValid &=
    validation.kiemTraRong(
      hoTen,
      "divErrorName",
      "(*) Họ tên không được rỗng"
    ) &&
    validation.kiemTraChuoiKyTu(hoTen, "divErrorName", "(*) Họ tên phải là chữ");
  //Validation email
  isValid &=
    validation.kiemTraRong(
      email,
      "divErrorEmail",
      "(*) Email không được rỗng"
    ) &&
    validation.kiemTraEmail(
      email,
      "divErrorEmail",
      "(*) Email không đúng định dạng"
    );
  //Validation mật khẩu
  isValid &=
    validation.kiemTraRong(
      matKhau,
      "divErrorPassword",
      "(*) Mật khẩu không được rỗng"
    ) &&
    validation.kiemTraDoDaiKyTu(
      matKhau,
      "divErrorPassword",
      "(*) Mật khẩu phải có độ dài từ 6-10 kí tự",
      6,
      10
    ) &&
    validation.kiemTraMK(
      matKhau,
      "divErrorPassword",
      "(*) Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
    );

  //Validation ngày làm
  isValid &=
    validation.kiemTraRong(
      ngayLam,
      "divErrorNgayLam",
      "(*) Ngày làm không được rỗng"
    ) &&
    validation.kiemTraNgayLam(
      ngayLam,
      "divErrorNgayLam",
      "(*) Ngày làm không đúng định dạng"
    );
  //Validation lương CB
  isValid &=
    validation.kiemTraRong(
      luongCB,
      "divErrorLuongCB",
      "Lương CB không được rỗng"
    ) &&
    validation.kiemTraSo(
      luongCB,
      "divErrorLuongCB",
      "(*) Lương CB phải là số"
    ) &&
    validation.kiemTraLuongCB(
      parseInt(luongCB),
      "divErrorLuongCB",
      "(*) Lương CB phải nằm trong khoảng 1 000 000 - 20 000 000"
    );
  //Validation chức vụ
  isValid &= validation.kiemTraChucVu(
    chucVu,
    "divErrorChucVu",
    "(*) Hãy chọn chức vụ"
  );
  //Validation giờ làm
  isValid &=
    validation.kiemTraRong(
      gioLam,
      "divErrorGioLam",
      "(*) Giờ làm không được rỗng"
    ) &&
    validation.kiemTraSo(
      gioLam,
      "divErrorGioLam",
      "(*) Giờ làm phải là số"
    ) &&
    validation.kiemTraGioLam(
      gioLam,
      "divErrorGioLam",
      "(*) Giờ làm phải nằm trong khoảng 80 - 200 giờ"
    );

  // check form
  if (!isValid) return null;

  // Tạo đối tượng nhanVien từ lớp đối tượng NhanVien
  var nhanVien = new NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCB,
    chucVu,
    gioLam
  );
  nhanVien.tinhLuong();
  nhanVien.xepLoaiNV();
  return nhanVien;
}

// Thêm nhân viên
getEle("btnThemNV").addEventListener("click", function () {
  var nhanVien = layThongTinNV();
  if (nhanVien != null) {
    dsnv.themNV(nhanVien);
    setLocalStorage();
    taoBang(dsnv.arr);
  }
});
// Tạo bảng
function taoBang(dsnv) {
    var content = "";
    for (var i = 0; i < dsnv.length; i++) {
      var nhanVien = dsnv[i];
      var currentFormat = new Intl.NumberFormat("vn-VN");
      content += `<tr>
                      <td>${nhanVien.taiKhoan}</td>
                      <td>${nhanVien.hoTen}</td>
                      <td>${nhanVien.email}</td>
                      <td>${nhanVien.ngayLam}</td>
                      <td>${nhanVien.chucVu}</td>
                      <td>${currentFormat.format(nhanVien.tongLuong)}</td>
                      <td>${nhanVien.loaiNV}</td>
                      <td><button class='btn btn-danger' onclick="xoaNV('${
                        nhanVien.taiKhoan
                      }')">Xóa</button><button class='btn btn-info' data-toggle='modal' data-target='#myModal' onclick="suaNV('${
        nhanVien.taiKhoan
      }')">Sửa</button></td>
                 </tr>`;
    }
    getEle("tableDanhSach").innerHTML = content;
  }

// Xóa NV
function xoaNV(taiKhoan) {
  dsnv._xoaNV(taiKhoan);
  setLocalStorage();
  taoBang(dsnv.arr);
}

// Sửa nhân viên
function suaNV(taiKhoan) {
  var nhanVien = dsnv._suaNV(taiKhoan);

  if (nhanVien != null) {
    getEle("tknv").value = nhanVien.taiKhoan;
    getEle("tknv").disabled = true;
    getEle("btnThemNV").disabled = true;
    getEle("btnCapNhat").disabled = false;
    getEle("name").value = nhanVien.hoTen;
    getEle("email").value = nhanVien.email;
    getEle("password").value = nhanVien.matKhau;
    getEle("datepicker").value = nhanVien.ngayLam;
    getEle("luongCB").value = nhanVien.luongCB;
    getEle("chucvu").value = nhanVien.chucVu;
    getEle("gioLam").value = nhanVien.gioLam;
  }
}

// Cập nhật nhân viên
getEle("btnCapNhat").addEventListener("click", function () {
  var nhanVien = layThongTinNV();
  if (nhanVien != null) {
    dsnv._capNhatNV(nhanVien);
    setLocalStorage();
    taoBang(dsnv.arr);
  }
});

// Tìm kiếm nhân viên theo xếp loại
getEle("searchName").addEventListener("keyup", function () {
  var keyword = getEle("searchName").value;
  var mangTimKiem = dsnv._timKiemNV(keyword);
  taoBang(mangTimKiem);
});
/**
 * LocalStorage
 */

// Lưu xuống Storage
function setLocalStorage() {
  // Chuyển data từ JSON -> String
  var dataString = JSON.stringify(dsnv.arr);

  // Lưu xuống localstorage
  localStorage.setItem("DSNV", dataString);
}

// Lấy lên từ Storage
function getLocalStorage() {
  var data = localStorage.getItem("DSNV");
  if (data) {
    dataJSON = JSON.parse(data);
    dsnv.arr = dataJSON;
    taoBang(dsnv.arr);
  }
}
