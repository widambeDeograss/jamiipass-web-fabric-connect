import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import { useAppSelector } from "../../app/store/store-hooks";
import { useAppDispatch } from "../../app/store/store-hooks";
import { toogleSidebar } from "../../app/store/slices/AppState-slice";
import { Outlet } from "react-router-dom";
import CustomAlert from "../../components/Alerts/Alerts";
import { useDataFetch } from "../../hooks/datahook";
import { organizationUrls, corporateUrls } from "../../utils/apis";
import { useEffect, useState } from "react";


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

const ProfileOverview = () => {
  const dispatch = useAppDispatch();
  const [isloading, setisloading] = useState(false);
  const datafetch = useDataFetch();
  const isOrg = useAppSelector((state) => state.AppStateReducer.isOrg);
  const [orgInfo, setorgInfo] = useState<organizationInterfc>();
  const [corpInfo, setcorpInfo] = useState<corporateInterfc>();

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
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-3 lg:!mb-0">
          <Banner record={isOrg === "orgn"? headerData: headerDataCorp}/>
        </div>
        <div className="col-span-5 lg:col-span-9 lg:mb-0 3xl:col-span-5">
          <General record={isOrg === "orgn"? headerData: headerDataCorp}/>
        </div>

      </div>
      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-12 lg:mb-0 3xl:col-span-4">
          <Project record={isOrg === "orgn"? headerData: headerDataCorp}/>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
