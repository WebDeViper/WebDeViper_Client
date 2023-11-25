import { useState } from 'react';
import { Button } from '../../../components/common/Button';
import { API } from '../../../utils/axios';
import { profileUser } from '../../../store/thunkFunctions';
import { AppDispatch } from '../../../store/store';

interface Props {
  dispatch: AppDispatch;
}

export default function EditNickName({ dispatch }: Props) {
  const [message, setMessage] = useState('');
  const [nickName, setNickName] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(true);
  const [isValidate, setIsValidate] = useState(false);

  const handleCheckDuplicate = async () => {
    // 중복체크
    const res = await API.get(`/user/nick/${nickName}/duplicateCheck`);
    setMessage(!res.data ? '사용 가능' : '닉네임 중복');
    setIsDuplicate(!res.data ? false : true);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNick = e.target.value;
    // console.log(inputNick.trim().length);
    inputNick.trim() ? setNickName(inputNick) : setNickName('');
    if (!inputNick) {
      setMessage('');
    } else {
      checkValidate(inputNick);
    }
  };

  const checkValidate = (input: string) => {
    const pattern = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{2,10}$/;
    if (!pattern.test(input.trim())) {
      setMessage('닉네임은 한글, 영문, 숫자를 포함한 2~10자 이하입니다!');
      setIsValidate(false);
    } else {
      setMessage('');
      setIsValidate(true);
    }
  };
  console.log('닉네임 상태>>>', nickName);

  // input에서 엔터로 중복체크
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      isValidate ? handleCheckDuplicate() : '';
    }
  };

  // 유저 정보 수정
  const handleUserInfo = () => {
    if (isDuplicate) {
      alert('중복 체크를 해주세요!');
    } else {
      dispatch(profileUser({ nickName: nickName }));
      alert('닉네임 변경 완료!');
      location.reload();
    }
  };
  const messageStyled = !isDuplicate ? 'text-primary' : 'text-red-600';
  const buttonStyled = isValidate ? '!bg-blue-400' : '!bg-gray-500';
  return (
    <div className="flex flex-col items-between justify-center border-2 rounded-lg border-semi_primary p-2 md:mb-3 mb-1">
      <div className="mb-5">
        <span className="text-lg font-semibold">닉네임 변경</span>
      </div>
      <div className="flex w-full justify-end items-center">
        <div className="nickInputWrap border-2 rounded-lg border-primary ps-5 pe-2 w-fit flex items-center me-2">
          <input
            className="font-medium w-[12rem] h-[3rem] border-transparent focus:ring-0 focus:border-transparent focus:outline-none"
            type="text"
            placeholder="닉네임 입력"
            // value={nickName}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {/* <Button handleClick={handleCheckDuplicate}>중복체크</Button> */}
          <button
            className={`text-white w-fit text-sm leading-6 font-medium tracking-wider py-[5px] px-2.5 rounded-lg ${buttonStyled}`}
            onClick={handleCheckDuplicate}
            disabled={isValidate ? false : true}
          >
            중복체크
          </button>
        </div>
        <Button onClick={handleUserInfo}>완료</Button>
      </div>
      {message ? <span className={`font-semibold text-sm mt-2 ms-2 ${messageStyled}`}>{message}</span> : <br />}
    </div>
  );
}
