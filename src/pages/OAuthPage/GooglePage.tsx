import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { redirectUrl } from '../../utils/redirectUrl';
import { loginUser } from '../../store/thunkFunctions';

export default function GooglePage() {
  const navigate = useNavigate();
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;

  const REDIRECT_URI = redirectUrl('google');
  const dispatch = useAppDispatch();

  const getToken = useCallback(
    async (code: string) => {
      try {
        const response = await axios.post('https://oauth2.googleapis.com/token', {
          code,
          client_id: GOOGLE_CLIENT_ID,
          client_secret: GOOGLE_CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code',
        });

        const { access_token } = response.data;
        const profile = await getFirebaseCustomToken(access_token);
        profile.provider = 'google';

        // 리덕스에서 로그인 로직 처리 후 리덕스로 상태관리
        dispatch(loginUser(profile));
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    },
    [GOOGLE_CLIENT_ID, REDIRECT_URI, navigate, dispatch]
  );

  const getFirebaseCustomToken = async (access_token: string) => {
    try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const profile = response.data;
      return profile;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      getToken(code);
    }
  }, [getToken]);

  return <div>Google 로그인 중...</div>;
}
