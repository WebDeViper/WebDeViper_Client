import { useMediaQuery } from 'react-responsive';
import FadeLoader from 'react-spinners/FadeLoader';

interface Props {
  groupRanking: GroupRank[];
  calculateTime: (seconds: number) => string;
  isLoading: boolean;
}

interface GroupRank {
  averageTime: number;
  group_name: string;
  group_img_path?: string;
}

export default function GroupRank({ groupRanking, calculateTime, isLoading }: Props) {
  const isTablet = useMediaQuery({ maxWidth: 768 });

  return (
    <section className="flex flex-col">
      {isLoading ? (
        <FadeLoader className="self-center" loading={isLoading} color="#1f87b2" />
      ) : (
        !groupRanking.length && <div className="font-bold">아직 랭킹이 없어요!</div>
      )}
      {!isLoading && groupRanking.length > 0 && (
        <div className="groupRankingWrap">
          <div className="top3 flex flex-col gap-2 mb-2">
            {groupRanking?.slice(0, 3)?.map((group: GroupRank, index: number) => (
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
