✅ Bước 1: Tải và cài đặt ngrok
Truy cập: https://ngrok.com/download

Tải bản phù hợp với hệ điều hành (Windows/macOS/Linux).

Giải nén file .zip, bạn sẽ có file thực thi ngrok.

✅ Bước 2: Đăng ký tài khoản và lấy Authtoken (1 lần duy nhất)
Đăng ký tại: https://dashboard.ngrok.com/signup

Vào mục "Your Authtoken" tại đây: https://dashboard.ngrok.com/get-started/setup

Copy đoạn lệnh ngrok config add-authtoken <token của bạn> và chạy trong terminal:

ngrok config add-authtoken <authtoken_của_bạn>
bước 3: chạy câu lệnh : ngrok http 5000 . rồi coppy cái url https://1fd0-42-113-16-93.ngrok-free.app( cái này mỗi lần chạy nó sẽ cho 1 cái url khác nhau nên phải để ý)
![image](https://github.com/user-attachments/assets/227c4452-d1a0-45df-b6a7-3ae642595b49)
bước 4: mở file payment.controller ra tìm dòng 34 ra thay cái  url bên trên kia( máy oog nó url nào thì paste vào) coppy đến đoạn app thôi nhé đuôi sau vẫn dữ/api/payment/....
![image](https://github.com/user-attachments/assets/aa9fe8fb-855c-46e4-a3e1-779e27d1032f)

rồi chạy fe vs be như bt là ok

Cài đặt mail xác thực tài khoản:
- Vào một tài khoản gmail -> security -> tìm app password -> tạo password mới cho app
- Tạo file .env trong thư mục server: thêm các trường
  + EMAIL_USER=your mail
  + EMAIL_PASS=app pasword
  + FRONTEND_URL=http://localhost:5173
- Cài đặt xong khi tạo tài khoản thì gmail này sẽ gửi link xác nhận
- Lưu ý: Không sử dụng mật khẩu gốc của gmail
