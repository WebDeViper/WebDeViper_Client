// import { Card } from 'flowbite-react';
// import React from 'react';
import { useMediaQuery } from 'react-responsive';
interface Props {
  groupRanking: GroupRank[];
  calculateTime: (seconds: number) => string;
}

interface GroupRank {
  averageTime: number;
  group_name: string;
  group_img_path?: string;
}

export default function GroupRank({ groupRanking, calculateTime }: Props) {
  const isTablet = useMediaQuery({ maxWidth: 768 });

  // console.log('그룹 랭킹 :: ', groupRanking);

  return (
    <section className="">
      {!groupRanking.length && <div className="font-bold">아직 랭킹이 없어요!</div>}
      {groupRanking.length > 0 && (
        <div className="groupRankingWrap">
          <div className="top3 flex flex-col gap-2 mb-2">
            {groupRanking?.slice(0, 3)?.map((group: GroupRank, index: number) => (
              // <div
              //   key={Math.random() * 1000000000000}
              //   className={`rank${
              //     index + 1
              //   } flex justify-between md:items-center md:w-1/3 mb-3 shadow-xl rounded-lg py-2`}
              // >
              //   {!isTablet && (
              //     <div className="w-1/2 flex justify-center">
              //       <img
              //         className="w-3/4 h-full rounded-lg"
              //         src={import.meta.env.VITE_APP_BACK_URL + group.group_img_path}
              //         alt="그룹 이미지"
              //       />
              //     </div>
              //   )}
              //   <div className="groupInfoWrap flex md:flex-col w-full md:w-1/2 md:gap-0 items-center justify-between gap-5 px-5 md:px-0">
              //     <span className="font-extrabold text-lg">{index + 1}등</span>
              //     <span className="font-bold">{group.group_name}</span>
              //     <span>{group.averageTime ? calculateTime(group.averageTime) : '00:00:00'}</span>
              //   </div>
              // </div>
              <div
                key={Math.random() * 1000000000000}
                className={`rank${
                  index + 1
                } h-20 md:max-w-full flex shadow-lg items-center rounded-lg gap-2 p-4 relative`}
              >
                {!isTablet && (
                  <img
                    src={import.meta.env.VITE_APP_BACK_URL + group.group_img_path}
                    alt="그룹 이미지"
                    className="h-full rounded-lg"
                  />
                )}
                <div className="flex flex-col">
                  <span className="font-extrabold text-lg absolute top-1/2 -translate-y-1/2 right-8">
                    {index + 1}등
                  </span>
                  <span className="font-bold">{group.group_name}</span>
                  <span>{group.averageTime ? calculateTime(group.averageTime) : '00:00:00'}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="other flex flex-col gap-2">
            {groupRanking?.slice(3)?.map((group: GroupRank) => (
              <div
                key={Math.random() * 1000000000000}
                className="h-20 md:max-w-full flex shadow-lg items-center rounded-lg gap-2 p-4"
              >
                {!isTablet && (
                  <img
                    src={import.meta.env.VITE_APP_BACK_URL + group.group_img_path}
                    alt="그룹 이미지"
                    className="h-full rounded-lg"
                  />
                )}
                <div className="flex flex-col">
                  <span className="font-bold">{group.group_name}</span>
                  <span>{group.averageTime ? calculateTime(group.averageTime) : '00:00:00'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
