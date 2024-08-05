import { useEffect, useState } from "react";
import { Button, Card, Radio, Table } from "antd";
import { organizationUrls } from "../../utils/apis";
import { addAlert } from "../../app/store/slices/AlertsState_slice";
import { useAppDispatch } from "../../app/store/store-hooks";
import Column from "antd/es/table/Column";
import { useDataFetch } from "../../hooks/datahook";
import IdentityAddModal from "../../components/dialogs/OrgIdentificationAddModal";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import { renderDateTime } from "../../utils/renderDateTime";


interface identificationsInterFc {
  cert_id: string;
  cert_name: string;
  created_at: string;
}

const OrgIdentifications = () => {
  const [isloading, setisloading] = useState(false);
  const [addModalOpen, setaddModalOpen] = useState(false);
  const [identifications, setidentifications] = useState<
    identificationsInterFc[]
  >([]);
  const dispatch = useAppDispatch();
  const dataFetch = useDataFetch();
  const identificationsWithSNo = identifications.map((item, index) => ({
    ...item,
    sNo: index + 1,
  }));

  const loadData = async () => {
    try {
      setisloading(true);
      const responseOrg = await dataFetch.fetch({
        url: organizationUrls.organizationInfo,
      });
     
      const response = await dataFetch.fetch({
        url: organizationUrls.organizationIdentities,
      });
      console.log(response);

      if (response) {
        const data = response?.data.filter((id:any) => id.org_id === responseOrg?.data.org_id)
        setidentifications(data);
      }
      setisloading(false);
    } catch (error) {
      setisloading(false);
      dispatch(
        addAlert({
          title: "Error",
          type: "error",
          message: "Failed to fetch Org Identifications try again later!",
        })
      );
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <BreadCrumb title="Identity" type="Organization" />
      <Card
        bordered={true}
        className=" w-full overflow-hidden"
        title="Organization Identifications"
        extra={
          <>
            <Radio.Group defaultValue="a">
              {/* <Radio.Button value="a">REPORT</Radio.Button> */}
              <Radio.Button
                value="a"
                onClick={() => {
                  setaddModalOpen(true);
                }}
              >
                Add
              </Radio.Button>
            </Radio.Group>
          </>
        }
      >
        <div>
          <Table
            dataSource={identificationsWithSNo}
            className="table-responsive w-full "
            loading={isloading}
          >
            <Column
              title="S/No"
              dataIndex="sNo"
              sorter={(a: any, b) => a.sNo - b.sNo}
            />
            <Column title="Identity No" dataIndex="cert_id" key="cert_id" />
            <Column
              title="Identity Name"
              dataIndex="cert_name"
              key="cert_name"
            />

            <Column
              title="createdAt"
              dataIndex="created_at"
              key="created_at"
              render={(date) => <div>{renderDateTime(date)}</div>}
            />
            <Column
              dataIndex="id"
              key="id"
              render={(id) => (
                <div>
                  <Button
                    onClick={() => {
                      console.log(id);
                    }}
                    className=""
                    type="dashed"
                  >
                    Edit
                  </Button>
                  {/* <Button
                    onClick={() => {
                      console.log(id);
                    }}
                     className="hover:bg-red-400 hover:border-red-400 "
                  >
                    Delete
                  </Button> */}
                </div>
              )}
            />
          </Table>
        </div>
      </Card>
      <IdentityAddModal
        openMOdal={addModalOpen}
        handleCancel={() => {
          setaddModalOpen(false);
        }}
        loadData={loadData}
      />
    </div>
  );
};

export default OrgIdentifications;
