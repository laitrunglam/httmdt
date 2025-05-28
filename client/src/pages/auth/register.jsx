import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [showCheckEmail, setShowCheckEmail] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        setShowCheckEmail(true);
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      {showCheckEmail ? (
        <div className="p-4 bg-green-100 text-green-800 rounded">
          Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.
        </div>
      ) : (
        <>
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Tạo tài khoản
            </h1>
            <p className="mt-2">
              Đã có tài khoản?
              <Link
                className="font-medium ml-2 text-primary hover:underline"
                to="/auth/login"
              >
                Đăng nhập
              </Link>
            </p>
          </div>
          <CommonForm
            formControls={registerFormControls}
            buttonText={"Sign Up"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
          />
        </>
      )}
    </div>
  );
}

export default AuthRegister;