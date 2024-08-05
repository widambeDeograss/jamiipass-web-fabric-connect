import React from "react";
import { useAppSelector } from "../../app/store/store-hooks";
import { VerticalLeftOutlined, VerticalRightOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import DarkModeSwitcher from "./DarkModeSwitcher";
import Notifications from "./Notifications";
import DropDownUser from "./DropDownUser";
import { useAppDispatch } from "../../app/store/store-hooks";
import { toogleSidebar } from "../../app/store/slices/AppState-slice";
import { Colors } from "../../constants/Colors";
import { logoImg } from "../entryFile/imagePaths";

interface recordInterfc {
  email: string;
  created_at: string;
  email_verified: boolean;
  id: string;
  name: string;
  phone: string;
  pic: string;
}

const Header = (props:{record:recordInterfc}) => {
  const sider = useAppSelector((state) => state.AppStateReducer.siderbar0pen);
  const isOrg = useAppSelector((state) =>  state.AppStateReducer.isOrg);
  const darkMode = useAppSelector((state) => state.AppStateReducer.isDarkMode);
  const dispatch = useAppDispatch();
  

  const toogleSidebarFC = () => {
    dispatch(toogleSidebar());
  }

  return (
    <header className=" top-0 flex w-full  drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none"
    style={{backgroundColor: darkMode? Colors.addson: 'white',  position: 'sticky',
   
    zIndex: '99', }}
    >
      <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 ">
          <button className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark "
          onClick={toogleSidebarFC}
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              {sider ? <VerticalLeftOutlined /> : <VerticalRightOutlined />}
            </span>
          </button>

          <img src={logoImg} alt="" className="object-cover h-12 w-full rounded-md"/>
          <Divider type="vertical" />
          <h3 className="block flex-shrink-0 font-bold text-lg
          ">JamiiPass</h3>
        </div>
        
        {isOrg === "orgn" ?
  <div>
    <h3 className="block flex-shrink-0 font-semibold text-lg">
      {props?.record.name === "NHIF" ? 
        `National Health Insurance Fund (${props.record.name})` :
        props?.record.name === "DIT" ? 
          `Dar es Salaam Institute of Technology (${props.record.name})` :
          props?.record.name === "NIDA" ? 
            `National Identification Authority (${props.record.name})` :
            props?.record.name === "RITA" ? 
              `Registration Insolvency and Trusteeship Agency (${props.record.name})` :
              props?.record.name === "TRA" ? 
                `Tanzania Revenue Authority (${props.record.name})` :
                `${props.record.name}`
      }
    </h3>
  </div> :
  <div>
    <h3 className="block flex-shrink-0 underline font-semibold text-lg">
      {props?.record.name}
    </h3>
  </div>
}
        
       
        

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <li>
              <DarkModeSwitcher />
            </li> */}

            <Notifications />
          </ul>

          <DropDownUser record={props?.record}/>
        </div>
      </div>
    </header>
  );
};

export default Header;
