import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/store';
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
  const [notice, setNotice] = useState<Notice[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await API.get('/notices');
        const data = await response.data;
        setNotice(data.reverse());
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotices();
  }, []);

  const handleCreateNotice = () => {
    navigate('./create');
  };

  return (
    <div className="container">
      <h2>공지사항</h2>
      <table className="w-full">
        <colgroup>
          <col width="0" />
          <col />
          <col width="0" />
        </colgroup>
        <thead className="border-b-2 border-black">
          <tr>
            <th className="p-2" colSpan={2}>
              제목
            </th>
            <th className="p-2">작성일</th>
          </tr>
        </thead>
        <tbody>
          {notice.map((item, index) => (
            <tr key={item.notice_id} className="border-b-[1px] border-[rgba(0,0,0,0.3)]">
              <td className="p-3">
                <div>{index + 1}</div>
              </td>
              <td className="p-3">
                <div>
                  <Link to={`/notice/${item.notice_id}`}>{item.title}</Link>
                </div>
              </td>
              <td className="p-3">
                <div>{moment(item.createdAt).format('YYYY.MM.DD')}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>{isServiceAdmin === 'y' && <Button onClick={handleCreateNotice}>글쓰기</Button>}</div>
    </div>
  );
}
