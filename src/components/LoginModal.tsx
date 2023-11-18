import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { loginUser } from '../store/thunkFunctions';
import Modal from './common/Modal';
import { useForm, SubmitHandler } from 'react-hook-form';

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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
        </div>
      </div>
    </Modal>
  );
}
