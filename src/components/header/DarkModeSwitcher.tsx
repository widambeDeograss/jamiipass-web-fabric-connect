import React from 'react';
import { Switch } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/store/store-hooks';
import { toggleThemeMode } from '../../app/store/slices/AppState-slice';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

const DarkModeSwitcher = () => {
    const dispatch = useAppDispatch();
    const isDarkMode = useAppSelector((state) => state.AppStateReducer.isDarkMode);

    const toggleThemeFc = () => {
        dispatch(toggleThemeMode());
    };
    console.log(isDarkMode);
    
    return (
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
            <Switch
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined className='text-black'/>}
                checked={isDarkMode}
                onChange={toggleThemeFc}
                defaultChecked
            />
        </div>
    );
};

export default DarkModeSwitcher;
