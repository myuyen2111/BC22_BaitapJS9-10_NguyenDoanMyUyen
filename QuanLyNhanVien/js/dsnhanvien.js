function DSNhanVien() {
  this.arr = [];
  //   Thêm nhân viên
  this.themNV = function (nhanVien) {
    this.arr.push(nhanVien);
  };
  // Tìm vị trí NV:
  this.timViTriNV = function (taiKhoan) {
    /* Tạo biến index = -1
      Duyệt mảng arr, nếu nhanVien.taiKhoan trùng với taiKhoan cần xoá 
      =>Gán cho index vị trí tìm thấy; break
     */
    var index = -1;
    for (var i = 0; i < this.arr.length; i++) {
      var nhanVien = this.arr[i];
      if (nhanVien.taiKhoan === taiKhoan) {
        index = i;
        break;
      }
    }
    return index;
  };
  // Xóa nhân viên
  this._xoaNV = function (taiKhoan) {
    var index = this.timViTriNV(taiKhoan);
    if (index != -1) {
      this.arr.splice(index, 1);
    }
  };

  // Sửa nhân viên
  this._suaNV = function (taiKhoan) {
    var index = this.timViTriNV(taiKhoan);
    if (index != -1) {
      var nhanVien = this.arr[index];
      return nhanVien;
    }
    return null;
  };

  // Cập nhật nhân viên
  this._capNhatNV = function (nhanVien) {
    var index = this.timViTriNV(nhanVien.taiKhoan);
    if (index != -1) {
      this.arr[index] = nhanVien;
    }
  };

  // Tìm kiếm nhân viên
  this._timKiemNV = function (keyword) {
    var mangTimKiem = [];
    for (var i = 0; i < this.arr.length; i++) {
      var nhanVien = this.arr[i];
      if (nhanVien.loaiNV.toLowerCase().indexOf(keyword.toLowerCase()) != -1) {
        mangTimKiem.push(nhanVien);
      }
    }
    return mangTimKiem;
  };
}
