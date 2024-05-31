// App.js
import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import Sidebar from "../components/sidebar/SideBar";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useAppSelector } from "../app/store/store-hooks";
import { useAppDispatch } from "../app/store/store-hooks";
import { toogleSidebar } from "../app/store/slices/AppState-slice";
import { Outlet } from "react-router-dom";
import CustomAlert from "../components/Alerts/Alerts";
import { useDataFetch } from "../hooks/datahook";
import { organizationUrls, corporateUrls } from "../utils/apis";
import {ExclamationCircleOutlined} from '@ant-design/icons';
import modal from 'antd/es/modal';

const { Content } = Layout;

interface organizationInterfc {
  email: string;
  created_at: string;
  email_verified: boolean;
  org_id: string;
  org_name: string;
  phone: string;
  pic: string;
}

interface corporateInterfc{
  email: string;
  created_at: string;
  email_verified: boolean;
  corp_id: string;
  corp_name: string;
  phone: string;
  pic: string;
}

const DefaultLayout = () => {
  const dispatch = useAppDispatch();
  const [isloading, setisloading] = useState(false);
  const datafetch = useDataFetch();
  const sider = useAppSelector((state) => state.AppStateReducer.siderbar0pen);
  const isOrg = useAppSelector((state) => state.AppStateReducer.isOrg);
  const [orgInfo, setorgInfo] = useState<organizationInterfc>();
  const [corpInfo, setcorpInfo] = useState<corporateInterfc>();

  const toggleCollapsed = () => {
    dispatch(toogleSidebar());
  };

  const loadData = async () => {
    if (isOrg === "orgn") {
      try {
        setisloading(true);
        const response = await datafetch.fetch({
          url: organizationUrls.organizationInfo,
        });
        if (response) {
          setorgInfo(response?.data);
        }
        setisloading(false);
      } catch (error) {
        setisloading(false);
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
    } else {
      try {
        setisloading(true);
        const response = await datafetch.fetch({
          url: corporateUrls.corporateInfo,
        });
        if (response) {
          setcorpInfo(response?.data);
        }
        setisloading(false);
      } catch (error) {
        setisloading(false);
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
  };

  useEffect(() => {
    loadData();
  }, []);

  const headerData = {
    email: orgInfo?.email ||  undefined,
    created_at: orgInfo?.created_at ||  undefined,
    email_verified:orgInfo?.email_verified || undefined,
    id:orgInfo?.org_id ||  undefined,
    name: orgInfo?.org_name || undefined,
    phone: orgInfo?.phone || undefined,
    pic: orgInfo?.pic ||  undefined,
  }

  const headerDataCorp = {
    email:  corpInfo?.email || undefined,
    created_at: corpInfo?.created_at  || undefined,
    email_verified:corpInfo?.email_verified || undefined,
    id:corpInfo?.corp_id || undefined,
    name: corpInfo?.corp_name || undefined,
    phone: corpInfo?.phone || undefined,
    pic: corpInfo?.pic || undefined,
  }
  
   
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <CustomAlert />
      <Header record={isOrg === "orgn"? headerData: headerDataCorp}/>
      <Layout style={{ marginLeft: sider ? 80 : 220 }}>
      <div >   <Sidebar collapsed={sider} toggleCollapsed={toggleCollapsed} /></div>
        <Content style={{}}>
          {!sider && (
            <div
              className="absolute top-16 w-full h-full bg-slate-700 bg-opacity-90 z-50 block sm:block lg:hidden -ml-10"
              style={{ opacity: "revert-layer" }}
            ></div>
          )}

          <div
            className=""
            style={{ padding: 10, minHeight: 360, overflowY: "auto" }}
          >
            {isloading ? (
              <div className="grid h-[100vh] max-h-full w-[100%]  max-w-full animate-pulse  place-items-center rounded-sm bg-gray-300"></div>
            ) : (
              <Outlet />
            )}
          </div>
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default DefaultLayout;
