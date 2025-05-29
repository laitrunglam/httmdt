import {
  FacebookIcon, InstagramIcon, TwitterIcon, PhoneIcon, MailIcon, MapPinIcon
} from "lucide-react";
import logoBCT from '@/assets/logoSaleNoti.png';
import visa from '@/assets/Visa.png';
import cod from '@/assets/cod.png';
import pay from '@/assets/pay.png';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 mt-auto font-sans">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Thông tin liên hệ */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-100 tracking-wide border-b border-gray-700 pb-2">Thông tin liên hệ</h3>
            <div className="flex items-center mb-4 text-gray-300 hover:text-white transition-colors">
              <MapPinIcon className="w-5 h-5 mr-3 text-primary" />
              <span className="text-sm">110 Thái Hà, Đống Đa, Hà Nội</span>
            </div>
            <div className="flex items-center mb-4 text-gray-300 hover:text-white transition-colors">
              <PhoneIcon className="w-5 h-5 mr-3 text-primary" />
              <span className="text-sm">0888 482 886</span>
            </div>
            <div className="flex items-center mb-4 text-gray-300 hover:text-white transition-colors">
              <MailIcon className="w-5 h-5 mr-3 text-primary" />
              <span className="text-sm">cskh@shopname.com</span>
            </div>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.facebook.com/MagonnDesign"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 p-2 rounded-full hover:bg-blue-700"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="https://zalo.me/2705094202747018406"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 p-2 rounded-full hover:bg-blue-500 flex items-center justify-center"
                aria-label="Zalo"
              >
                <img
                  src="https://theme.hstatic.net/200000623993/1001008164/14/zalo.png?v=1927"
                  alt="Zalo"
                  className="w-5 h-5 object-contain"
                  style={{ display: "block" }}
                />
              </a>
              <a
                href="https://www.instagram.com/magonndesign/#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-600 p-2 rounded-full hover:bg-pink-700"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

                      {/* Policies */}
                      <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-100 tracking-wide border-b border-gray-700 pb-2">Chính sách</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    Hệ thống cửa hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    Hướng dẫn mua hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    Chính sách mua hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    Chính sách thẻ khách hàng thân thiết
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    Chính sách bảo mật thông tin
                  </a>
                </li>
              </ul>
            </div>

            {/* Customer Support */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-100 tracking-wide border-b border-gray-700 pb-2">Hỗ trợ khách hàng</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    Chính sách mua hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    Hướng dẫn mua hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    Chính sách thẻ khách hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    Hệ thống cửa hàng
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-100 tracking-wide border-b border-gray-700 pb-2">Đăng ký nhận tin</h3>
              <p className="text-gray-400 text-sm mb-4">Đăng ký để nhận thông tin ưu đãi mới nhất</p>
              <div className="flex max-w-md rounded-md overflow-hidden shadow-sm border border-gray-300">
                <input
                  type="email"
                  placeholder="Nhập địa chỉ email"
                  className="flex-1 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
                />
                <button className="bg-[#1d73bf] text-white font-semibold px-4 py-2 hover:bg-[#a1001a] transition-colors">
                  Đăng ký
                </button>
              </div>
            </div>

        </div>

        {/* Chứng nhận + thanh toán */}
        <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© Bản quyền thuộc về công ty TNHH Nhóm 14</p>
          <img src={logoBCT} alt="BCT" className="h-16 mt-2 md:mt-0" />
          <div className="flex space-x-3 mt-2 md:mt-0">
            {[visa, pay, cod].map((img, idx) => (
              <div key={idx} className="bg-white p-1 rounded">
                <img src={img} alt="payment" className="h-6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
