import React,{useState} from "react";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import {Button, Card, Col, List, Row, Statistic, Typography, Timeline} from "antd";
import {WalletOutlined, CreditCardFilled, } from "@ant-design/icons";
import { Colors } from "../../constants/Colors";
import Echart from "../../components/chart/EChart";
import LineChart from "../../components/chart/LineChart";
import { useAppSelector } from "../../app/store/store-hooks";

const {Title, Paragraph, Text} = Typography;

const timelineList = [
    {
        title: "Nhif cared shared - Justice Mtalwa card:2026373637",
        time: "09 JUN 7:20 PM",
        color: "green",
    },
    {
        title: "Nhif cared shared - Eliud Mfaume card:2026373637",
        time: "09 JUN 7:20 PM",
        color: "green",
    },
    {
        title: "Nhif cared shared - Eliud Mfaume card:2026373637",
        time: "09 JUN 7:20 PM",
    },

];



const Home = () => {
  const isOrg = useAppSelector((state) => state.AppStateReducer.isOrg);
  const [reverse, setReverse] = useState(false);

    const textColor = "black"; 
  return (
    <div className="relatie z-20">
        <BreadCrumb title="Home" type="Corporate"/>
        
   
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {isOrg === "orgn"? 
       <div className="grid grid-cols-1 mt-3 gap-10 xl:grid-cols-4  lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 px-5 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Card style={{ minHeight: "125px", minWidth: "83x" }}>
          <Row gutter={16} align="middle">
            <Col span={12}>
              <Statistic
                  title="Total Identifications"
                  value="4"
                  valueStyle={{
                    fontSize: "xx-small",
                    fontWeight: "bold",
                    color: textColor,
                  }}
              />
            </Col>
            <Col span={12}>
              <div
                  style={{
                    borderRadius: "50%",
                    height: "45px",
                    maxWidth: "45px",
                    minWidth:"43px",
                    backgroundColor: Colors.secondary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "40px",
                    // padding:"10px"
                    // boxShadow: '200px rgba(0, 0, 0, 0.1)'
                  }}
                  className="min"
              >
                <WalletOutlined className="text-white font-bold" />
              </div>
            </Col>
          </Row>
          <p
                style={{
                    color: "gray.400",
                    fontSize: "xx-small",
                    display: "inline-flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                }}
            >
                <span style={{ color: "green", fontWeight: "bold" }}>
                  +3.48%{" "}
                </span>
                <span className="ml-10">Of total Identities</span>
            </p>
        </Card>
        <Card style={{ minHeight: "125px", minWidth: "83x" }}>
            <Row gutter={16} align="middle">
                <Col span={12}>
                    <Statistic
                        title="Total users assigned"
                        value="3,897"
                        valueStyle={{
                            fontSize: "smaller",
                            fontWeight: "bold",
                            color: textColor,
                        }}
                    />
                </Col>
                <Col span={12}>
                    <div
                        style={{
                            borderRadius: "50%",
                            height: "45px",
                            maxWidth: "45px",
                            minWidth:"43px",
                            backgroundColor: Colors.secondary,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "40px",
                            // padding:"10px"
                            // boxShadow: '200px rgba(0, 0, 0, 0.1)'
                        }}
                        className="min"
                    >
                        <CreditCardFilled className="text-white font-bold" />
                    </div>
                </Col>
            </Row>
            <p
                style={{
                    color: "gray.400",
                    fontSize: "xx-small",
                    display: "inline-flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                }}
            >
                <span style={{ color: "green", fontWeight: "bold" }}>
                  +3.48%{" "}
                </span>
                <span className="ml-10">Since last month</span>
            </p>
        </Card>
        <Card style={{ minHeight: "125px", minWidth: "83x" }}>
            <Row gutter={16} align="middle">
                <Col span={12}>
                    <Statistic
                        title="Total requests"
                        value="897"
                        valueStyle={{
                            fontSize: "smaller",
                            fontWeight: "bold",
                            color: textColor,
                        }}
                    />
                </Col>
                <Col span={12}>
                    <div
                        style={{
                            borderRadius: "50%",
                            height: "45px",
                            maxWidth: "45px",
                            minWidth:"43px",
                            backgroundColor: Colors.secondary,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "40px",
                            // padding:"10px"
                            // boxShadow: '200px rgba(0, 0, 0, 0.1)'
                        }}
                        className="min"
                    >
                        <CreditCardFilled className="text-white font-bold" />
                    </div>
                </Col>
            </Row>
            <p
                style={{
                    color: "gray.400",
                    fontSize: "xx-small",
                    display: "inline-flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                }}
            >
                <span style={{ color: "green", fontWeight: "bold" }}>
                  +3.48%{" "}
                </span>
                <span className="ml-10">Since last month</span>
            </p>
        </Card>
        <Card style={{ minHeight: "125px", minWidth: "83x" }}>
            <Row gutter={16} align="middle">
                <Col span={12}>
                    <Statistic
                        title="Total denied requests"
                        value="97"
                        valueStyle={{
                            fontSize: "smaller",
                            fontWeight: "bold",
                            color: textColor,
                        }}
                    />
                </Col>
                <Col span={12}>
                    <div
                        style={{
                            borderRadius: "50%",
                            height: "45px",
                            maxWidth: "45px",
                            minWidth:"43px",
                            backgroundColor: Colors.secondary,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "40px",
                            // padding:"10px"
                            // boxShadow: '200px rgba(0, 0, 0, 0.1)'
                        }}
                        className="min"
                    >
                        <WalletOutlined className="text-white font-bold" />
                    </div>
                </Col>
            </Row>
            <p
                style={{
                    color: "gray.400",
                    fontSize: "xx-small",
                    display: "inline-flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                }}
            >
                <span style={{ color: "green", fontWeight: "bold" }}>
                  +3.48%{" "}
                </span>
                <span className="ml-10">Since last month</span>
            </p>
        </Card>
      </div>:
       <div className="grid grid-cols-1 mt-3 gap-10 xl:grid-cols-4  lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 px-5 ">
       <Card style={{ minHeight: "125px", minWidth: "83x" }}>
         <Row gutter={16} align="middle">
           <Col span={12}>
             <Statistic
                 title="Total Identities"
                 value="53,897"
                 valueStyle={{
                   fontSize: "xx-small",
                   fontWeight: "bold",
                   color: textColor,
                 }}
             />
           </Col>
           <Col span={12}>
             <div
                 style={{
                   borderRadius: "50%",
                   height: "45px",
                   maxWidth: "45px",
                   minWidth:"43px",
                   backgroundColor: Colors.secondary,
                   display: "flex",
                   alignItems: "center",
                   justifyContent: "center",
                   marginLeft: "40px",
                   // padding:"10px"
                   // boxShadow: '200px rgba(0, 0, 0, 0.1)'
                 }}
                 className="min"
             >
               <WalletOutlined className="text-white font-bold" />
             </div>
           </Col>
         </Row>
         <p
             style={{
               color: "gray.400",
               fontSize: "xx-small",
               display: "inline-flex",
               justifyContent: "space-between",
               marginTop: "10px",
             }}
         >
               <span style={{ color: "green", fontWeight: "bold" }}>
                 +3.48%{" "}
               </span>
           <span className="ml-10">Since last month</span>
         </p>
       </Card>
       <Card style={{ minHeight: "125px", minWidth: "83x" }}>
           <Row gutter={16} align="middle">
               <Col span={12}>
                   <Statistic
                       title="Total users"
                       value="3,897"
                       valueStyle={{
                           fontSize: "smaller",
                           fontWeight: "bold",
                           color: textColor,
                       }}
                   />
               </Col>
               <Col span={12}>
                   <div
                       style={{
                           borderRadius: "50%",
                           height: "45px",
                           maxWidth: "45px",
                           minWidth:"43px",
                           backgroundColor: Colors.secondary,
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                           marginLeft: "40px",
                           // padding:"10px"
                           // boxShadow: '200px rgba(0, 0, 0, 0.1)'
                       }}
                       className="min"
                   >
                       <CreditCardFilled className="text-white font-bold" />
                   </div>
               </Col>
           </Row>
           <p
               style={{
                   color: "gray.400",
                   fontSize: "xx-small",
                   display: "inline-flex",
                   justifyContent: "space-between",
                   marginTop: "10px",
               }}
           >
               <span style={{ color: "green", fontWeight: "bold" }}>
                 +3.48%{" "}
               </span>
               <span className="ml-10">Since last month</span>
           </p>
       </Card>
       <Card style={{ minHeight: "125px", minWidth: "83x" }}>
           <Row gutter={16} align="middle">
               <Col span={12}>
                   <Statistic
                       title="Today Shared"
                       value="897"
                       valueStyle={{
                           fontSize: "smaller",
                           fontWeight: "bold",
                           color: textColor,
                       }}
                   />
               </Col>
               <Col span={12}>
                   <div
                       style={{
                           borderRadius: "50%",
                           height: "45px",
                           maxWidth: "45px",
                           minWidth:"43px",
                           backgroundColor: Colors.secondary,
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                           marginLeft: "40px",
                           // padding:"10px"
                           // boxShadow: '200px rgba(0, 0, 0, 0.1)'
                       }}
                       className="min"
                   >
                       <CreditCardFilled className="text-white font-bold" />
                   </div>
               </Col>
           </Row>
           <p
               style={{
                   color: "gray.400",
                   fontSize: "xx-small",
                   display: "inline-flex",
                   justifyContent: "space-between",
                   marginTop: "10px",
               }}
           >
               <span style={{ color: "green", fontWeight: "bold" }}>
                 +3.48%{" "}
               </span>
               <span className="ml-10">Since last month</span>
           </p>
       </Card>
       <Card style={{ minHeight: "125px", minWidth: "83x" }}>
           <Row gutter={16} align="middle">
               <Col span={12}>
                   <Statistic
                       title="Today's Money"
                       value="$53,897"
                       valueStyle={{
                           fontSize: "smaller",
                           fontWeight: "bold",
                           color: textColor,
                       }}
                   />
               </Col>
               <Col span={12}>
                   <div
                       style={{
                           borderRadius: "50%",
                           height: "45px",
                           maxWidth: "45px",
                           minWidth:"43px",
                           backgroundColor: Colors.secondary,
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                           marginLeft: "40px",
                           // padding:"10px"
                           // boxShadow: '200px rgba(0, 0, 0, 0.1)'
                       }}
                       className="min"
                   >
                       <WalletOutlined className="text-white font-bold" />
                   </div>
               </Col>
           </Row>
           <p
               style={{
                   color: "gray.400",
                   fontSize: "xx-small",
                   display: "inline-flex",
                   justifyContent: "space-between",
                   marginTop: "10px",
               }}
           >
               <span style={{ color: "green", fontWeight: "bold" }}>
                 +3.48%{" "}
               </span>
               <span className="ml-10">Since last month</span>
           </p>
       </Card>
     </div>
      }
     

      {
        isOrg === "orgn"?
        <div className="p-4 mt-5">
      <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart />
            </Card>
          </Col>

        </Row>
      </div>:
      <div className="p-4 mt-5">
      <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={16} lg={16} xl={16} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} className="">
                  <Card bordered={false} className="h-[450px] w-full">
                      <div className="timeline-box">
                          <h3 className=" text-sm text-left font-bold">Today Identy shares</h3>
                          <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                              this month <span className="bnb2">20%</span>
                          </Paragraph>

                          <Timeline
                              pending="Shares..."
                              className="timelinelist lastweek text-xs "
                              reverse={reverse}
                          >
                              {timelineList.map((t, index) => (
                                  <Timeline.Item color={t.color} key={index}>
                                      <h3 className=" text-sm text-left ">{t.title}</h3>
                                      <Text>{t.time}</Text>
                                  </Timeline.Item>
                              ))}
                          </Timeline>
                          <Button
                              type="default"
                              className="width-100 text-xs "
                              onClick={() => setReverse(!reverse)}
                          >
                               REVERSE
                          </Button>
                      </div>
                  </Card>
              </Col>
     

        </Row>
     
      </div>
      }


   
      </div>

    </div>
  );
};

export default Home;
