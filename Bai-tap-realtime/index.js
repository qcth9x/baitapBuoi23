const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

var danhSachNguoiGui = []
io.on('connection', (socket) => {
danhSachNguoiGui.push ({id: socket.id, soLanNoiBay:0})
socket.on('chat message', msg => {
    for (let i=0; i< danhSachNguoiGui.length; i++){
      if (danhSachNguoiGui[i].id == socket.id){
       let soLanNoiBayCuaNguoiGuiHienTai = danhSachNguoiGui[i].soLanNoiBay
       if (soLanNoiBayCuaNguoiGuiHienTai < 3){
        if (msg == 'fuck you'){
          io.emit('chat message', '****')
          soLanNoiBayCuaNguoiGuiHienTai++
          danhSachNguoiGui[i].soLanNoiBay = soLanNoiBayCuaNguoiGuiHienTai
       }else{
        io.emit('chat message', msg)
       }
      }else{
        io.emit('chat message', {thongBao: 'BAN',  idNguoiBiKhoa: socket.id})
        danhSachNguoiGui[i].soLanNoiBay = 0
    }
    }
  }
})

// var dem = 0
// socket.on('chat message', msg => {
//     if (msg == 'fuck you') {
//       if (dem > 2) {
//         io.emit ('chat message', 'tai khoan cua ban bị khoa')
//       } else {
//       io.emit('chat message', '*****')
//       dem ++
//     }
//     }
//   });
});


http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
