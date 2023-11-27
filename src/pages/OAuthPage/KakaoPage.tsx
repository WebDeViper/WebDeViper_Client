import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socialRefreshUser, socialUser } from '../../store/thunkFunctions';
import { redirectUrl } from '../../utils/redirectUrl';
import { useAppDispatch } from '../../store/store';

export default function KakaoPage() {
  const navigate = useNavigate();
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

  const REDIRECT_URI = redirectUrl('kakao');
  const dispatch = useAppDispatch();

  const getToken = useCallback(
    async (code: string) => {
      try {
        const response = await axios.post('https://kauth.kakao.com/oauth/token', null, {
          params: {
            grant_type: 'authorization_code',
            client_id: KAKAO_REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code,
          },
        });
        // console.log('토큰값:: ', response.data);

        const { access_token } = response.data;
        const profile = await getFirebaseCustomToken(access_token);
        profile.provider = 'kakao';

        // console.log('최종 profile :: ', profile);
        // 리덕스에서 로그인 로직 처리 후 리덕스로 상태관리
        await dispatch(socialUser(profile));
        dispatch(socialRefreshUser());
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    },
    [KAKAO_REST_API_KEY, REDIRECT_URI, navigate, dispatch]
  );

  const getFirebaseCustomToken = async (access_token: string) => {
    try {
      const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      // console.log('두번째 토큰값::', response.data);

      const profile = response.data;
      return profile;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    // console.log(code);
    if (code) {
      getToken(code);
    }
  }, [getToken]);

  return <div>Kakao 로그인 중...</div>;
}
