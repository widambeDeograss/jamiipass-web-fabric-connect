import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import { Avatar, Button, Form, Input, Space } from "antd";
import { EditOutlined, UserOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { baseUrl } from "../../utils/baseUrl";
import { corporateUrls, organizationUrls } from "../../utils/apis";
import modal from "antd/es/modal";
import { useDataFetch } from "../../hooks/datahook";
import axios from "axios";
import { addAlert } from "../../app/store/slices/AlertsState_slice";
import { useAppDispatch } from "../../app/store/store-hooks";

interface corporateInterfc{
    email: string;
    created_at: string;
    email_verified: boolean;
    corp_id: string;
    corp_name: string;
    phone: string;
    pic: string;
  }

const CoporateProfile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [corpInfo, setcorpInfo] = useState<corporateInterfc>();
  const datafetch = useDataFetch();
  const dispatch = useAppDispatch();

  const loadData = async() => {
    try {
      setIsLoading(true);
      const response = await datafetch.fetch({
        url: corporateUrls.corporateInfo,
      });
      if (response) {
        console.log(response);
        
        setcorpInfo(response?.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      modal.confirm({
        title: 'Session expired',
        icon: <ExclamationCircleOutlined />,
        content: 'Your Login session has expired',
        okText: 'Logout',
        okType:"danger",
        // cancelText: 'cancel',
        onOk:() => {
          localStorage.clear();
          window.location.reload()
        }
      });
    }
  }

  useEffect(() => {
   loadData();
  }, [])


  const handleFileChange = (event: any) => {
    setFile(event?.target?.files[0]);
  };

  const handleSubmitProfilePic = async (event: any) => {
    event.preventDefault();
    if (!file) {
      dispatch(addAlert({title:"Warning", type:"warning", message:"Select an image file first!"}));
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${baseUrl}/app/corp/update/${corpInfo?.corp_id}/pic`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        dispatch(addAlert({title:"Sucess", type:"success", message:"Profile picture updated successfully!"}));
        
      }
      // You can add more actions here, like updating the UI
    } catch (error) {
      dispatch(addAlert({title:"Error", type:"error", message:"Failed to update profile!"}));

    }
  };

  const updatePassword = async (values:any) => {
    try {
      const response = await axios.put(`${baseUrl}/app/corp/update/${corpInfo?.corp_id}/password`, values);
      console.log(response);
      
      if (response.status === 200) {
        dispatch(addAlert({title:"Sucess", type:"success", message:"Profile Info updated successfully!"}));
        
      }
      // You can add more actions here, like updating the UI
    } catch (error) {
      dispatch(addAlert({title:"Error", type:"error", message:"Failed to update profile!"}));

    }
  };

  const updateProfileInfo = async (values:any) => {
    try {
      const response = await axios.put(`${baseUrl}/app/corp/update/${corpInfo?.corp_id}`, values);
      console.log(response);
      
      if (response.status === 200) {
        dispatch(addAlert({title:"Sucess", type:"success", message:"Profile Info updated successfully!"}));
        
      }
      // You can add more actions here, like updating the UI
    } catch (error) {
      dispatch(addAlert({title:"Error", type:"error", message:"Failed to update profile!"}));

    }
  };
  return (
    <>
      <BreadCrumb title="Profile" type="Organization" />
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Corporate Information
              </h3>
              <button
                className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm float-right -mt-7"
                onClick={() => setisEditing(true)}
              >
                <span className="relative block h-5.5 w-5.5 cursor-pointer">
                  {!isEditing && <EditOutlined />}
                </span>
              </button>
            </div>
            <div className="p-7">
              <Form
                onFinish={updateProfileInfo}
                layout="vertical"
                className="row-col"
                disabled={!isEditing}

                initialValues={{
                  email: corpInfo?.email,
                }}
              >
                <Form.Item
                  className="username"
                  label='email'
                  name="email"
                  // initialValue={corpInfo?.email}
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input type="email" className=""  placeholder={corpInfo?.email}/>
                </Form.Item>
                <Form.Item
                  className="username"
                  label="Corp name"
                  name="corp_name"
                  initialValue={corpInfo?.corp_name}
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <Input  type="text" className="" placeholder={corpInfo?.corp_name} />
                </Form.Item>
                <Form.Item
                  className="username"
                  label="Corp phone"
                  name="phone"
                  initialValue={corpInfo?.phone}
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone!",
                    },
                  ]}
                >
                  <Input  type="text" className=""  placeholder={corpInfo?.phone} />
                </Form.Item>

                {/* <Form.Item
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
        </Form.Item> */}
                <Form.Item>
                  {isLoading ? (
                    <Button
                      style={{ width: "100%" }}
                      type="primary"
                      htmlType="submit"
                      loading
                      className="bg-blue-500"
                    >
                      Saving...
                    </Button>
                  ) : (
                    <Button
                      style={{ width: "100%" }}
                      type="primary"
                      htmlType="submit"
                      className="bg-blue-500"
                    >
                      Save
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
          </div>
        </div>
        <div className="col-span-5 xl:col-span-2">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Corporate profile
              </h3>
            </div>
            <div className="p-7">
              <form>
                <div className="mb-4 flex items-center gap-3">
                  <Space>
                    <Avatar
                      size={60}
                      src={baseUrl + `/${corpInfo?.pic}`}
                    >
                      <UserOutlined />
                    </Avatar>
                  </Space>
                </div>

                <div
                  id="FileUpload"
                  className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                          fill="#3C50E0"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                          fill="#3C50E0"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                          fill="#3C50E0"
                        />
                      </svg>
                    </span>
                    <p className="text-sm font-medium">
                      <span className="text-primary">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="mt-1.5 text-sm font-medium">
                      SVG, PNG, JPG or GIF
                    </p>
                    <p className="text-sm font-medium">(max, 800 X 800px)</p>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-2">
                  <Button
                    // style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                    className="bg-blue-500"
                    disabled={!isEditing}
                  >
                    Cancel
                  </Button>
                  <Button
                   onClick={handleSubmitProfilePic}
                    // style={{ width: "100%" }}
                    type="primary"
                    // htmlType="submit"
                    className="bg-blue-500"
                    disabled={!isEditing}
                  >
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-span-5 xl:col-span-3 mb-5">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
              Corporate Password
              </h3>
            </div>
            <div className="p-7">
              <Form
                onFinish={updatePassword}
                layout="vertical"
                className="row-col"
                disabled={!isEditing}
              >
                <Form.Item
                  className="username"
                  label="Org old password"
                  name="old_password"
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
                  className="username"
                  label="Org new password"
                  name="new_password"
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
                  {isLoading ? (
                    <Button
                      style={{ width: "100%" }}
                      type="primary"
                      htmlType="submit"
                      loading
                      className="bg-blue-500"
                    >
                      Saving...
                    </Button>
                  ) : (
                    <Button
                      style={{ width: "100%" }}
                      type="primary"
                      htmlType="submit"
                      className="bg-blue-500"
                    >
                      Save
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoporateProfile;
