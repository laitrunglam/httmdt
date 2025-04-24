import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Lấy toàn bộ đơn hàng từ backend
export const getAllOrdersForAdmin = createAsyncThunk(
  "adminOrder/getAllOrdersForAdmin",
  async () => {
    const response = await axios.get("http://localhost:5000/api/admin/orders/get");
    return response.data.data; // ✅ Trả ra mảng đơn hàng
  }
);

// ✅ Lấy chi tiết đơn hàng
export const getOrderDetailsForAdmin = createAsyncThunk(
  "adminOrder/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(`http://localhost:5000/api/admin/orders/details/${id}`);
    return response.data.data;
  }
);

// ✅ Tạo đơn hàng
export const createOrderByAdmin = createAsyncThunk(
  "adminOrder/createOrderByAdmin",
  async (orderData) => {
    const response = await axios.post("http://localhost:5000/api/admin/orders/create", orderData);
    return response.data.data;
  }
);

// ✅ Xóa đơn hàng
export const deleteOrderByAdmin = createAsyncThunk(
  "adminOrder/deleteOrderByAdmin",
  async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/orders/delete/${id}`);
    return id;
  }
);

// ✅ Cập nhật trạng thái đơn hàng
export const updateOrderStatus = createAsyncThunk(
  "adminOrder/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(`http://localhost:5000/api/admin/orders/update/${id}`, {
      orderStatus,
    });
    return response.data.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState: {
    orderList: [],
    orderDetails: null,
    isLoading: false,
  },
  reducers: {
    resetOrderDetails(state) {
      state.orderDetails = null;
    },
    updateOrderDetailsForm(state, action) {
      state.orderDetails = {
        ...state.orderDetails,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.orderList = action.payload; // ✅ Đã fix đúng chỗ này
        state.isLoading = false;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.orderDetails = action.payload;
      })
      .addCase(createOrderByAdmin.fulfilled, (state, action) => {
        state.orderList.unshift(action.payload);
      })
      .addCase(deleteOrderByAdmin.fulfilled, (state, action) => {
        state.orderList = state.orderList.filter((order) => order._id !== action.payload);
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.orderList.findIndex((o) => o._id === updated._id);
        if (index !== -1) {
          state.orderList[index] = updated;
        }
      });
  },
});

export const { resetOrderDetails, updateOrderDetailsForm } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
