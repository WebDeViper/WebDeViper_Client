import { useEffect, useState, useCallback } from 'react';
import { API } from '../../utils/axios';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';

type Notice = {
  notice_id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

interface Props {
  isServiceAdmin: IsServiceAdmin;
}

export default function NoticePage({ isServiceAdmin }: Props) {
  const navigate = useNavigate();

  const [notice, setNotice] = useState<Notice[]>([]);
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
      console.log('추가!!!');
      arr.push(i);
    }
    console.log('잘 추가됐나 :: ', arr);
    // setPageList(arr);
    setPagination(prev => {
      return { ...prev, pageList: arr };
    });
  }, [currentPageGroup, totalPage]);

  // currentPage에 해당하는 공지사항 데이터를 받아오는 함수
  const fetchNotices = useCallback(async () => {
    try {
      const response = await API.get(`/notices?currentPage=${currentPage}`);
      const data = await response.data;
      console.log('공지사항 :: ', data);
      const { notices, total } = data;
      // 공지사항 각 데이터 설정
      setNotice(notices.reverse());
      // 토탈 페이지 설정
      setPagination(prev => {
        return { ...prev, totalPage: Math.ceil(total / 10) };
      });
      setShowPageList();
    } catch (err) {
      console.error(err);
    }
  }, [currentPage, setShowPageList]);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  useEffect(() => {
    setShowPageList();
  }, [setShowPageList]);

  const handleCreateNotice = () => {
    navigate('/create');
  };

  // 현재 페이지 설정
  const handleSetPage = (page: number) => {
    console.log(`페이지 ${page}로 변경!!!!`);
    // setCurrentPage(page);
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

  return (
    <div className="container">
      <h2>공지사항</h2>
      {!notice.length ? (
        <div>공지사항이 없습니다!</div>
      ) : (
        <table>
          <colgroup>
            <col width="0" />
            <col />
            <col width="0" />
          </colgroup>
          <thead>
            <tr>
              <th colSpan={2}>제목</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {notice.map((item, index) => (
              <tr key={item.notice_id}>
                <td>
                  <div>{(currentPage - 1) * 10 + index + 1}</div>
                </td>
                <td>
                  <div>
                    <Link to={`/notice/${item.notice_id}`}>{item.title}</Link>
                  </div>
                </td>
                <td>
                  <div>{moment(item.createdAt).format('YYYY.MM.DD')}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-7 text-right">
        {isServiceAdmin === 'y' && <Button onClick={handleCreateNotice}>글쓰기</Button>}
      </div>

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
