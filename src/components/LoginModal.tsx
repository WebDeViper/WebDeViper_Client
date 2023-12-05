import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { loginUser } from '../store/thunkFunctions';
import Modal from './common/Modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { redirectUrl } from '../utils/redirectUrl';

type FormValues = {
  email: string;
  password: string;
};

export default function LoginModal({ open, onClose }: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const isAuth = useAppSelector(state => state.user.isAuth);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = async data => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (isAuth) {
      reset();
      onClose(false);
    }
  }, [isAuth, reset, onClose]);

  // 소셜 로그인
  // API & Redirect URI
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = redirectUrl('kakao');
  const KAKAO_LOGIN_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  // style
  // const kakaoColor = '#FEE500';

  const kakaoStyle = `w-full flex justify-center items-center text-sm leading-4 font-semibold tracking-wider py-1.5 rounded-md !bg-[#FEE500] !text-[#3D1D1E]`;

  const handleNavigate = (uri: string) => {
    window.location.href = uri;
  };

  return (
    <Modal show={open} onClose={onClose}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 sm:w-96 w-72">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">로그인</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 mb-3" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                이메일
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={'test@test.com'}
                  required
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('email', {
                    required: '이메일을 입력하세요 !',
                  })}
                />
              </div>
              {errors.email && <span className="text-danger">{errors.email?.message}</span>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  비밀번호
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  defaultValue={'1234'}
                  required
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('password', {
                    required: '비밀번호를 입력하세요 !',
                  })}
                />
              </div>
              {errors.password && <span className="text-danger">{errors.password?.message}</span>}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                로그인
              </button>
            </div>
          </form>
          {/* 소셜 로그인 */}
          <button onClick={() => handleNavigate(`${KAKAO_LOGIN_URI}`)} className={kakaoStyle}>
            <RiKakaoTalkFill size={24} />
            <span className="ms-3">카카오로 로그인하기</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
