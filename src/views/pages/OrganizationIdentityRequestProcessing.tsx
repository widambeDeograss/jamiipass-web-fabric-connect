import { useEffect, useState } from "react";
import { Card, Upload, UploadFile } from "antd";
import { organizationUrls } from "../../utils/apis";
import { banner1 } from "../../components/entryFile/imagePaths";
import { addAlert } from "../../app/store/slices/AlertsState_slice";
import { useAppDispatch } from "../../app/store/store-hooks";
import { useDataFetch } from "../../hooks/datahook";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import { renderDateTime } from "../../utils/renderDateTime";
import { baseUrl } from "../../utils/baseUrl";
import { EyeInvisibleFilled, UploadOutlined, EyeFilled } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import ConnectingToNetworkModel from "../../components/modals/ConnectingToNetworkModel";
import { useFormPost } from "../../hooks/formDataHook";
import { networkUrls } from "../../utils/apis";
import axios from "axios";
import DocumentViewer from "../../components/identityViewer/IdentityViewer";
import { DatePicker } from "antd";

interface IdentificationRequestInterFc {
  id: string;
  user_id: string;
  org_id: string;
  cert_id: string;
  created_at: string;
  request_state: string;
  first_name: string;
  last_name: string;
  nida_no: string;
  profile: string;
  phone: string;
  cert_name: string;
  card_no: string;
}

interface organizationInterfc {
  email: string;
  created_at: string;
  org_id: string;
  org_name: string;
}

function formatDate(input: string): string | null {
  const dateParts = input.split('-');

  if (dateParts.length !== 3) {
      console.error('Invalid date format');
      return null;
  }


  const year = dateParts[0];
  let month = dateParts[1];
  let day = dateParts[2];

  month = month.padStart(2, '0');
  day = day.padStart(2, '0');

  const formattedDateString = `${year}-${month}-${day}`;

  // Return the formatted date string
  return formattedDateString;
}

const OrganizationIdentityRequestProcessing = () => {
  const [isloading, setisloading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);
  const [IdetificationRequest, setIdetificationRequest] =
    useState<IdentificationRequestInterFc>();
  const [isAssigning, setisAssigning] = useState(false);
  const [PostingCertificate, setPostingCertificate] = useState(false);
  const [isConnecting, setisConnecting] = useState(false);
  const [connectionToken, setconnectionToken] = useState();
  const [orgInfo, setorgInfo] = useState<organizationInterfc>();
  const [OrganizationCertificates, setOrganizationCertificates] = useState<any>([]);
  const [documentHash, setdocumentHash] = useState();
  const params = useParams();
  const dispatch = useAppDispatch();
  const dataFetch = useDataFetch();
  const formPost = useFormPost();

  const loadData = async () => {

    try {
      setisloading(true);
      const response = await dataFetch.fetch({
        url: organizationUrls.organizationIdentityReguestInfo + `/${params.id}`,
      });
      const responseOrg = await dataFetch.fetch({
        url: organizationUrls.organizationInfo,
      });
      if (response) {
        setIdetificationRequest(response?.data[0]);
        setorgInfo(responseOrg?.data);
      }
      setisloading(false);
    } catch (error) {
      setisloading(false);
      dispatch(
        addAlert({
          title: "Error",
          type: "error",
          message:
            "Failed to fetch identification request reqs try again later!",
        })
      );
    }
  };

  const handleConnectToNetwork = async () => {
    const body = {
      username: orgInfo?.org_name === "NIDA" ?  "NIDAadm": orgInfo?.org_name === "DIT"? "DITadm":orgInfo?.org_name === "NHIF"? "NHIFadm":orgInfo?.org_name === "RITA"? "RITadm":"TRAadm",
      orgName: orgInfo?.org_name === "NIDA" ?  "NIDAOrg": orgInfo?.org_name === "DIT"? "DITOrg":orgInfo?.org_name === "NHIF"? "NHIFOrg":orgInfo?.org_name === "RITA"? "RITAOrg":"TRAOrg",
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

  const getOrganizationAssignedCertificates = async () => {
    handleConnectToNetwork();

   try {
    const requestHeader = {
      headers: {
        authorization: "Bearer " + connectionToken,
      },
    };
    // let args = req.query.args;
    //     let fcn = req.query.fcn;
    await axios
        .get(networkUrls.addCertToNtwork + `?fcn=GetIdentitiesByOrganization&&args=${orgInfo?.org_name}`, requestHeader)
        .then((res) => {
          if (res.status === 200) {
            const cert = res.data?.result?.filter((c:any) =>  c.documentNo == IdetificationRequest?.card_no);
            setOrganizationCertificates(cert[0]);
            setdocumentHash(cert[0].documentHash);
            downloadConvertedFile();
            console.log(cert);         
            dispatch(
              addAlert({
                title: "Identity retrived success",
                type: "success",
                message: `Identity retrived successfull to JamiiPass Network`,
              })
            );
            
          }
        })
        .catch((error) => {
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

  useEffect(() => {
    loadData();
  }, []);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = function (event: any) {
      const blob: any = new Blob([event.target.result], {
        type: "application/pdf",
      });
      setPdfBlob(blob);
    };
    reader.readAsArrayBuffer(file);
  };

  const changeRequestStatus = async (status: string) => {
    try {
      const body = {
        id: IdetificationRequest?.id,
        status: status,
      };
      const response = await formPost.post({
        url: networkUrls.changeRequestStatus,
        data: body,
      });

      if (response.success) {
        dispatch(
          addAlert({
            title: "Update success",
            type: "success",
            message: "Request status updated successfully",
          })
        );
        setisAssigning(false);
        loadData();
      } else {
        dispatch(
          addAlert({
            title: "Update failed",
            type: "error",
            message: "Request status updated failed try again!",
          })
        );
      }
    } catch (error) {
      console.log(error);

      dispatch(
        addAlert({
          title: "Update failed",
          type: "error",
          message: "Request status updated failed try again!",
        })
      );
    }
  };

  const convertToBase64 = () => {
    if (pdfBlob) {
      const reader = new FileReader();
      reader.onload = function (event: any) {
        const base64String = event.target.result.split(",")[1];
        setConvertedFile(base64String);
      };
      reader.readAsDataURL(pdfBlob);
    }
  };

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

  const handlePostCertificateToNetwork = async () => {
    if (connectionToken === undefined || convertedFile === null) {
      dispatch(
        addAlert({
          title: "Connection failed",
          type: "error",
          message: "Connection failure or file hasnt been submitted!",
        })
      );
      return;
    }
    const requestHeader = {
      headers: {
        authorization: "Bearer " + connectionToken ,
      },
    };
    const tranactionId = "id" + Math.random().toString(16).slice(2);
    const date =`${ new Date().getFullYear()}-${ new Date().getMonth()}-${ new Date().getDate()}`;
    const formatedDate = formatDate(date);
    const data = {
      fcn: "CreateIdentity",
      peers: [
        "peer0.nida.example.com",
        "peer0.dit.example.com",
        "peer0.nhif.example.com",
        "peer0.rita.example.com",
        "peer0.tra.example.com",
      ],
      chaincodeName: "id",
      channelName: "mychannel",
      args: [
        tranactionId,
        IdetificationRequest?.user_id,
        convertedFile,
        IdetificationRequest?.card_no,
        `${IdetificationRequest?.first_name} ${IdetificationRequest?.last_name}`,
        orgInfo?.org_name,
        formatedDate,
        "true",
      ],
    };
    try {
      console.log(data);
      
      await axios
        .post(networkUrls.addCertToNtwork, data, requestHeader)
        .then((res) => {
          console.log(res);
          
          if (res.data?.result?.result.success) {
            dispatch(
              addAlert({
                title: "Identity assigned success",
                type: "success",
                message: `Identity assigned successfull to JamiiPass Network`,
              })
            );
            changeRequestStatus("Granted");
          }
        })
        .catch((error) => {
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
      dispatch(
        addAlert({
          title: "Connection failed",
          type: "error",
          message: "No Network response responce try again later!",
        })
      );
    }
  };


 console.log('====================================');
 console.log(documentHash);
 console.log('====================================');
  return (
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
                <img
                  className="h-full w-full rounded-full"
                  src={baseUrl + `/${IdetificationRequest?.profile}`}
                  alt=""
                />
              </div>
            </div>

            {/* Name and position */}
            <div className="mt-16 flex flex-col items-center">
              <div>
                <h3
                  className="text-base font-bold text-navy-700 dark:text-white
            "
                >
                  {IdetificationRequest?.first_name}{" "}
                  {IdetificationRequest?.last_name}
                </h3>
              </div>

              <p className="text-sm font-normal text-gray-600">
                NIDA:{IdetificationRequest?.nida_no}
              </p>
              <p className="text-sm font-normal text-gray-600">
                Phone:{IdetificationRequest?.phone}
              </p>
            </div>
          </Card>
        </div>
        <div className="col-span-5 lg:col-span-9 lg:mb-0 3xl:col-span-5">
          <Card>
            <div className="mb-8 w-full">
              <div className="flex justify-between items-center">
                <h4
                  className="text-sm
                 font-bold text-navy-700 dark:text-white"
                >
                  Digital Identity Request
                </h4>
                <div>
                  {IdetificationRequest?.request_state === "Requested" ? (
                    <div>
                      <button className="animate-pulse bg-orange-200">
                        Requested
                      </button>
                    </div>
                  ) : IdetificationRequest?.request_state === "Processing" ? (
                    <div>
                      <button className="animate-pulse bg-yellow-200">
                        Processing
                      </button>
                    </div>
                  ) : IdetificationRequest?.request_state === "Granted" ? (
                    <div>
                      <button className="animate-pulse bg-green-200"
                      // onClick={}
                      >
                        Granted
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button className="animate-pulse bg-red-300">
                        Denied
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-600">
                {IdetificationRequest?.first_name}{" "}
                {IdetificationRequest?.last_name}, of Nida No{" "}
                {IdetificationRequest?.nida_no} requested a digital Identity on{" "}
                {IdetificationRequest?.cert_name} offered by your organization
                with a physical card no of {IdetificationRequest?.card_no} on{" "}
                {renderDateTime(IdetificationRequest?.created_at)}, check below
                for Information on the requested card!
              </p>
            </div>

            <div className="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <div className="flex items-center">
                <div className="">
                  {/* <img className="h-[83px] w-[83px] rounded-lg" src={image1} alt="" /> */}
                </div>
                <div className="ml-4">
                  <p className="text-base font-medium text-navy-700 dark:text-white">
                    {IdetificationRequest?.cert_name}
                  </p>
                  <p className="text-sm font-medium text-navy-700 dark:text-white">
                    Card No: {IdetificationRequest?.card_no}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Date requested #1 .
                    <a
                      className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                      href=" "
                    >
                      {renderDateTime(IdetificationRequest?.created_at)}
                    </a>
                  </p>
                </div>
              </div>
              <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
               { IdetificationRequest?.request_state === "Granted"? <span
               className="hover:bg-slate-300 p-[0.3px] px-1 rounded-sm cursor-pointer"
               onClick={() => {
                getOrganizationAssignedCertificates();
              }}
               ><EyeFilled /></span>:<EyeInvisibleFilled />} 
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-base font-bold text-navy-700 dark:text-white">
                Actions
              </h4>
              <div className="mt-2">
                {IdetificationRequest?.request_state === "Requested" ? (
                  <div className="flex gap-5 flex-wrap text-xs">
                    <button
                      className=" bg-red-200 hover:border-2 hover:border-black"
                      onClick={() => changeRequestStatus("Denied")}
                    >
                      Deny Request
                    </button>
                    <button
                      className=" bg-blue-300 hover:border-2 hover:border-black"
                      onClick={() => changeRequestStatus("Processing")}
                    >
                      Mark as Processing
                    </button>
                    <button
                      className=" bg-green-200 hover:border-2 hover:border-black"
                      onClick={() => {
                        setisAssigning(true);
                      }}
                    >
                      Assign a digital {IdetificationRequest?.cert_name}
                    </button>
                  </div>
                ) : IdetificationRequest?.request_state === "Processing" ? (
                  <div className="flex gap-5 flex-wrap text-xs">
                    <button
                      className=" bg-red-200 hover:border-2 hover:border-black"
                      onClick={() => changeRequestStatus("Denied")}
                    >
                      Deny Request
                    </button>
                    <button
                      className=" bg-green-200 hover:border-2 hover:border-black"
                      onClick={() => {
                        setisAssigning(true);
                      }}
                    >
                      Assign a digital {IdetificationRequest?.cert_name}
                    </button>
                  </div>
                ) : IdetificationRequest?.request_state === "Granted" ? (
                  <div>
                    <button className="animate-pulse bg-green-200"
                    onClick={handlePostCertificateToNetwork}
                    >
                      Granted
                    </button>
                    {/* <button
                      className=" bg-blue-300 hover:border-2 hover:border-black"
                      onClick={() => changeRequestStatus("Processing")}
                    >
                      Mark as Processing
                    </button> */}
                  </div>
                ) : (
                  <div className="flex gap-5 flex-wrap text-xs">
                    <button className="animate-pulse bg-red-300">Denied</button>
                    <button
                      className=" bg-blue-300 hover:border-2 hover:border-black"
                      onClick={() => changeRequestStatus("Processing")}
                    >
                      Change to Processing
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
      {isAssigning && (
        <div className="col-span-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3 ">
          <Card className=" gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none mb-20">
            <div className="flex h-[350px] gap-5">
              <div className=" h-full w-full  rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6">
                {/* <Upload accept="pdf*"  ></Upload> */}
                <button className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0">
                  {/* <UploadOutlined className="text-[80px] text-brand-500 dark:text-white" /> */}
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf"
                    required
                    //  className="hidden"
                  />
                  <h4 className="text-sm font-bold text-brand-500 dark:text-white">
                    Upload Files
                  </h4>
                  <p className="mt-2 text-xs font-medium text-gray-600">
                    PNG, JPG and GIF files are allowed
                  </p>
                </button>
              </div>
              <div className=" flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
                <h5 className="text-left text-sm font-bold leading-9 text-navy-700 dark:text-white">
                  {IdetificationRequest?.cert_name} Digital Identity
                </h5>
                <p className="leading-1 mt-2 text-xs font-normal text-gray-600">
                  Stay on the pulse of distributed projects with an anline
                  whiteboard to plan, coordinate and discuss
                </p>
                {connectionToken ? (
                <>
                <DatePicker className="mb-3"></DatePicker>
                  <button
                    className="linear mt-4 flex items-center bg-blue-500 justify-center rounded-xl px-2 py-2 text-sm font-medium text-white transition duration-200 hover:bg-blue-600"
                    onClick={() => {
                      convertToBase64();
                      handlePostCertificateToNetwork();
                    }}
                  >
                    Publish to Blockchain now
                  </button>
                </>
                ) : (
                  <button
                    className="linear mt-4 flex items-center bg-blue-500 justify-center rounded-xl px-2 py-2 text-sm font-medium text-white transition duration-200 hover:bg-blue-600"
                    onClick={() => {
                      setisConnecting(true);
                      handleConnectToNetwork();
                    }}
                  >
                    Connect to the network
                  </button>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
      <ConnectingToNetworkModel openMOdal={isConnecting} type="connecting" />
      <ConnectingToNetworkModel openMOdal={PostingCertificate} type="posting" />
      {/* {
      documentHash &&  ( */}
         <DocumentViewer documentBase64={documentHash}/>
        
        {/* )
      } */}
    </div>
  );
};

export default OrganizationIdentityRequestProcessing;
