
import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/store/store-hooks";
import { useDataFetch } from "../../hooks/datahook";
import { organizationUrls } from "../../utils/apis";
import { addAlert } from "../../app/store/slices/AlertsState_slice";
const { Title, Paragraph } = Typography;

function EChart() {
  const [ChartSiries, setChartSiries] = useState([]);
  const [isloading, setisloading] = useState(false);
  const dispatch = useAppDispatch();
  const dataFetch = useDataFetch();

  const loadData = async () => {
  
    try {
      setisloading(true);
      const responseOrg = await dataFetch.fetch({
        url: organizationUrls.organizationInfo,
      });
      if (responseOrg) {
        const response = await dataFetch.fetch({
          url: organizationUrls.organizationStats,
        });
        console.log(response);
       const data =  response?.series?.map((st:any) => {
         return{
          ...st,
          color: "#4CA9FF"
         }
       })
       console.log(data);
       setChartSiries(data);
       
      }
      setisloading(false);
    } catch (error) {
      setisloading(false);
      dispatch(
        addAlert({
          title: "Error",
          type: "error",
          message: "Failed to fetch Org Stats try again later!",
        })
      );
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const items = [
    {
      Title: "3,6K",
      user: "Nhif low",
    },
    {
      Title: "2m",
      user: "Nhif visa",
    },
    {
      Title: "772",
      user: "Nhif wazee",
    },
    {
      Title: "82",
      user: "Nhif watoto",
    },
  ];



  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={ChartSiries}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Identity Requests Monthly</Title>
        <Paragraph className="lastweek">
          than last week <span className="bnb2">+30%</span>
        </Paragraph>
        <Paragraph className="lastweek">
          Total citizens requesting digital identification from this organization per month
        </Paragraph>
        {/* <Row >
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row> */}
      </div>
    </>
  );
}

export default EChart;
