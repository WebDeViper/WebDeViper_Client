import { Button } from '../../components/common/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { API } from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import { SimpleDropdown } from '../../components/common/Dropdown';
import categories from '../../data/category';
import './index.css';
import { useState } from 'react';

interface GroupFormType {
  group_name: string;
  group_category: string;
  group_description: string;
  group_image: File | null;
  group_maximum_member: string;
  dailyGoalTime: string;
  isCameraOn: boolean;
}

export default function CreateGroupPage() {
  const navigate = useNavigate();

  // react hook form 사용하기
  const { register, handleSubmit, setValue, watch } = useForm<GroupFormType>({
    mode: 'onSubmit',
    defaultValues: {
      group_name: '',
      group_category: '',
      group_description: '',
      group_image: null,
      group_maximum_member: '',
      dailyGoalTime: '',
      isCameraOn: false,
    },
  });

  // form 제출
  const onSubmit: SubmitHandler<GroupFormType> = async data => {
    console.log('폼 제출 데이터 :: ', data);
    try {
      const res = await API.post('/group/studyGroup', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data) {
        alert('그룹 생성 완료');
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 드롭다운으로 input 값 설정하기
  const handleSelectCategory = (e: React.MouseEvent<HTMLDivElement>) => {
    // e.preventDefault();
    const targetElement = e.currentTarget;
    console.log('카테고리 선택 잘 되나요?', targetElement.textContent);
    if (targetElement.textContent) {
      setValue('group_category', targetElement.textContent);
    }
  };

  const handleSelectTime = (e: React.MouseEvent<HTMLDivElement>) => {
    // e.preventDefault();
    const targetElement = e.currentTarget;
    console.log('그룹시간 선택 잘 되나요?', targetElement.textContent);
    if (targetElement.textContent) {
      setValue('dailyGoalTime', targetElement.textContent);
    }
  };

  // 그룹 이미지 유효성 검사
  const handleGroupImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile: File | null = e.target.files && e.target.files[0];

    if (selectedFile) {
      const allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;

      if (!allowedExtensions.exec(selectedFile.name)) {
        alert('올바른 파일 확장자를 사용해주세요.');
        // 선택 파일 초기화
        e.target.value = '';
      } else {
        setValue('group_image', selectedFile);
        const url = URL.createObjectURL(selectedFile);
        setImgUrl(`${url}`);
        console.log(url);
      }
    }
  };

  const [imgUrl, setImgUrl] = useState<string>('');

  return (
    <div className="createGroupWrap container flex flex-col justify-center">
      <div className="groupHeader mb-5 flex justify-between items-center">
        <h2 className="font-bold text-2xl">스터디 그룹 생성</h2>
      </div>
      <form className="groupInfoWrap flex flex-col gap-3 mb-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="groupImage flex justify-between items-center">
          <div>그룹이미지</div>
          {!watch('group_image') ? (
            <label
              className="w-auto h-[200px] bg-primary-100 flex flex-col justify-center items-center text-center p-2 rounded-lg"
              htmlFor="group_image"
            >
              <span className="font-semibold">그룹 이미지 등록</span>
              <span className="text-sm">(확장자: png, jpg, jpeg / 용량 1MB 이하)</span>
            </label>
          ) : (
            <img src={imgUrl} className="w-auto h-[200px] p-2 rounded-lg border-2" />
          )}

          <input
            type="file"
            {...register('group_image')}
            id="group_image"
            className="hidden"
            accept="image/png, image/jpg, image/jpeg"
            onChange={handleGroupImg}
          />
        </div>
        <div className="groupName flex justify-between items-center">
          <label>그룹명</label>
          <input
            type="text"
            {...register('group_name', {
              required: '그룹명을 작성해주세요!',
            })}
          />
        </div>
        <div className="groupCategory flex justify-between items-center">
          <label>카테고리</label>
          <SimpleDropdown
            title={watch('group_category') ? watch('group_category') : '카테고리'}
            items={categories}
            handleClick={handleSelectCategory}
          ></SimpleDropdown>
          <input
            type="hidden"
            {...register('group_category', {
              required: '카테고리를 선택해주세요!',
            })}
          />
        </div>
        <div className="groupDescription flex justify-between items-center">
          <label>그룹 설명</label>
          <input type="text" {...register('group_description')} />
        </div>
        <div className="groupMaximumMember flex justify-between">
          <label>모집인원</label>
          <input
            type="number"
            {...register('group_maximum_member', {
              required: '그룹 모집인원을 선택해주세요!',
            })}
          />
        </div>
        <div className="groupDailyGoalTime flex justify-between items-center">
          <label>목표시간</label>
          <SimpleDropdown
            title={watch('dailyGoalTime') ? watch('dailyGoalTime') : '목표시간'}
            items={['2', '4', '6', '8', '10']}
            handleClick={handleSelectTime}
          ></SimpleDropdown>
          <input
            type="hidden"
            {...register('dailyGoalTime', {
              required: '그룹 목표시간을 선택해주세요!',
            })}
          />
        </div>
        <div className="GroupIsCameraOn flex justify-between items-center mb-5">
          <label>줌 여부</label>
          <input type="checkbox" {...register('isCameraOn')} />
        </div>
        <Button>생성</Button>
      </form>
    </div>
  );
}
