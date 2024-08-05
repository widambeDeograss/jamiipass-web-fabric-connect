import { useEffect, useState } from "react";
import {
  Card,
} from "antd";
import { corporateUrls, networkUrls } from "../../utils/apis";
import { banner1 } from "../../components/entryFile/imagePaths";
import { addAlert } from "../../app/store/slices/AlertsState_slice";
import { useAppDispatch } from "../../app/store/store-hooks";
import { useDataFetch } from "../../hooks/datahook";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import { renderDateTime } from "../../utils/renderDateTime";
import { baseUrl } from "../../utils/baseUrl";
import {  EyeFilled } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useFormPost } from "../../hooks/formDataHook";
import axios from "axios";
import ConnectingToNetworkModel from "../../components/modals/ConnectingToNetworkModel";
import DocumentViewer from "../../components/identityViewer/IdentityViewer";

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
shared_hash:any;
}

export const CorpIdentityShareDetails = () => {
  const [isloading, setisloading] = useState(false);
  const [shareHistory, setshareHistory] = useState<historyInterFc>();
  const [shareCard, setshareCard] = useState([]);
  const [isConnecting, setisConnecting] = useState(false);
  const [connectionToken, setconnectionToken] = useState();
  const [documentHash, setdocumentHash] = useState();
  const params = useParams();
  const formPost = useFormPost();
  const dispatch = useAppDispatch();
  const dataFetch = useDataFetch();
  
  const loadData = async () => {
    try {
      setisloading(true);
      const response = await dataFetch.fetch({
        url: corporateUrls.corporateShareInfo + `/${params.id}`,
      });
      if (response) {
        console.log(response);
        
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

  
  const handleConnectToNetwork = async () => {
    const body = {
      username: "NHIFadm",
      orgName: "NHIFOrg"
    };
    setisConnecting(true);
    try {
      const response = await formPost.post({
        url: networkUrls.connectToNetwork,
        data: body,
      });
      console.log(response);

      if (response.success) {
        setconnectionToken(response?.message.token);
        dispatch(
          addAlert({
            title: "Connection success",
            type: "success",
            message: "Connected successfull to JamiiPass Network",
          })
        );
      } else {
        dispatch(
          addAlert({
            title: "Connection failed",
            type: "error",
            message: "Invalid Connection credentials try again!",
          })
        );
      }
      setisConnecting(false);
    } catch (error: any) {
      console.log(error);
      
      if (!error?.respose) {
        dispatch(
          addAlert({
            title: "Connection failed",
            type: "error",
            message: "No Network response responce try again later!",
          })
        );
      } else if (error.respose?.status === 400) {
        dispatch(
          addAlert({
            title: "Login failed",
            type: "error",
            message: "No Network response responce try again later!!",
          })
        );
      } else {
        dispatch(
          addAlert({
            title: "Login failed",
            type: "error",
            message: "No server responce try again later!",
          })
        );
      }
    } finally {
      setisConnecting(false);
    }
  };

  const getSharedDocument = async (tranactionId:any) => {
    handleConnectToNetwork();
    console.log(tranactionId);
    console.log('====================================');
    console.log(connectionToken);
    console.log('====================================');

   try {
    const requestHeader = {
      headers: {
        authorization: "Bearer " + connectionToken,
      },
    };

    await axios
        .get(networkUrls.getCertFromNtwork + `?fcn=GetIdentityByTransactionID&&args=${tranactionId}`, requestHeader)
        .then((res:any) => {
          if (res.status === 200) {
            // setOrganizationCertificates(cert[0]);
            setdocumentHash(res?.data?.result?.documentHash);
            downloadConvertedFile();
            console.log(res);  
            dispatch(
              addAlert({
                title: "Identity retrived success",
                type: "success",
                message: `Identity retrived successfull to JamiiPass Network`,
              }) 
              
            );
      
            
          //  }else{
          //   dispatch(
          //     addAlert({
          //       title: "Identity retrived failed",
          //       type: "error",
          //       message: `No Identity with this user. Identity share expired`,
          //     })
          //   );
          //  }
          }
        })
        .catch((error) => {
          console.log(error);
          
          dispatch(
            addAlert({
              title: "Connection failed",
              type: "error",
              message: "No Network response responce try again later!",
            })
          );
          // throw error.message;
          throw error;
        });
   } catch (error) {
    
   }
  }

  const downloadConvertedFile = () => {
    if (documentHash) {
      const byteString = atob(documentHash);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const newBlob = new Blob([ia], { type: "application/pdf" });
      const url = window.URL.createObjectURL(newBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "document";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };
  console.log('====================================');
 console.log(documentHash);
 console.log('====================================');
     
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
    <Card extra={"Identity share details"}>
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
              Date issued .
              <a
                className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                {renderDateTime(shareHistory?.created_at)}
              </a>
            </p>
          </div>
        </div>
        <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white cursor-pointer"
        onClick={() => getSharedDocument(shareHistory?.shared_hash?.split("_")[0])}
        >
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
        <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white cursor-pointer"
         onClick={() => getSharedDocument(shareHistory?.shared_hash?.split("_")[1])}
        >
          <EyeFilled />
        </div>
      </div>
    
    </Card>
    </div>
   
  </div>
  <ConnectingToNetworkModel openMOdal={isConnecting} type="connecting" />
  <DocumentViewer documentBase64={documentHash}/>
  </div>
  )
};
