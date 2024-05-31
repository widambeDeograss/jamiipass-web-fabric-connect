import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Input, message } from "antd";
import { organizationUrls } from "../../utils/apis";
import { useFormPost } from "../../hooks/formDataHook";
import { useDataFetch } from "../../hooks/datahook";
import { addAlert } from "../../app/store/slices/AlertsState_slice";
import { useAppDispatch } from "../../app/store/store-hooks";



type modalType = {
  openMOdal: any;
  handleCancel: any;
  loadData: any;
};

interface organizationInterfc {
    org_id: string;
    org_name: string;
  }

const IdentityAddModal = ({
  openMOdal,
  handleCancel,
  loadData
}: modalType) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [orgInfo, setorgInfo] = useState<organizationInterfc>();
  const formPost = useFormPost();
  const dispatch = useAppDispatch();
  const dataFetch = useDataFetch();

  const loadOrgData = async () => {
      try {
        setisloading(true);
        const response = await dataFetch.fetch({
          url: organizationUrls.organizationInfo,
        });
        if (response) {
          setorgInfo(response?.data);
        }
        setisloading(false);
      } catch (error) {
        setisloading(false);

        dispatch(addAlert({title:"Error", type:"error", message:"Failed to fetch Org Identifications try again later!"}));
      }
    
  };

  useEffect(() => {
    loadOrgData();
  }, []);

  const onFinish = async (values: any) => {
    setConfirmLoading(true);

    try {
      console.log(values);

      const body = {
        cert_name: values?.name
      }

      const response = await formPost.post({url:organizationUrls.organizationCreateIdentity, data:body})
      console.log(response);

      if (response?.success) {
        //NOTIFACTION
        dispatch(addAlert({title:"success", type:"success", message: `Identification added succesfully to ${orgInfo?.org_name}`}));
        loadData();
      } else {
        dispatch(addAlert({title:"Error", type:"error", message:"Failed to add Identifications try again later!"}));
      }
    } catch (error) {
        dispatch(addAlert({title:"Adding failed", type:"error", message:"No server responce try again later!"}));
    }
    setConfirmLoading(false);
  };

  return (
    <div>
      <Modal
        title={`${orgInfo?.org_name} Add Identification`}
        open={openMOdal}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[<div></div>]}
      >
       
        <Form onFinish={onFinish}>
         

         {
            isloading? <div>

            Loading....
          </div>: <Form.Item
            className="username "
            label="Identity name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input identity name!",
              },
            ]}
          >
            <Input placeholder="name" />
          </Form.Item>
         }
 
  
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="default" htmlType="submit" loading={confirmLoading}>
              {confirmLoading ? "Adding Identification..." : "Add Identification"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default IdentityAddModal;
