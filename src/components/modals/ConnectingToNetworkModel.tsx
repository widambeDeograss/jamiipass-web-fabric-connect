import { Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

type modalType = {
  openMOdal: any;
  type:string;
};

const ConnectingToNetworkModel = ({ openMOdal,type }: modalType) => {
  return (
    <div>
      <Modal
        open={openMOdal}
        centered
        closable={false}
        footer={[<div></div>]}
      >
        <div className="flex flex-col justify-center items-center text-center">
          <LoadingOutlined className="text-blue-600 text-5xl" />
          {type === "connecting"? <p className="text-xs font-bold mt-2">
            Connecting to the blockchain network before submitting
          </p>:
          <p className="text-xs font-bold mt-2">
         Submitting Transaction or Identity for user to the blockchain network
        </p>
          }
          
          <p className="text-xs font-bold mt-2">waiting...</p>
          {/* <marquee>waiting...</marquee> */}
        </div>
      </Modal>
    </div>
  );
};

export default ConnectingToNetworkModel;
