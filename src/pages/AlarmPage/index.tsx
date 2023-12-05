import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { deleteAlarm } from '../../store/thunkFunctions';
import { MdClose } from 'react-icons/md';
import Badge from '../../components/common/Badge';

export default function AlarmPage() {
  const [alarmList, setAlarmList] = useState<Alarm[]>([]);
  const alarmMessage = useAppSelector(state => state.user.userInfo.alarmMessage);

  const dispatch = useAppDispatch();

  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    currentPageGroup: 1,
    totalPage: 1,
    pageList: [1],
  });
  const { currentPage, currentPageGroup, totalPage, pageList } = pagination;

  // 현재 페이지 그룹이나 totalPage가 바뀌면 페이지 리스트를 변경하는 함수
  const setShowPageList = useCallback(() => {
    const arr: number[] = [];

    for (let i = (currentPageGroup - 1) * 5 + 1; i <= Math.min(currentPageGroup * 5, totalPage); i++) {
      arr.push(i);
    }
    setPagination(prev => {
      return { ...prev, pageList: arr };
    });
  }, [currentPageGroup, totalPage]);

  const handleDeleteAlarm = async (id: string) => {
    const data = { _id: id };
    dispatch(deleteAlarm(data));
  };

  useEffect(() => {
    setShowPageList();
  }, [setShowPageList]);

  useEffect(() => {
    const newMessage = [...alarmMessage].reverse();
    setAlarmList(newMessage.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10));
    setPagination(prev => {
      return { ...prev, totalPage: Math.ceil(newMessage.length / 10) };
    });
  }, [alarmMessage, currentPage]);

  useEffect(() => {
    const newMessage = [...alarmMessage].reverse();
    setAlarmList(newMessage.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10));
  }, [currentPage, alarmMessage]);

  // 현재 페이지 설정
  const handleSetPage = (page: number) => {
    setPagination(prev => {
      return { ...prev, currentPage: page };
    });
  };

  // 현재 페이지 그룹 설정하는 함수
  const handleSetCurrentPageGroup = (text: string) => {
    if (text === 'next') {
      if (currentPageGroup !== Math.ceil(totalPage / 5)) {
        setPagination(prev => {
          return { ...prev, currentPageGroup: prev.currentPageGroup + 1, currentPage: prev.currentPageGroup * 5 + 1 };
        });
      }
    } else {
      if (currentPageGroup !== 1) {
        setPagination(prev => {
          return {
            ...prev,
            currentPageGroup: prev.currentPageGroup - 1,
            currentPage: (prev.currentPageGroup - 2) * 5 + 1,
          };
        });
      }
    }
  };

  const renderNotification = (value: Alarm) => {
    switch (value.notification_kind) {
      case 'new_notice':
        return (
          <div key={value._id} className="rounded-md p-3 border-[1px] border-zinc-300 mb-5 bg-indigo-100">
            <div className="flex justify-between mb-3">
              <Link
                to={`/notice/${value.content_id}`}
                onClick={() => {
                  handleDeleteAlarm(value._id);
                }}
              >
                <span className="text-gray-700 font-medium">{value.content}</span>
              </Link>
              <button
                className="flex justify-center items-center w-6 h-6 text-gray-400"
                onClick={() => {
                  handleDeleteAlarm(value._id);
                }}
              >
                <MdClose />
              </button>
            </div>
            <div className="mt-2 flex items-center">
              <Badge color="blue">보낸 사람</Badge>
              <span className="ml-3 text-sm">{value.user_id}</span>
            </div>
            <div className="mt-2 flex items-center">
              <Badge color="pink">보낸 시간</Badge>
              <span className="ml-3 text-sm">{moment(value.updated_at).format('YYYY-MM-DD HH:mm')}</span>
            </div>
          </div>
        );
      case 'group_request':
        return (
          <div key={value._id} className="rounded-md p-3 border-[1px] border-zinc-300 mb-5 bg-rose-100">
            <div className="flex justify-between mb-3">
              <Link
                to={`/profile`}
                onClick={() => {
                  handleDeleteAlarm(value._id);
                }}
              >
                <span className="text-gray-700 font-medium">{value.content}</span>
              </Link>
              <button
                className="flex justify-center items-center w-6 h-6 text-gray-400"
                onClick={() => {
                  handleDeleteAlarm(value._id);
                }}
              >
                <MdClose />
              </button>
            </div>
            <div className="mt-2 flex items-center">
              <Badge color="blue">보낸 사람</Badge>
              <span className="ml-3 text-sm">{value.user_id}</span>
            </div>
            <div className="mt-2 flex items-center">
              <Badge color="pink">보낸 시간</Badge>
              <span className="ml-3 text-sm">{moment(value.updated_at).format('YYYY-MM-DD HH:mm')}</span>
            </div>
          </div>
        );
      case 'group_approve':
        return (
          <div key={value._id} className="rounded-md p-3 border-[1px] border-zinc-300 mb-5 bg-rose-100">
            <div className="flex justify-between mb-3">
              <Link
                to={`/profile`}
                onClick={() => {
                  handleDeleteAlarm(value._id);
                }}
              >
                <span className="text-gray-700 font-medium">{value.content}</span>
              </Link>
              <button
                className="flex justify-center items-center w-6 h-6 text-gray-400"
                onClick={() => {
                  handleDeleteAlarm(value._id);
                }}
              >
                <MdClose />
              </button>
            </div>
            <div className="mt-2 flex items-center">
              <Badge color="blue">보낸 사람</Badge>
              <span className="ml-3 text-sm">{value.user_id}</span>
            </div>
            <div className="mt-2 flex items-center">
              <Badge color="pink">보낸 시간</Badge>
              <span className="ml-3 text-sm">{moment(value.updated_at).format('YYYY-MM-DD HH:mm')}</span>
            </div>
          </div>
        );
      case 'group_rejection':
        return (
          <div key={value._id} className="rounded-md p-3 border-[1px] border-zinc-300 mb-5 bg-rose-100">
            <div className="flex justify-between mb-3">
              <Link
                to={`/profile`}
                onClick={() => {
                  handleDeleteAlarm(value._id);
                }}
              >
                <span className="text-gray-700 font-medium">{value.content}</span>
              </Link>
              <button
                className="flex justify-center items-center w-6 h-6 text-gray-400"
                onClick={() => {
                  handleDeleteAlarm(value._id);
                }}
              >
                <MdClose />
              </button>
            </div>
            <div className="mt-2 flex items-center">
              <Badge color="blue">보낸 사람</Badge>
              <span className="ml-3 text-sm">{value.user_id}</span>
            </div>
            <div className="mt-2 flex items-center">
              <Badge color="pink">보낸 시간</Badge>
              <span className="ml-3 text-sm">{moment(value.updated_at).format('YYYY-MM-DD HH:mm')}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      {alarmList.length > 0 ? (
        <div className="mt-10">{alarmList.map(value => renderNotification(value))}</div>
      ) : (
        <div>알림이 없습니다.</div>
      )}
      <div className="mt-3 mx-auto w-fit pageWrap">
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <button
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => handleSetCurrentPageGroup('previous')}
            >
              이전
            </button>
          </li>
          {pageList.map((page, idx) => (
            <li key={idx}>
              <button
                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === page && '!bg-slate-300'
                }`}
                onClick={() => handleSetPage(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => handleSetCurrentPageGroup('next')}
            >
              다음
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
