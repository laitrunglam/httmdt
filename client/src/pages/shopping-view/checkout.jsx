import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleSelectItem(productId, isChecked) {
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: isChecked,
    }));
  }

  function handleSelectAllItems(isChecked) {
    const allSelected = {};
    cartItems.items.forEach((item) => {
      allSelected[item.productId] = isChecked;
    });
    setSelectedItems(allSelected);
    setSelectAll(isChecked);
  }

  const totalCartAmount =
    cartItems?.items?.length > 0
      ? cartItems.items
          .filter((item) => selectedItems[item.productId])
          .reduce(
            (sum, currentItem) =>
              sum +
              (currentItem?.salePrice > 0
                ? currentItem?.salePrice
                : currentItem?.price) * currentItem?.quantity,
            0
          )
      : 0;

  async function handleZaloPayPayment() {
    const hasSelected = Object.values(selectedItems).some((val) => val);
    if (!hasSelected) {
      toast({
        title: "Vui lòng chọn ít nhất một sản phẩm để thanh toán.",
        variant: "destructive",
      });
      return;
    }

    if (!currentSelectedAddress) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalCartAmount,
          username: user?.userName,
          user_id: user?.id,
        }),
      });

      const data = await response.json();
      if (data?.order_url) {
        window.location.href = data.order_url;
      } else {
        toast({
          title: "Failed to create ZaloPay order",
          description: data?.error || "Unknown error",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Payment Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems?.items?.length > 0 && (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(e) => handleSelectAllItems(e.target.checked)}
              />
              <label className="text-sm font-medium">
                {selectAll ? "Bỏ chọn tất cả" : "Chọn tất cả"}
              </label>
            </div>
          )}

          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent
                  key={item._id}
                  cartItem={item}
                  isSelected={!!selectedItems[item.productId]}
                  onSelectChange={handleSelectItem}
                />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button
              onClick={handleZaloPayPayment}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Thanh toán với ZaloPay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
