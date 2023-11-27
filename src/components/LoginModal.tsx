import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { loginUser } from '../store/thunkFunctions';
import Modal from './common/Modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';
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

  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  const NAVER_STATE = import.meta.env.VITE_NAVER_STATE;
  const NAVER_REDIRECT_URI = redirectUrl('naver');
  const NAVER_LOGIN_URI = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${NAVER_STATE}`;

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URL = redirectUrl('google');
  const GOOGLE_LOGIN_URI = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URL}&response_type=code&scope=email profile`;

  // style
  // const kakaoColor = '#FEE500';
  // const googleColor = '#fefefe';
  // const naverColor = '#2DB400';
  const kakaoStyle = `w-full mb-2 box-border flex items-center text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg !bg-[#FEE500] !text-[#3D1D1E]`;
  const googleStyle = `w-full mb-2 box-border flex items-center !text-black text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg !bg-[#fefefe]`;
  const naverStyle = `w-full mb-2 box-border flex items-center text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg !bg-[#2DB400]`;

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
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                이메일
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
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
            <RiKakaoTalkFill size={25} />
            <span className="ms-3">카카오 로그인</span>
          </button>
          <button onClick={() => handleNavigate(`${GOOGLE_LOGIN_URI}`)} className={googleStyle}>
            <FcGoogle size={25} />
            <span className="ms-3">구글 로그인</span>
          </button>
          <button onClick={() => handleNavigate(`${NAVER_LOGIN_URI}`)} className={naverStyle}>
            <SiNaver size={25} />
            <span className="ms-3">네이버 로그인</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
