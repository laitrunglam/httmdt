import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Plus, ChevronDown, MapPin } from "lucide-react";

import pay from "../../assets/pay.png";
import { formatVND } from "../../lib/formatVND";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createNewOrder } from "@/store/shop/order-slice";
import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import img from "../../assets/account.jpg";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiatePaypalPayment() {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
        size: singleCartItem?.size,
        color: singleCartItem?.color,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      {/* Banner section */}
      <div className="relative h-48 w-full overflow-hidden mb-8">
        <img 
          src={img} 
          className="h-full w-full object-cover object-center" 
          alt="Checkout banner" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white">Giỏ hàng</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Products and Order Summary */}
          <div className="w-full lg:w-2/3">
            {/* Products */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <h2 className="text-xl font-semibold mb-6 pb-3 border-b">Mặt hàng</h2>
              <div className="max-h-96 overflow-y-auto pr-2">
                {cartItems && cartItems.items && cartItems.items.length > 0 ? (
                  cartItems.items.map((item) => (
                    <div key={item.productId} className="border-b last:border-b-0 py-4">
                      <UserCartItemsContent cartItem={item} />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">Giỏ hàng của bạn đang trống</p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
              <div className="flex justify-between text-lg mb-2">
                <span className="font-medium">Tổng tiền</span>
                <span>{formatVND(totalCartAmount)}</span>
              </div>
              <div className="flex justify-between text-lg mb-2">
                <span className="font-medium">Phí giao hàng</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t">
                <span>Total</span>
                <span>{formatVND(totalCartAmount)}</span>
              </div>
            </div>
          </div>

          {/* Right side - Address */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Địa chỉ giao hàng</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full" 
                  onClick={() => setShowAddressForm(!showAddressForm)}
                >
                  <Plus size={24} className={showAddressForm ? "rotate-45 transition-transform" : "transition-transform"} />
                </Button>
              </div>

              {showAddressForm && (
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <Address
                    selectedId={currentSelectedAddress}
                    setCurrentSelectedAddress={setCurrentSelectedAddress}
                    compact={true}
                  />
                </div>
              )}

              {currentSelectedAddress ? (
                <div className="border rounded-lg p-4 mb-6 bg-blue-50">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">{currentSelectedAddress.address}</p>
                      <p>{currentSelectedAddress.city}, {currentSelectedAddress.pincode}</p>
                      <p>Phone: {currentSelectedAddress.phone}</p>
                      {currentSelectedAddress.notes && (
                        <p className="text-gray-600 mt-1 text-sm">{currentSelectedAddress.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {!showAddressForm && (
                    <p>Vui lòng chọn hoặc thêm địa chỉ giao hàng</p>
                  )}
                </div>
              )}

              {/* Payment section */}
              <div className="mt-4">
                <h3 className="font-semibold mb-4">Phương thức thanh toán</h3>
                <div className="border rounded-lg p-3 mb-4 bg-gray-50 flex items-center">
                  <input 
                    type="radio" 
                    id="paypal" 
                    name="paymentMethod" 
                    checked 
                    className="mr-2"
                    readOnly
                  />
                  <label htmlFor="paypal" className="flex-grow">PayPal</label>
                  <img 
                    src={pay} 
                    alt="PayPal" 
                    className="h-6" 
                  />
                </div>
              </div>

              {/* Checkout button */}
              <Button 
                onClick={handleInitiatePaypalPayment} 
                className="w-full py-6 text-lg mt-4"
                disabled={isPaymentStart || !currentSelectedAddress}
              >
                {isPaymentStart
                  ? "Processing Payment..."
                  : "Complete Order"} 
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;