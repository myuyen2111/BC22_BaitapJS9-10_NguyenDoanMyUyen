function NhanVien(
  _taiKhoan,
  _hoTen,
  _email,
  _matKhau,
  _ngayLam,
  _luongCB,
  _chucVu,
  _gioLam
) {
  this.taiKhoan = _taiKhoan;
  this.hoTen = _hoTen;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngayLam = _ngayLam;
  this.luongCB = _luongCB;
  this.chucVu = _chucVu;
  this.gioLam = _gioLam;
  this.tongLuong = 0;
  this.loaiNV="";
  this.tinhLuong = function () {
    switch (this.chucVu) {
      case "Sếp":
        this.tongLuong = this.luongCB * 3;
        break;
      case "Trưởng phòng":
        this.tongLuong = this.luongCB * 2;
        break;
      case "Nhân viên":
        this.tongLuong = this.luongCB * 1;
        break;
      default:
        this.tongLuong = 0;
    }
  };

  this.xepLoaiNV = function () {
    if (this.gioLam >= 192) {
        this.loaiNV= "Nhân viên Xuất Sắc";
    } else if (this.gioLam >= 176 && this.gioLam < 192) {
        this.loaiNV= "Nhân viên Giỏi";
    } else if (this.gioLam >= 160 && this.gioLam < 176) {
        this.loaiNV= "Nhân viên Khá";
    } else {
        this.loaiNV= "Nhân viên Trung Bình";
    }
  };
}
