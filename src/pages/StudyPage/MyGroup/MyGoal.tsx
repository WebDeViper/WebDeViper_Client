import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { profileUser } from '../../../store/thunkFunctions';

export default function MyGoal() {
  const dispatch = useAppDispatch();
  const statusMsg = useAppSelector(state => state.user?.userInfo?.statusMsg);

  const [isEditStatus, setIsEditStatus] = useState<boolean>();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSetStatus = () => {
    setIsEditStatus(true);
  };

  const handleCancelStatus = () => {
    setIsEditStatus(false);
  };

  const handleSubmitStatus = () => {
    if (inputRef.current) {
      const inputMsg = inputRef.current.value;
      if (inputMsg) {
        dispatch(profileUser({ statusMsg: inputMsg }));
        setIsEditStatus(false);
        alert('상태 메세지 설정 완료!');
      } else {
        alert('상태 메세지를 작성해주세요!');
      }
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.code === 'Enter') {
      handleSubmitStatus();
    }
  };

  return (
    <div className="flex-1 order-first lg:order-2">
      <h2>내 목표</h2>
      <div className="rounded-md border border-slate-300 p-5">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">
            <span>오늘 공부한 시간</span>
            <span className="mx-1">/</span>
            <span>내 목표 시간</span>
          </div>
          <div>
            <button className=" bg-slate-200 px-2 py-1 rounded-xl text-xs text-slate-500">설정</button>
          </div>
        </div>
        <div className="font-semibold text-lg mt-3">
          <span>4시간 0분</span>
          <span className="mx-1">/</span>
          <span>8시간 0분</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-slate-200 mt-4 relative">
          <span className="absolute w-[50%] top-0 bottom-0 bg-black rounded-full"></span>
        </div>
        <div className="w-full h-[1px] bg-slate-200 my-7 md:my-10"></div>
        <div>
          <div className="flex justify-between">
            <span className="font-semibold">상태 메세지</span>
            {isEditStatus ? (
              <div className="statusBtnWrap flex gap-1">
                <button
                  className="bg-slate-200 px-2 py-1 rounded-xl text-xs text-slate-500"
                  onClick={handleSubmitStatus}
                >
                  완료
                </button>
                <button
                  className="bg-slate-200 px-2 py-1 rounded-xl text-xs text-slate-500"
                  onClick={handleCancelStatus}
                >
                  취소
                </button>
              </div>
            ) : (
              <button className="bg-slate-200 px-2 py-1 rounded-xl text-xs text-slate-500" onClick={handleSetStatus}>
                설정
              </button>
            )}
          </div>
          <div className="mt-3 flex flex-col">
            {isEditStatus ? (
              <input
                className="text-sm text-slate-800 bg-zinc-50 p-2 rounded-md focus:outline-none"
                type="text"
                ref={inputRef}
                placeholder={statusMsg ? statusMsg : '30자 이내로 작성'}
                onKeyDown={e => handleKeyDown(e)}
              />
            ) : (
              <span className="text-sm text-slate-400">
                {statusMsg ? statusMsg : '상태 메세지는 30자 이내로 작성 가능합니다.'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
