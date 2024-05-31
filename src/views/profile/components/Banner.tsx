import { useAppSelector } from "../../../app/store/store-hooks";
import { banner1 as banner, avatarProfile as avatar } from "../../../components/entryFile/imagePaths";
import { Card } from "antd";

interface recordInterfc {
  email: string;
  created_at: string;
  email_verified: boolean;
  id: string;
  name: string;
  phone: string;
  pic: string;
}
const Banner = (props:{record:recordInterfc}) => {
  const isOrg = useAppSelector((state) =>  state.AppStateReducer.isOrg);

  return (
    <Card className={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img className="h-full w-full rounded-full" src={avatar} alt="" />
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
      {isOrg === "orgn"?
        <div>

        <h3 className="text-xl font-bold text-navy-700 dark:text-white
          ">{props?.record.name === "NHIF"? `National Health Insuarance Fund (${props.record.name})`:`${props.record.name}`}</h3>
        </div>: 
        <div>

        <h3 className="text-xl font-bold text-navy-700 dark:text-white
          ">{props?.record.name}</h3>
        </div>
      }
        
        <p className="text-base font-normal text-gray-600"> {isOrg === "orgn"?"Organization":"Corporate"}</p>
      </div>

      {/* Post followers */}
      {/* <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">17</p>
          <p className="text-sm font-normal text-gray-600">Posts</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            9.7K
          </p>
          <p className="text-sm font-normal text-gray-600">Followers</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            434
          </p>
          <p className="text-sm font-normal text-gray-600">Following</p>
        </div>
      </div> */}
    </Card>
  );
};

export default Banner;
