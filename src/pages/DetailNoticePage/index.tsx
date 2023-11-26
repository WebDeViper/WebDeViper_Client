import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { API } from '../../utils/axios';
import { useAppSelector } from '../../store/store';
import Badge from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { toast } from 'react-toastify';

type Notice = {
  notice_id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

interface Props {
  isServiceAdmin: IsServiceAdmin;
}

export default function DetailNoticePage({ isServiceAdmin }: Props) {
  const { noticeId } = useParams();
  const [notice, setNotice] = useState<Notice>();
  const navigate = useNavigate();

  useEffect(() => {
    const getNotice = async () => {
      try {
        const response = await API.get(`/notice/${noticeId}`);
        const data = response.data;
        setNotice(data);
      } catch (err) {
        console.error(err);
      }
    };
    getNotice();
  }, [noticeId]);

  const handleUpdate = () => {
    navigate('/notice/create', {
      state: {
        noticeId,
      },
    });
  };
  const handleDelete = async () => {
    const isDelete = confirm('정말 삭제 하겠습니까?');
    if (!isDelete) return;
    try {
      const response = await API.delete(`/notice/${noticeId}`);
      const data = response.data;
      navigate('/notice');
      toast.info('공지사항이 삭제되었습니다.');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div>
        {notice && (
          <div className="rounded p-8 mt-8 shadow-md">
            <h2 className="mb-2">{notice.title}</h2>
            <div className="flex gap-4 justify-end items-center mb-8">
              <Badge color="indigo" size="md">
                작성일
              </Badge>
              <span className="text-slate-400">{moment(notice.createdAt).format('YYYY.MM.DD')}</span>
            </div>

            <div className="mb-5">
              <div className="">
                <div dangerouslySetInnerHTML={{ __html: notice.content }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* 버튼을 추가합니다 */}
      {isServiceAdmin === 'y' && (
        <div className="mt-7 flex gap-3 justify-end">
          <Button onClick={handleUpdate}>수정</Button>
          <Button onClick={handleDelete} color="red">
            삭제
          </Button>
        </div>
      )}
    </div>
  );
}
