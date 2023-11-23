// import { Card } from 'flowbite-react';
// import React from 'react';
import { useMediaQuery } from 'react-responsive';

interface Props {
  userRanking: IUserRank[];
  calculateTime: (seconds: number) => string;
}

interface IUserRank {
  user_nickname: string;
  user_profile_image_path: string;
  user_total_time: number;
}

export default function UserRank({ userRanking, calculateTime }: Props) {
  const isTablet = useMediaQuery({ maxWidth: 768 });

  console.log('유저 랭킹 :: ', userRanking);

  return (
    <section>
      <h3>유저 랭킹</h3>
      {!userRanking.length && <div className="font-bold mb-5">아직 랭킹이 없어요!</div>}
      {/* card 형식으로 바꿔야함 */}
      {userRanking.length > 0 && (
        <div>
          <div className="top3 flex gap-3 md:flex-row flex-col md:justify-evenly md:mb-5">
            {userRanking?.slice(0, 3)?.map((user, index) => (
              <div
                key={Math.random() * 1000000000000}
                className={`rank${
                  index + 1
                } flex justify-between md:items-center md:w-1/3 mb-3 shadow-xl rounded-lg py-2`}
              >
                {!isTablet && (
                  <div className="w-1/2 flex justify-center">
                    <img
                      className="w-3/4 h-full rounded-lg"
                      src={import.meta.env.VITE_APP_BACK_URL + user.user_profile_image_path}
                      alt="유저 이미지"
                    />
                  </div>
                )}
                <div className="userInfoWrap flex md:flex-col w-full md:w-1/2 md:gap-0 items-center justify-between gap-5 px-5 md:px-0">
                  <span className="font-extrabold text-lg">{index + 1}등</span>
                  <span className="font-bold">{user.user_nickname}</span>
                  <span>{user.user_total_time ? calculateTime(user.user_total_time) : '00:00:00'}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="other flex flex-col gap-2">
            {userRanking?.slice(3)?.map(user => (
              <div
                key={Math.random() * 1000000000000}
                className="h-20 md:max-w-full flex shadow-lg items-center rounded-lg gap-2 p-4"
              >
                {!isTablet && (
                  <img
                    src={import.meta.env.VITE_APP_BACK_URL + user.user_profile_image_path}
                    alt="유저 이미지"
                    className="h-full rounded-lg"
                  />
                )}
                <div className="flex flex-col">
                  <span className="font-bold">{user.user_nickname}</span>
                  <span>{user.user_total_time ? calculateTime(user.user_total_time) : '00:00:00'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
