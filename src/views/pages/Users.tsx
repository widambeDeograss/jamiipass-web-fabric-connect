import { useEffect, useState } from "react";
import { Avatar, Button, Card, Radio, Table, Badge, Menu, Dropdown } from "antd";
import { organizationUrls } from "../../utils/apis";
import { addAlert } from "../../app/store/slices/AlertsState_slice";
import { useAppDispatch } from "../../app/store/store-hooks";
import Column from "antd/es/table/Column";
import { useDataFetch } from "../../hooks/datahook";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import { renderDateTime } from "../../utils/renderDateTime";
import { baseUrl } from "../../utils/baseUrl";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface IdentificationApprovedRequestInterFc {
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
}

const ApprovedRequests = () => {
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();
  const [identificationApprovedReqs, setidentificationApprovedReqs] = useState<
    IdentificationApprovedRequestInterFc[]
  >([]);
  const dispatch = useAppDispatch();
  const dataFetch = useDataFetch();
  const identificationsWithSNo = identificationApprovedReqs.map((item, index) => ({
    ...item,
    sNo: index + 1,
  }));

  const loadData = async () => {
    try {
      setisloading(true);
      const response = await dataFetch.fetch({
        url: organizationUrls.organizationIdentityReguests,
      });
      if (response) {
        const data = response?.data.filter((req:IdentificationApprovedRequestInterFc) => req.request_state === "Granted" );
        setidentificationApprovedReqs(data);
      }
      setisloading(false);
    } catch (error) {
      setisloading(false);
      dispatch(
        addAlert({
          title: "Error",
          type: "error",
          message: "Failed to fetch Org Identifications reqs try again later!",
        })
      );
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleView = (id:string) => {
    navigate('/organization_identity_request_process/' + `${id}`);
    console.log(`View action for ID: ${id}`);
  };

  const handleEdit = (id:string) => {
    console.log(`Edit action for ID: ${id}`);
  };

  const ActionDropdown = ({ id}:any) => {
    const handleItemClick = (action:any) => {
      switch (action) {
        case 'View':
          handleView(id);
          break;
        case 'Deactivate Identity':
          handleEdit(id);
          break;
        default:
          break;
      }
    };

    const menu = (
      <Menu>
        <Menu.Item key="view" onClick={() => handleItemClick('View')}>
        view Identity
        </Menu.Item>
        <Menu.Item key="process" onClick={() => handleItemClick('edit')}>
        Deactivate Identity
        </Menu.Item>
        
      </Menu>
    );

    return (
      <Dropdown overlay={menu} placement="bottomLeft">
        <Button>Action</Button>
      </Dropdown>
    );
  };

  return (
    <div className="tabled">
      <BreadCrumb title="Assigned  Identifications" type="Organization" />

      <Card
        bordered={true}
        className=" w-full overflow-hidden"
        title="Organization Assigned Digital Identifications"
        extra={
          <>
           
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
            <Column
              title="User Profile"
              dataIndex="profile"
              key="profile"
              render={(profile) => (
                
                
                <div>
                  <Avatar
                    shape="square"
                    size={40}
                    onClick={() => {console.log(baseUrl + `/${profile}`)}}
                    src={ `${baseUrl}/${profile}`}
                  >
                    <UserOutlined />{" "}
                  </Avatar>
                </div>
              )}
            />
            <Column title="Full Name" dataIndex="first_name" key="first_name" />
            <Column title="Phone" dataIndex="phone" key="phone" />
            <Column
              title="Identity Name"
              dataIndex="cert_name"
              key="cert_name"
            />
            <Column title="Card No" dataIndex="card_no" key="card_no" />
            <Column
              title="createdAt"
              dataIndex="created_at"
              key="created_at"
              render={(date) => <div>{renderDateTime(date)}</div>}
            />
            <Column
              title="Request State"
              dataIndex="request_state"
              key="request_state"
              render={(data) => (
                <div>
                <Badge color="green">{data}</Badge>
                </div>
              )}
            />
            <Column
              dataIndex="id"
              key="id"
              render={(id) => (
                <div>
                  <ActionDropdown id={id} />
                </div>
              )}
            />
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default ApprovedRequests;
