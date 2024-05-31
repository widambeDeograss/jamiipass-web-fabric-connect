import React from 'react'
import { Dropdown, Space, Avatar, MenuProps } from 'antd'
import {ExclamationCircleOutlined, StarOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons';
import modal from 'antd/es/modal';
import { baseUrl } from '../../utils/baseUrl';
interface recordInterfc {
  email: string;
  created_at: string;
  email_verified: boolean;
  id: string;
  name: string;
  phone: string;
  pic: string;
}

const DropDownUser = (props:{record:recordInterfc}) => {
    const items: MenuProps["items"] = [
        {
          key: "1",
          label: (
              <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/profile"

              >
                JamiiPass
              </a>
          ),
        },
        {
          key: "2",
          label: (
              <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.aliyun.com"
              >
               {props.record.name} Admin
              </a>
          ),
          icon: <StarOutlined />,
          disabled: true,
        },
        {
          key: "4",
          danger: true,
          icon: <LogoutOutlined />,
          label: "Log out",
          onClick:() => {
            modal.confirm({
              title: 'Confirm',
              icon: <ExclamationCircleOutlined />,
              content: 'Log out from JamiiPass',
              okText: 'OK',
              okType:"danger",
              cancelText: 'cancel',
              onOk:() => {
                localStorage.clear();
                window.location.reload()
              }
            });
          }
        },
      ];
  return (
    <div>
         <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar size={40} src={baseUrl + `/${props.record.pic}`}>  
                <UserOutlined /> 
                </Avatar>
              </Space>
            </a>
          </Dropdown>
    </div>
  )
}

export default DropDownUser