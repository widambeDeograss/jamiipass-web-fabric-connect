import { useEffect, useState } from "react";
import { Button, Form, Input, Checkbox } from "antd";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Colors } from "../../constants/Colors";
import { logoImg } from "../../components/entryFile/imagePaths";
import { useFormPost } from "../../hooks/formDataHook";
import { authUrls } from "../../utils/apis";
import { addAlert } from "../../app/store/slices/AlertsState_slice";
import { useAppDispatch } from "../../app/store/store-hooks";
import CustomAlert from "../../components/Alerts/Alerts";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const OrgLogin = () => {
  const [isloading, setisloading] = useState(false);
  const location = useLocation();
  const is_first_registered = location?.state?.type;
  const formPost = useFormPost();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: FieldType) => {
    localStorage.clear()
    const body = {
      org_email: values.email,
      org_password: values.password
    };
    setisloading(true);    
    try {

      const response = await formPost.post({
        url: authUrls.loginOrganization,
        data: body,
        login:true
      });

      if (response.success) {
        dispatch(addAlert({title:"Login success", type:"success", message:"Login successfull to JamiiPass"}));
        navigate("/auth/verify_otp", {state:{type:"org", record:response?.org}});
      } else {

        dispatch(addAlert({title:"Login failed", type:"error", message:"Invalid login credentials try again!"}));
      }
      setisloading(false);

    } catch (error:any) {
        
      if (!error?.respose) {
        dispatch(addAlert({title:"Login failed", type:"error", message:"No server responce try again later!"}));
      } else if (error.respose?.status === 400) {
        dispatch(addAlert({title:"Login failed", type:"error", message:"Invalid login credentials try again!"}));
      } else {
        dispatch(addAlert({title:"Login failed", type:"error", message:"No server responce try again later!"}));
      }
    }
    setisloading(false);
  };

  useEffect(() => {
     if (is_first_registered) {
      alert("open you email accout to verify your email address");
     }
  }, [is_first_registered])

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        className="row-col"
      >
        <Form.Item
          className="username"
          label="Org email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input placeholder="Email" type="email" className="" />
        </Form.Item>

        <Form.Item
          className="username"
          label="Org password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password className="" />
        </Form.Item>

        <Form.Item
          name="remember"
          className="aligin-center mt-10"
          valuePropName="checked"
        >
          <Checkbox
            defaultChecked
            // style={{ backgroundColor: Colors.primary }}
          />
          Remember me
        </Form.Item>

        <Form.Item>
          {isloading ? (
            <Button
              style={{ width: "100%",  }}
              type="primary"
              htmlType="submit"
              loading
              className="bg-blue-500"
            >
              Signing in...
            </Button>
          ) : (
            <Button
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
              className="bg-blue-500"
            >
              SIGN IN
            </Button>
          )}
        </Form.Item>
        {/* <p className="font-semibold text-muted">
                Don't have an account?{" "}
                <Link to="/register" className="text-dark font-bold">
                    Sign Up
                </Link>
            </p> */}
      </Form>
    </div>
  );
};

export default OrgLogin;
