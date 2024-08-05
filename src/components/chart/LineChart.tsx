
import React from "react";
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/store/store-hooks";
import { useDataFetch } from "../../hooks/datahook";
import { organizationUrls } from "../../utils/apis";
import { addAlert } from "../../app/store/slices/AlertsState_slice";

function LineChart() {
  const { Title, Paragraph } = Typography;
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
          url: organizationUrls.organizationStatsPercentage + `${responseOrg?.data.org_id}`,
        });
        console.log(response);
        setChartSiries(response);
      //  const data =  response?.series?.map((st:any) => {
      //    return{
      //     ...st,
      //     color: "#4CA9FF"
      //    }
      //  })
      //  console.log(data);
      //  setChartSiries(data);
       
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

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Active Digital cards</Title>
          <Paragraph className="lastweek">
          usages  than last week <span className="bnb2">+30%</span>
          </Paragraph>
        </div>
        <div className="sales">
          {/* <ul>
            <li>{<MinusOutlined />} Nhif high</li>
            <li>{<MinusOutlined />} Nhif low</li>
          </ul> */}
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={ChartSiries}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
