import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Radio,
  Table,
  Badge,
  Menu,
  Dropdown,
  
} from "antd";
import { corporateUrls } from "../../utils/apis";
import { banner1, avatarProfile } from "../../components/entryFile/imagePaths";
import { addAlert } from "../../app/store/slices/AlertsState_slice";
import { useAppDispatch } from "../../app/store/store-hooks";
import Column from "antd/es/table/Column";
import { useDataFetch } from "../../hooks/datahook";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import { renderDateTime } from "../../utils/renderDateTime";
import { baseUrl } from "../../utils/baseUrl";
import { UserOutlined, ExclamationCircleOutlined, EyeInvisibleFilled, EyeFilled } from "@ant-design/icons";
import modal from "antd/es/modal";
import { useNavigate, useParams } from "react-router-dom";

interface historyInterFc {
  id: string;
  user_id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  nida_no: string;
  profile: string;
  phone: string;
  cards: string;
}

export const CorpIdentityShareDetails = () => {
  const [isloading, setisloading] = useState(false);
  const [addModalOpen, setaddModalOpen] = useState(false);
  const [shareHistory, setshareHistory] = useState<historyInterFc>();
  const [shareCard, setshareCard] = useState([]);
  const params = useParams();
  const dispatch = useAppDispatch();
  const dataFetch = useDataFetch();
  
  const loadData = async () => {
    try {
      setisloading(true);
      const response = await dataFetch.fetch({
        url: corporateUrls.corporateShareInfo + `/${params.id}`,
      });
      if (response) {
        setshareHistory(response?.data);
      }
      setisloading(false);
    } catch (error) {
      setisloading(false);
      dispatch(
        addAlert({
          title: "Error",
          type: "error",
          message: "Failed to fetch Corporate history reqs try again later!",
        })
      );
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  
     
  return  (
  <div className="flex w-full flex-col gap-5">
  <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
    <div className="col-span-3 lg:!mb-0">
    <Card className={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner1})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img className="h-full w-full rounded-full" src={baseUrl + `/${shareHistory?.profile}`} alt="" />
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
    
        <div>

        <h3 className="text-xl font-bold text-navy-700 dark:text-white
          ">{shareHistory?.first_name} {shareHistory?.last_name}</h3>
        </div>
      
        
        <p className="text-base font-normal text-gray-600">NIDA:{shareHistory?.nida_no}</p>
        <p className="text-base font-normal text-gray-600">Phone:{shareHistory?.phone}</p>
      </div>

    </Card>
    </div>
    <div className="col-span-5 lg:col-span-9 lg:mb-0 3xl:col-span-5">
    <Card extra={"w-full p-4 h-full"}>
      <div className="mb-8 w-full">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Identities shared
        </h4>
        <p className="mt-2 text-base text-gray-600">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit numquam veritatis commodi cupiditate, tempora explicabo maxime magnam? Alias eum ut iste atque amet a. Explicabo velit quibusdam consequuntur illo esse!
        </p>
      </div>
      {/* Project 1 */}
      {

      }
      <div className="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex items-center">
          <div className="">
            {/* <img className="h-[83px] w-[83px] rounded-lg" src={image1} alt="" /> */}
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-navy-700 dark:text-white">
            {shareHistory?.cards?.split("_")[0]}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Date issued #1 .
              <a
                className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                {renderDateTime(shareHistory?.created_at)}
              </a>
            </p>
          </div>
        </div>
        <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
          <EyeFilled />
        </div>
      </div>
      <div className="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none mt-1">
        <div className="flex items-center">
          <div className="">
            {/* <img className="h-[83px] w-[83px] rounded-lg" src={image1} alt="" /> */}
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-navy-700 dark:text-white">
            {shareHistory?.cards?.split("_")[1]}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Date issued #1 .
              <a
                className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                {renderDateTime(shareHistory?.created_at)}
              </a>
            </p>
          </div>
        </div>
        <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
          <EyeFilled />
        </div>
      </div>
    

    
    </Card>
    </div>

  </div></div>
  )
};
