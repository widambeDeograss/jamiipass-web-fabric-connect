import React, { useState } from "react";
import { Avatar, Button, Card, Form, Input } from "antd";
import { useAppSelector } from "../../app/store/store-hooks";
import { Colors } from "../../constants/Colors";
import { logoImg } from "../../components/entryFile/imagePaths";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormPost } from "../../hooks/formDataHook";
import { authUrls } from "../../utils/apis";
import { addAlert } from "../../app/store/slices/AlertsState_slice";
import { useAppDispatch } from "../../app/store/store-hooks";
import CustomAlert from "../../components/Alerts/Alerts";
import { setAuthentication } from "../../app/store/slices/AppState-slice";
import { toogleIsOrg } from "../../app/store/slices/AppState-slice";

const EmailVerificationOtp = () => {
  const darkmode = useAppSelector((state) => state.AppStateReducer.isDarkMode);
  const [isloading, setisloading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formPost = useFormPost();
  const otp_type = location?.state?.type;
  const record = location?.state?.record;

  const onFinish = async (values: { otp: string }) => {
    
    if (otp_type === "corp") {
      const body = {
        corp_id: record?.corp_id,
        otp: values.otp,
      };
      setisloading(true);
      try {
        const response = await formPost.post({
          url: authUrls.verifyOtpCorp,
          data: body,
          login: true,
        });

        if (response.success) {
          await localStorage.setItem("token", response?.token);
          dispatch(setAuthentication({ token: response?.token }));
          dispatch(toogleIsOrg({ isOrg: "corpn" }));
          dispatch(
            addAlert({
              title: "Otp success",
              type: "success",
              message: "Login successfull to JamiiPass",
            })
          );
          navigate("/");
        } else {
          dispatch(
            addAlert({
              title: "Otp verification failed",
              type: "error",
              message: "Invalid OTP credentials try again!",
            })
          );
          navigate("/auth/verify_otp");
        }
        setisloading(false);
      } catch (error: any) {
        if (!error?.respose) {
          dispatch(
            addAlert({
              title: "Login failed",
              type: "error",
              message: "No server responce try again later!",
            })
          );
        } else if (error.respose?.status === 400) {
          dispatch(
            addAlert({
              title: "Login failed",
              type: "error",
              message: "Invalid OTP credentials try again!",
            })
          );
        } else {
          dispatch(
            addAlert({
              title: "Login failed",
              type: "error",
              message: "No server responce try again later!",
            })
          );
        }
      }
      setisloading(false);
    } else if (otp_type === "org") {
      const body = {
        org_id: record?.org_id,
        otp: values.otp,
      };
      setisloading(true);
      try {
        const response = await formPost.post({
          url: authUrls.verifyOtpOrganization,
          data: body,
          login: true,
        });

        if (response.success) {
          await localStorage.setItem("token", response?.token);
          dispatch(setAuthentication({ token: response?.token }));
          dispatch(toogleIsOrg({ isOrg: "orgn" }));
          dispatch(
            addAlert({
              title: "Otp success",
              type: "success",
              message: "Login successfull to JamiiPass",
            })
          );
          navigate("/");
        } else {
          dispatch(
            addAlert({
              title: "Otp verification failed",
              type: "error",
              message: "Invalid OTP credentials try again!",
            })
          );
          navigate("/auth/login");
        }
        setisloading(false);
      } catch (error: any) {
        if (!error?.respose) {
          dispatch(
            addAlert({
              title: "Login failed",
              type: "error",
              message: "No server responce try again later!",
            })
          );
        } else if (error.respose?.status === 400) {
          dispatch(
            addAlert({
              title: "Login failed",
              type: "error",
              message: "Invalid OTP credentials try again!",
            })
          );
        } else {
          dispatch(
            addAlert({
              title: "Login failed",
              type: "error",
              message: "No server responce try again later!",
            })
          );
        }
      }
    } else {
      dispatch(
        addAlert({
          title: "Error",
          type: "error",
          message: "try loging in again!",
        })
      );
      navigate("/auth/login");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className="h-[100vh]"
      style={{ backgroundColor: darkmode ? Colors.addson : "white" }}
    >
      <CustomAlert />
      <div className="flex justify-center items-center pt-20">
        <Card className="shadow-lg border-gray-500">
          <div className="flex flex-col justify-center items-center">
            <Avatar
              className="shape-avatar"
              shape="square"
              size={60}
              src={logoImg}
            ></Avatar>

            <h3
              className="block flex-shrink-0 font-bold text-lg  text-center
          "
            >
              JamiiPass
            </h3>
            <p className="text-center font-light text-xs">
              Enter the verification code sent to the email below
            </p>
            <p className="text-center font-light text-xs">{record?.email}</p>
            <p className="text-center font-light text-xs">
              The code will expire in 1 Houur
            </p>

            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              className="row-col mt-5"
            >
              <Form.Item
                className="username"
                //   label="Corp name"
                name="otp"
                rules={[
                  {
                    required: true,
                    message: "Please input your OTP!",
                  },
                ]}
              >
                <Input.Password placeholder="Otp" type="text" className="" />
              </Form.Item>
              <Form.Item>
                {isloading ? (
                  <Button
                    style={{ width: "100%", }}
                    type="primary"
                    htmlType="submit"
                    className="bg-blue-500"
                    loading
                  >
                    Verify otp...
                  </Button>
                ) : (
                  <Button
                    style={{ width: "100%"}}
                    type="primary"
                    htmlType="submit"
                    className="bg-blue-500"
                  >
                    Verify
                  </Button>
                )}
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmailVerificationOtp;
