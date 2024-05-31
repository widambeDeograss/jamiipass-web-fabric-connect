import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Layout,
  Checkbox,
  Menu,
  MenuProps,
  message,
} from "antd";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Colors } from "../../constants/Colors";
import OrgLogin from "./OrgLogin";
import { logoImg } from "../../components/entryFile/imagePaths";
import { useFormPost } from "../../hooks/formDataHook";
import { authUrls } from "../../utils/apis";
import { addAlert } from "../../app/store/slices/AlertsState_slice";
import { useAppDispatch } from "../../app/store/store-hooks";
import CustomAlert from "../../components/Alerts/Alerts";
import modal from 'antd/es/modal';
import {ExclamationCircleOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

type LoginType = "corporate" | "organization";

const Login = () => {
  const [loginType, setLoginType] = useState<LoginType>("corporate");
  const [isloading, setisloading] = useState(false);
  const location = useLocation();
  const is_first_registered = location?.state?.type;
  const formPost = useFormPost();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const items: MenuProps["items"] = [
    {
      label: "Corporate",
      key: "corporate",
    },
    {
      label: "Organization",
      key: "organization",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const leftSide: any = document.querySelector(".left-side");

      if (screenWidth < 768) {
        leftSide.style.display = "none";
      } else {
        leftSide.style.display = "block";
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = async (values: FieldType) => {
    localStorage.clear()
    const body = {
      corp_email: values.email,
      corp_password: values.password
    };
    setisloading(true);    
    try {

      const response = await formPost.post({
        url: authUrls.loginCorporate,
        data: body,
        login:true
      });

      if (response.success) {
        dispatch(addAlert({title:"Login success", type:"success", message:"Login successfull to JamiiPass"}));
        navigate("/auth/verify_otp", {state:{type:"corp", record:response?.corp}});
      } else {

        dispatch(addAlert({title:"Login failed", type:"error", message:"Invalid login credentials try again!"}));
        navigate("/");
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
      modal.confirm({
        title: 'Veify your email address',
        icon: <ExclamationCircleOutlined />,
        content: 'open you email accout to verify your email address',
        okText: 'OK',
        okType:"default",
        cancelText: 'Skip for now',
        onOk:() => {   
        }
      });
     
     }
  }, [])
  
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onClick: MenuProps["onClick"] = (e: any) => {
    console.log("click ", e);
    setLoginType(e.key);
  };

  return (
    <Layout style={{ minHeight: "100%" }}>
      <CustomAlert/>
      <Sider
        width={700}
        style={{
          background: "#8c8c8c",
          color: "#fff",
          padding: "20px",
          textAlign: "center",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
        className="left-side"
      >
        <div className="ml-24 mt-20"></div>
        {/* Add aligned content about the digital scale */}
        <div style={{ marginTop: "2px" }} className="flex flex-col  justify-center items-center">
        <img src={logoImg} alt="" className="object-cover mt-10 rounded-md"/>
          <h1 className="text-2xl font-bold text-black mt-5">JamiiPass</h1>
          <h3 className="text-sm text-black">A decentralized digital identity ecosystem</h3>
        </div>
      </Sider>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderTopLeftRadius: "20px",
          borderBottomLeftRadius: "20px",
        }}
      >
        <div className="w-2/3">
          <div className="fl">
            <h1 className="text-xl font-bold text-center">JamiiPass</h1>
            <Divider plain>
              <span
                style={{
                  color: "#CCC",
                  fontWeight: "normal",
                  fontSize: 14,
                }}
              >
                Sign in to your account
              </span>
            </Divider>
          </div>

          <div className="mx-auto mb-5">
            <Menu
              onClick={onClick}
              selectedKeys={[loginType]}
              mode="horizontal"
              items={items}
              className="bg-transparent "
            />
          </div>

          {loginType === "corporate" ? (
            <Form
              onFinish={handleSubmit}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                className="username"
                label="Corp email"
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
                label="Corp password"
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
                    className="bg-blue-500"
                    loading
                  >
                    Signing in...
                  </Button>
                ) : (
                  <Button
                    style={{ width: "100%",  }}
                    type="primary"
                    htmlType="submit"
                    className="bg-blue-500"
                  >
                    SIGN IN
                  </Button>
                )}
              </Form.Item>
              <p className="font-semibold text-muted">
                Don't have an account?{" "}
                <Link to="/auth/register" className="text-dark font-bold">
                  Sign Up
                </Link>
              </p>
            </Form>
          ) : (
            <OrgLogin />
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default Login;
