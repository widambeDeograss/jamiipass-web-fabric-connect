import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Layout,
  Checkbox,
} from "antd";
import { useNavigate, Link } from "react-router-dom";
import { Colors } from "../../constants/Colors";
import { logoImg } from "../../components/entryFile/imagePaths";
import { useFormPost } from "../../hooks/formDataHook";
import { authUrls } from "../../utils/apis";
import { addAlert } from "../../app/store/slices/AlertsState_slice";
import { useAppDispatch } from "../../app/store/store-hooks";
import CustomAlert from "../../components/Alerts/Alerts";

const { Content, Sider } = Layout;

type FieldType = {
  email?: string;
  name?:string;
  phone:string;
  file:any;
  password?: string;
  remember?: string;
};

const CorporateRegister = () => {
  const [isloading, setisloading] = useState(false);
  const formPost = useFormPost();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
    
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
    const body = {
      corp_email: values.email,
      corp_phone:values.phone,
      corp_name:values.name,
      corp_password: values.password
    };
    setisloading(true);    
    try {
      const response = await formPost.post({
        url: authUrls.registerCorporate,
        data: body,
        login:true
      });
      if (response?.save) {
        dispatch(addAlert({title:"Registration success", type:"success", message:"Registration successfull to JamiiPass"}));
        navigate("/auth/login", {state:{type:"reg1"}});
      } else {
        dispatch(addAlert({title:"Registration failed", type:"error", message:"Registration failed try again!"}));
      }
      setisloading(false);

    } catch (error:any) {
        
      if (!error?.respose) {
        dispatch(addAlert({title:"Registration failed", type:"error", message:"No server responce try again later!"}));
      } else if (error.respose?.status === 400) {
        dispatch(addAlert({title:"Registration failed", type:"error", message:"Registration failure try again!"}));
      } else {
        dispatch(addAlert({title:"Registration failed", type:"error", message:"No server responce try again later!"}));
      }
    }
    setisloading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

 
  return (
    <Layout style={{ minHeight: "100%" }}>
      <CustomAlert/>
    <Sider
      width={700}
      style={{
        background: "darkgray",
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
      <div style={{ marginTop: "2px" }} className="flex flex-col justify-center items-center">
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
              Sign up to your new corporate account
            </span>
          </Divider>
        </div>

          <Form
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            className="row-col"
          >
            <Form.Item
              className="username"
              label="Corp name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your corp name!",
                },
              ]}
            >
              <Input placeholder="Name" type="text" className="" />
            </Form.Item>
            <Form.Item
              className="username"
              label="Corp phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your corp phone!",
                },
              ]}
            >
              <Input placeholder="Phone" type="tel" className="" />
            </Form.Item>
          
          
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


            <Form.Item>
              {isloading ? (
                <Button
                  style={{ width: "100%", backgroundColor: Colors.primary }}
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-500"
                  loading
                >
                  Signing up...
                </Button>
              ) : (
                <Button
                  style={{ width: "100%",  }}
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-500"
                >
                  SIGN UP
                </Button>
              )}
            </Form.Item>
            <p className="font-semibold text-muted">
               Have an account?{" "}
              <Link to="/auth/login" className="text-dark font-bold">
                Sign in
              </Link>
            </p>
          </Form>
       
      </div>
    </Content>
  </Layout>
  )
}

export default CorporateRegister