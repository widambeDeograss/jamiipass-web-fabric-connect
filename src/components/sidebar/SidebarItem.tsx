// SidebarItems.js
import React from 'react';
import { Divider, Menu } from 'antd';
import { HomeOutlined, UserOutlined, SettingOutlined, CreditCardOutlined,ReconciliationOutlined, BilibiliOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../app/store/store-hooks';
import {useNavigate, useLocation} from "react-router-dom" 

const SidebarItems = ({ theme }:any) => {
  const isOrg = useAppSelector(state => state.AppStateReducer.isOrg);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(isOrg);
  
  
  return (
    <Menu theme={theme} mode="inline" selectedKeys={[pathname]}
    onSelect={({ key }) => navigate(key)} >
      {isOrg === "orgn"? (<>
        <Menu.Item key="/" icon={<HomeOutlined size={10} />}>
        Organization home
      </Menu.Item>
      <Divider/>
      <Menu.Item key="/org_identifications" icon={<CreditCardOutlined  size={10}/>}>
      Identifications
      </Menu.Item>
      <Menu.Item key="/org_approved_identifications" icon={<CheckCircleOutlined  size={10}/>}>
        Approved Requests
      </Menu.Item>
      <Menu.Item key="/identity_requests" icon={<ReconciliationOutlined  size={10}/>}>
        Identity Requests
      </Menu.Item>
      <Menu.Item key="/profile" icon={<UserOutlined  size={10} className='text-[10px]'/>}>
       Organization profile
      </Menu.Item>
      </>):
      <>
       <Menu.Item key="/" icon={<HomeOutlined size={10} />}>
        Corporate home
      </Menu.Item>
      <Divider/>
      <Menu.Item key="/all_corporate_id_shares" icon={<CreditCardOutlined  size={10}/>}>
      Identity Shares
      </Menu.Item>
      <Menu.Item key="/corp_profile" icon={<UserOutlined  size={10} className='text-[10px]'/>}>
      Corporate Profile
      </Menu.Item>
      </>
      }
     
    </Menu>
  );
};

export default SidebarItems;
