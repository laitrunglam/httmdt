import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import Footer from "./footer";
import ChatFloating from "./chatFloating";

function ShoppingLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ShoppingHeader />
      <main className="flex flex-col flex-1 w-full pt-16">
        <Outlet />
      </main>
      <ChatFloating />
      <Footer />
    </div>
  );
}

export default ShoppingLayout;
