// Sidebar.js
import React, { useState } from 'react';
import { Layout } from 'antd';
import SidebarItems from './SidebarItem';
import { SettingOutlined, AimOutlined, LineChartOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../app/store/store-hooks';

const { Sider } = Layout;

const Sidebar = ({ collapsed, toggleCollapsed, bgColor }:any) => {
  const [theme, setTheme] = useState('light');
  const darkMode = useAppSelector((state) => state.AppStateReducer.isDarkMode);
  

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: "white", position: "fixed", 
    left: 0, height:"100vh", width:"2050px" }} >
      <SidebarItems theme={darkMode? 'dark':'light'} />
      <div className="px-4 py-4 border-t border-gray-800 absolute bottom-32">
          <ul>
            <li className="my-2">
              <a href="#" className="flex items-center py-2 px-2 rounded text-black">
                <AimOutlined className="text-xl" />
                {!collapsed && <span className="ml-4">About</span>}
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="flex items-center py-2 px-2 rounded text-black ">
                <SettingOutlined className="text-xl " />
                {!collapsed && <span className="ml-4">Support</span>}
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="flex items-center py-2 px-2 rounded text-black">
                <LineChartOutlined className="text-xl" />
                {!collapsed && <span className="ml-4">Coming Soon</span>}
              </a>
            </li>
          </ul>
        </div>
      {/* {!collapsed && (
       <div className='p-2'>
          <div
         className="absolute bottom-32  mb-10 w-full max-w-56  border border-strokedark bg-boxdark py-6 px-2 text-center shadow-lg rounded-lg ">
         <h3 className="mb-1 font-semibold text-">JamiiPass</h3>
         <p className="mb-4 text-xs">A decentralized digital identity ecosystem</p>
          <a
         href="#"
         target="_blank"
         rel="nofollow"
         className="flex items-center justify-center rounded-md bg-slate-400 p-2 font-medium text-black hover:bg-opacity-90"
       >
         JamiiPass
       </a> 
       </div>
       </div>
      )} */}
    </Sider>
  );
};

export default Sidebar;
