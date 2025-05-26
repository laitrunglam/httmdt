import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import { useToast } from "../ui/use-toast";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
  isDefault: false,
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (addressList && addressList.length > 0) {
      const defaultAddress = addressList.find((addr) => addr.isDefault);
      const firstAddress = addressList[0];
      const selected = defaultAddress ? defaultAddress._id : firstAddress._id;
      setCurrentSelectedAddress(selected);
    }
  }, [addressList]);

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can add max 3 addresses",
        variant: "destructive",
      });
      return;
    }

    if (currentEditedId !== null) {
      dispatch(
        editaAddress({
          userId: user?.id,
          addressId: currentEditedId,
          formData,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id));
          setCurrentEditedId(null);
          setFormData(initialAddressFormData);
          toast({
            title: "Cập nhật địa chỉ thành công",
          });
        }
      });
    } else {
      dispatch(
        addNewAddress({
          ...formData,
          userId: user?.id,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id));
          setFormData(initialAddressFormData);
          toast({
            title: "Thêm địa chỉ thành công",
          });
        }
      });
    }
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({
          title: "Xóa địa chỉ thành công",
        });
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
      isDefault: getCurrentAddress?.isDefault || false,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((key) => key !== "isDefault")
      .map((key) => formData[key].trim?.() !== "")
      .every((item) => item);
  }

  return (
    <Card>
      <div className="p-4">
        {addressList && addressList.length > 0 && (
          <div className="flex flex-col gap-2">
            <label className="font-medium">Chọn địa chỉ giao hàng:</label>
            <select
              className="border p-2 rounded"
              value={selectedId || ""}
              onChange={(e) => setCurrentSelectedAddress(e.target.value)}
            >
              {addressList.map((addr) => (
                <option key={addr._id} value={addr._id}>
                  {addr.address}, {addr.city}, {addr.phone}{" "}
                  {addr.isDefault ? "(Mặc định)" : ""}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Sửa địa chỉ" : "Thêm địa chỉ"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />

        {/* ✅ Checkbox đặt làm mặc định */}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={
              currentEditedId
                ? formData.isDefault
                : addressList.find((a) => a._id === selectedId)?.isDefault ||
                  false
            }
            onChange={async (e) => {
              const isChecked = e.target.checked;

              if (!selectedId) return;

              if (currentEditedId) {
                setFormData({ ...formData, isDefault: isChecked });
              } else {
                await dispatch(
                  editaAddress({
                    userId: user?.id,
                    addressId: selectedId,
                    formData: { isDefault: isChecked },
                  })
                ).then((res) => {
                  if (res?.payload?.success) {
                    dispatch(fetchAllAddresses(user?.id));
                    toast({
                      title: "Đã cập nhật địa chỉ mặc định",
                    });
                  }
                });
              }
            }}
          />
          <label className="text-sm">Đặt làm địa chỉ mặc định</label>
        </div>
      </CardContent>
    </Card>
  );
}

export default Address;
