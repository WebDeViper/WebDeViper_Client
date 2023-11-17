import { useState } from 'react';
import { Button } from '../../components/common/Button';
import { useForm } from 'react-hook-form';
import { API } from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import { SimpleDropdown } from '../../components/common/Dropdown';
import categories from '../../data/category';
import './index.css';

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

  // 드롭다운 선택 후 input에 값을 넣기 위한 state
  const [groupCategory, setGroupCategory] = useState<string | undefined>('');
  const [groupGoalTime, setGroupGoalTime] = useState<string | undefined>('');

  // react hook form 사용하기
  const { register, handleSubmit } = useForm<GroupFormType>({
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
  const handleOnSubmit = handleSubmit(async data => {
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
  });

  // 드롭다운으로 input 값 설정하기
  const handleSelectCategory = (e: React.MouseEvent<HTMLDivElement>) => {
    // e.preventDefault();
    const targetElement = e.currentTarget;
    console.log('카테고리 선택 잘 되나요?', targetElement.textContent);
    if (targetElement.textContent) {
      setGroupCategory(targetElement.textContent);
    }
  };

  const handleSelectTime = (e: React.MouseEvent<HTMLDivElement>) => {
    // e.preventDefault();
    const targetElement = e.currentTarget;
    console.log('그룹시간 선택 잘 되나요?', targetElement.textContent);
    if (targetElement.textContent) {
      setGroupGoalTime(targetElement.textContent);
    }
  };

  return (
    <div className="createGroupWrap container flex flex-col justify-center">
      <div className="groupHeader mb-5 flex justify-between items-center">
        <h2 className="font-bold text-2xl">스터디 그룹 생성</h2>
      </div>
      <form className="groupInfoWrap flex flex-col gap-3 mb-5" onSubmit={handleOnSubmit}>
        <div className="buttonWrap self-end">
          <Button>생성</Button>
        </div>
        <div className="groupImage flex justify-between">
          <div>그룹이미지</div>
          <label className="w-30 h-30 bg-primary-300"></label>
          <input type="file" {...register('group_image')} id="group_image" />
        </div>
        <div className="groupName flex justify-between">
          <label>그룹명</label>
          <input
            type="text"
            {...register('group_name', {
              required: '그룹명을 작성해주세요!',
            })}
          />
        </div>
        <div className="groupCategory flex justify-between">
          <label>카테고리</label>
          <SimpleDropdown
            title={groupCategory ? groupCategory : '카테고리'}
            items={categories}
            handleClick={handleSelectCategory}
          ></SimpleDropdown>
          <input
            className="opacity-0"
            type="text"
            {...register('group_category', {
              required: '카테고리를 선택해주세요!',
            })}
            value={groupCategory}
          />
        </div>
        <div className="groupDescription flex justify-between">
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
        <div className="groupDailyGoalTime flex justify-between">
          <label>목표시간</label>
          <SimpleDropdown
            title="목표시간"
            items={['2', '4', '6', '8', '10']}
            handleClick={handleSelectTime}
          ></SimpleDropdown>
          <input
            type="text"
            className="opacity-0"
            {...register('dailyGoalTime', {
              required: '그룹 목표시간을 선택해주세요!',
            })}
            value={groupGoalTime}
          />
        </div>
        <div className="GroupIsCameraOn flex justify-between">
          <label>줌 여부</label>
          <input type="checkbox" {...register('isCameraOn')} />
        </div>
      </form>
    </div>
  );
}
