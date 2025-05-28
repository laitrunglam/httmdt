import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ConfirmEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Thiếu mã xác nhận.");
      return;
    }
    axios.get(`http://localhost:5000/api/auth/confirm-email?token=${token}`)
      .then(res => {
        if (res.data.success) {
          setStatus("success");
          setMessage("Xác nhận email thành công! Bạn có thể đăng nhập.");
          setTimeout(() => navigate("/auth/login"), 2000);
        } else {
          setStatus("error");
          setMessage(res.data.message || "Xác nhận thất bại.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Có lỗi xảy ra khi xác nhận email.");
      });
  }, [searchParams, navigate]);

  return (
    <div className="mx-auto w-full max-w-md p-6 text-center">
      {status === "pending" && <div>Đang xác nhận email...</div>}
      {status !== "pending" && <div>{message}</div>}
    </div>
  );
}
