import { Button } from '../../components/common/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { API } from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  title: string;
  content: string;
};

export default function CreateNoticePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      const response = await API.post('/notice', data);
      const result = response.data;
      reset();
      navigate('/notice');
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-b-2 pb-2">
          <textarea
            className="w-full h-10 leading-10 pl-3"
            placeholder="제목을 입력하세요."
            {...register('title', {
              required: '제목을 입력하세요.',
            })}
          ></textarea>
        </div>
        <div>
          <textarea
            className="w-full p-2"
            cols={30}
            rows={10}
            placeholder="내용을 입력하세요."
            {...register('content', {
              required: '내용을 입력하세요.',
            })}
          ></textarea>
        </div>
        {errors.title && <div className="text-danger">{errors.title?.message}</div>}
        {errors.content && <div className="text-danger">{errors.content?.message}</div>}
        <div>
          <Button type="submit">작성</Button>
        </div>
      </form>
    </div>
  );
}
