import { useMediaQuery } from 'react-responsive';
import FadeLoader from 'react-spinners/FadeLoader';

interface Props {
  userRanking: IUserRank[];
  calculateTime: (seconds: number) => string;
  isLoading: boolean;
}

interface IUserRank {
  user_nickname: string;
  user_profile_image_path: string;
  user_total_time: number;
}

export default function UserRank({ userRanking, calculateTime, isLoading }: Props) {
  const isTablet = useMediaQuery({ maxWidth: 768 });

  return (
    <section className="flex flex-col">
      {isLoading ? (
        <FadeLoader className="self-center" loading={isLoading} color="#1f87b2" />
      ) : (
        !userRanking.length && <div className="font-bold mb-5">아직 랭킹이 없어요!</div>
      )}
      {/* card 형식으로 바꿔야함 */}
      {!isLoading && userRanking.length > 0 && (
        <div>
          <div className="top3 flex flex-col gap-2 mb-2">
            {userRanking?.slice(0, 3)?.map((user, index) => (
              <div
                key={Math.random() * 1000000000000}
                className={`rank${
                  index + 1
                } h-20 md:max-w-full flex shadow-lg items-center rounded-lg gap-2 p-4 relative`}
              >
                {!isTablet && (
                  <img
                    src={import.meta.env.VITE_APP_BACK_URL + user.user_profile_image_path}
                    alt="유저 이미지"
                    className="h-full rounded-lg"
                  />
                )}
                <div className="flex flex-col">
                  <span className="font-extrabold text-lg absolute top-1/2 -translate-y-1/2 right-8">
                    {index + 1}등
                  </span>
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
