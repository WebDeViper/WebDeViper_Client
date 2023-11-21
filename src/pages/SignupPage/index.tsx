import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import categories from '../../data/category';
import SelectMenu from '../../components/common/SelectMenu';
import { API } from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  nickName: string;
  email: string;
  password: string;
  password_confirm: string;
};

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setError,
  } = useForm<FormValues>();
  const [selected, setSelected] = useState(categories[0]);
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormValues> = async data => {
    const body = {
      ...data,
      category: selected,
    };
    try {
      const response = await API.post('/user/register', body);
      const result = response.data;
      if (result.isSuccess) {
        reset();
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleBlurNickName = async () => {
    const nickName = watch('nickName');
    try {
      const response = await API.get(`/user/nick/${nickName}/duplicateCheck`);
      const data = response.data;
      if (data.isDuplicate) {
        setError(
          'nickName',
          {
            message: '중복 닉네임 입니다.',
          },
          { shouldFocus: true }
        );
      } else {
        setError('nickName', {
          message: '',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBlurEmail = async () => {
    const email = watch('email');
    try {
      const response = await API.get(`/user/email/${email}/duplicateCheck`);
      const data = response.data;
      if (data.isDuplicate) {
        setError(
          'email',
          {
            message: '중복 닉네임 입니다.',
          },
          { shouldFocus: true }
        );
      } else {
        setError('email', {
          message: '',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-8">
      <div className="flex min-h-full flex-1 flex-col justify-center pb-12 py-6 md:w-96 m-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="nickName" className="block text-sm font-medium leading-6 text-gray-900">
                닉네임
              </label>
              <div className="mt-2">
                <input
                  id="nickName"
                  type="nickName"
                  required
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('nickName', {
                    required: '닉네임을 입력하세요 !',
                  })}
                  onBlur={handleBlurNickName}
                />
              </div>
              {errors.nickName && <span className="text-danger">{errors.nickName?.message}</span>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                이메일
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  required
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('email', {
                    required: '이메일을 입력하세요 !',
                  })}
                  onBlur={handleBlurEmail}
                />
              </div>
              {errors.email && <span className="text-danger">{errors.email?.message}</span>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  패스워드
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
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
              <div className="flex items-center justify-between">
                <label htmlFor="password_confirm" className="block text-sm font-medium leading-6 text-gray-900">
                  패스워드 확인
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password_confirm"
                  type="password"
                  required
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('password_confirm', {
                    required: '비밀번호를 확인하세요 !',
                    validate: (val: string) => {
                      if (watch('password') != val) {
                        return '비밀번호가 맞지 않습니다.';
                      }
                    },
                  })}
                />
              </div>
              {errors.password_confirm && <span className="text-danger">{errors.password_confirm?.message}</span>}
            </div>
            <div className="!mb-12">
              {categories && (
                <SelectMenu title="카테고리" data={categories} selected={selected} setSelected={setSelected} />
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
