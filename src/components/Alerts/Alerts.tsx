import React from 'react';
import { Alert as AntdAlert, Space } from 'antd';
import { useAppSelector } from '../../app/store/store-hooks';
import { AlertInterface } from '../../app/interfaces/interfaces';
import { useAppDispatch } from '../../app/store/store-hooks';
import { cancelAlert } from '../../app/store/slices/AlertsState_slice';


const CustomAlert = () => {
  const alerts = useAppSelector((state) =>  state.AlertStateReducer);
  const dispatch = useAppDispatch()
  

  return (
    <Space
      direction="vertical"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '9999', 
      }}
    >
      {alerts.map((alert:any) => (
        <AntdAlert
          key={alert.id}
          message={alert.title}
          description={alert.message}
          type={alert.type}
          showIcon
          closable
          onClose={() => dispatch(cancelAlert({id:alert.id})) }
        />
      ))}
    </Space>
  );
};

export default CustomAlert;
