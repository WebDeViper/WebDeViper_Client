import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '../../components/common/Button';
import '../../styles/editor.css';
import { toast } from 'react-toastify';
import { API } from '../../utils/axios';
import { useLocation, useNavigate } from 'react-router-dom';

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      [{ align: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, 'link'],
      [
        {
          color: [],
        },
        { background: [] },
      ],
      ['clean'],
    ],
  },
};

export default function MyComponent() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const location = useLocation();

  const noticeId = location.state?.noticeId;

  useEffect(() => {
    if (!noticeId) return;
    setIsUpdate(true);
    const getNotice = async () => {
      try {
        const response = await API.get(`/notice/${noticeId}`);
        const data = await response.data;
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        console.error(err);
      }
    };
    getNotice();
  }, [location]);

  console.log(isUpdate);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === '') return toast.info('제목을 입력하세요', { type: toast.TYPE.ERROR });
    if (content.trim() === '') return toast.info('내용을 입력하세요', { type: toast.TYPE.ERROR });

    const data = {
      title,
      content,
    };
    try {
      if (isUpdate) {
        const response = await API.patch(`/notice/${noticeId}`, data);
        const result = response.data;
        console.log(result);
      } else {
        const response = await API.post('/notice', data);
        const result = response.data;
      }
      setTitle('');
      setContent('');
      navigate('/notice');
    } catch (err) {
      console.log(err);
    }
  };

  const handleTitleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="border-b-2 mb-5">
          <textarea
            className="w-full h-10 leading-10 pl-3"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={handleTitleOnChange}
            ref={titleRef}
          ></textarea>
        </div>
        <ReactQuill theme="snow" modules={modules} value={content} onChange={setContent} />
        <div className="text-right mt-4">
          <Button type="submit">작성</Button>
        </div>
      </form>
    </div>
  );
}
