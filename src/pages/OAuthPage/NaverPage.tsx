import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/thunkFunctions';
import { useAppDispatch } from '../../store/store';

import { redirectUrl } from '../../utils/redirectUrl';

export default function NaverPage() {
  const navigate = useNavigate();
  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  // const NAVER_CLIENT_SECRET = import.meta.env.VITE_NAVER_CLIENT_SECRET;
  const NAVER_BACKEND_API = import.meta.env.VITE_NAVER_BACKEND_API;

  const REDIRECT_URI = redirectUrl('naver');
  const dispatch = useAppDispatch();

  const getToken = useCallback(
    async (code: string, state: string) => {
      try {
        const data = {
          code: code,
          state: state,
        };

        const response = await axios.post(NAVER_BACKEND_API, data);
        // const accessToken = response.data.naverTokens;

        const profile = response.data.naverUser.response;
        profile.provider = 'naver';

        // 리덕스에서 로그인 로직 처리 후 리덕스로 상태관리
        dispatch(loginUser(profile));
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    },
    [NAVER_CLIENT_ID, REDIRECT_URI, navigate, dispatch]
  );

  // const getFirebaseCustomToken = async access_token => {
  //   try {
  //     const response = await axios.get('https://openapi.naver.com/v1/nid/me', {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //       },
  //     });
  //     // console.log('?????', response);
  //     const profile = response.data;
  //     // profile Example
  //     // {
  //     // "resultcode":"00",
  //     // "message":"success",
  //     // "response":{
  //     //     "id":"7bvETqfH2_eL9tTtDAqFI8ejYYOGepMtlLEk1zaJjO4",
  //     //     "email":"edcba1234@naver.com" // 없을수도 있음(필수아니라)
  //     //     }
  //     // }
  //     return profile;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    // const code = new URL(window.location.href).searchParams.get('code');
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    if (code && state) {
      getToken(code, state);
    }
  }, [getToken]);

  return <div>Naver 로그인 중...</div>;
}
