import { useEffect, useState } from "react";
import { Avatar, Button, Card, Radio, Table, Badge, Menu, Dropdown } from "antd";
import { corporateUrls } from "../../utils/apis";
import { addAlert } from "../../app/store/slices/AlertsState_slice";
import { useAppDispatch } from "../../app/store/store-hooks";
import Column from "antd/es/table/Column";
import { useDataFetch } from "../../hooks/datahook";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import { renderDateTime } from "../../utils/renderDateTime";
import { baseUrl } from "../../utils/baseUrl";
import { UserOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import modal from "antd/es/modal";
import { useNavigate } from "react-router-dom";

interface historyInterFc {
    id: string;
    user_id: string;
    created_at: string;
    first_name: string;
    last_name: string;
    nida_no: string;
    profile: string;
    phone: string;
    cards:string;
  }

const CorporateIdentityShares = () => {
  const [isloading, setisloading] = useState(false);
  const [addModalOpen, setaddModalOpen] = useState(false);
  const [shareHistory, setshareHistory] = useState<
    historyInterFc[]
  >([]);
  const dispatch = useAppDispatch();
  const dataFetch = useDataFetch();
  const historyWithSNo = shareHistory.map((item, index) => ({
    ...item,
    sNo: index + 1,
  }));
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setisloading(true);
      const response = await dataFetch.fetch({
        url: corporateUrls.corporateShareHistory,
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

  const handleView = (id:string) => {
    navigate('/corporate_id_share/' + `${id}`);
  };

  const handleDelete = (id:string) => {
   
      modal.confirm({
        title: 'Confirm',
        icon: <ExclamationCircleOutlined />,
        content: 'Delete this identity share from your history',
        okText: 'OK',
        okType:"danger",
        cancelText: 'cancel',
        onOk:() => {
          
        }
      });
    console.log(`Edit action for ID: ${id}`);
  };

  const ActionDropdown = ({ id}:any) => {
    const handleItemClick = (action:any) => {
      switch (action) {
        case 'view':
          handleView(id);
          break;
        case 'delete':
          handleDelete(id);
          break;
        default:
          break;
      }
    };

    const menu = (
      <Menu>
        <Menu.Item key="view" onClick={() => handleItemClick('view')}>
        View
        </Menu.Item>
        <Menu.Item key="dny" onClick={() => handleItemClick('delete')}>
        Delete
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} placement="bottomLeft">
        <Button>Action</Button>
      </Dropdown>
    );

  }

    
  return (
    <div className="tabled">
    <BreadCrumb title="Identity Shares" type="Corporate" />
    
    <Card
        bordered={true}
        className=" w-full overflow-hidden"
        title="Corporate Identity share"
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
            dataSource={historyWithSNo}
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
              title="Identities shared"
              dataIndex="cards"
              key="cards"
            />
            <Column
              title="Created at"
              dataIndex="created_at"
              key="created_at"
              render={(date) => <div>{renderDateTime(date)}</div>}
            />
            <Column
              title="Expires at"
              dataIndex="time_before_corrupt"
              key="time_before_corrupt"
              render={(data) => (
                <div>
                <Badge color="green">{renderDateTime(data)}</Badge>
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
  )
}

export default CorporateIdentityShares