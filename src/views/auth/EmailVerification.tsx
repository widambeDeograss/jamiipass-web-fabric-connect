import React from 'react';
import { Card } from 'antd';
import { useAppSelector } from '../../app/store/store-hooks';
import { Colors } from '../../constants/Colors';

const EmailVerification = () => {
    const darkmode = useAppSelector((state) =>  state.AppStateReducer.isDarkMode);

  return (
    <div className=''
    style={{backgroundColor: darkmode? Colors.addson: 'white'}}
    >

    </div>
  )
}

export default EmailVerification