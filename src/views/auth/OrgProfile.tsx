import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import { Avatar, Button, Form, Input, Space } from "antd";
import { EditOutlined, UserOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { baseUrl } from "../../utils/baseUrl";
import { organizationUrls } from "../../utils/apis";
import modal from "antd/es/modal";
import { useDataFetch } from "../../hooks/datahook";

interface organizationInterfc {
  email: string;
  created_at: string;
  email_verified: boolean;
  org_id: string;
  org_name: string;
  phone: string;
  pic: string;
}

const Profile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const [organizatioInfo, setorganizatioInfo] = useState<organizationInterfc>();
  const datafetch = useDataFetch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission for personal information
  };

  const loadData = async() => {
    try {
      setIsLoading(true);
      const response = await datafetch.fetch({
        url: organizationUrls.organizationInfo,
      });
      if (response) {
        setorganizatioInfo(response?.data);
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
  
  const handleCancel = () => {
    // Handle cancel action for personal information
  };

  const handlePhotoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission for user photo
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file change for user photo
  };

  const handlePhotoCancel = () => {
    // Handle cancel action for user photo
  };

  const deletePhoto = () => {
    // Handle delete action for user photo
  };

  const updatePhoto = () => {
    // Handle update action for user photo
  };
  return (
    <>
      <BreadCrumb title="Profile" type="Organization" />
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Organization Information
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
                onFinish={handleSubmit}
                layout="vertical"
                className="row-col"
                disabled={!isEditing}
              >
                <Form.Item
                  className="username"
                  label="Org email"
                  name="email"
                  initialValue={organizatioInfo?.email}
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
                  label="Org name"
                  name="org_name"
                  initialValue={organizatioInfo?.org_name}
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <Input placeholder="Name" type="text" className="" />
                </Form.Item>
                <Form.Item
                  className="username"
                  label="Org phone"
                  name="phone"
                  initialValue={organizatioInfo?.phone}
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone!",
                    },
                  ]}
                >
                  <Input placeholder="Phone" type="text" className="" />
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
                Organization profile
              </h3>
            </div>
            <div className="p-7">
              <form>
                <div className="mb-4 flex items-center gap-3">
                  <Space>
                    <Avatar
                      size={60}
                      src={baseUrl + `/${organizatioInfo?.pic}`}
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
                    // style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
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
                Organization Password
              </h3>
            </div>
            <div className="p-7">
              <Form
                onFinish={handleSubmit}
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

export default Profile;
