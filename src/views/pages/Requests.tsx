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
}

const Requests = () => {
  const [isloading, setisloading] = useState(false);
  const [addModalOpen, setaddModalOpen] = useState(false);
  const [identificationReqs, setidentificationReqs] = useState<
    IdentificationRequestInterFc[]
  >([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dataFetch = useDataFetch();
  const identificationsWithSNo = identificationReqs.map((item, index) => ({
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
        setidentificationReqs(response?.data);
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

  const handleDelete = (id:string) => {
    console.log(`Delete action for ID: ${id}`);
  };

  const ActionDropdown = ({ id}:any) => {
    const handleItemClick = (action:any) => {
      switch (action) {
        case 'view request':
          handleView(id);
          break;
        case 'process request':
          handleEdit(id);
          break;
        case 'deny request':
          handleDelete(id);
          break;
        default:
          break;
      }
    };

    const menu = (
      <Menu>
        <Menu.Item key="view" onClick={() => handleItemClick('view request')}>
        view request
        </Menu.Item>
        <Menu.Item key="process" onClick={() => handleItemClick('process request')}>
        process request
        </Menu.Item>
        <Menu.Item key="dny" onClick={() => handleItemClick('deny request')}>
        deny request
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
      <BreadCrumb title="Identity requests" type="Organization" />

      <Card
        bordered={true}
        className=" w-full overflow-hidden"
        title="Organization Identifications Requests"
        extra={
          <>
            <Radio.Group defaultValue="a">
              <Radio.Button value="a">All</Radio.Button>
              <Radio.Button value="b">ONLINE</Radio.Button>
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
            <Column
              title="User Profile"
              dataIndex="profile"
              key="profile"
              render={(profile) => (      
                <div>
                  <Avatar
                    size={50}
                    onClick={() => {console.log(baseUrl + `/${profile}`)}}
                    src={ `${baseUrl}/${profile}`}
                  >
                    <UserOutlined />{" "}
                  </Avatar>
                </div>
              )}
            />
            <Column title="Full Name" key="first_name"
            render={(record) => (
              <div>
                {record.first_name} {record.last_name}
              {/* <Badge color="green"></Badge> */}
              </div>
            )}
            />
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

export default Requests;
