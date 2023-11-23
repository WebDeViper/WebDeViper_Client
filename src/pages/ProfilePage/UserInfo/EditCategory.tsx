import React, { useState } from 'react';
import DropDown from '../../../components/common/DropDown';
import Button from '../../../components/common/Button';
import { profileUser } from '../../../reducers/thunkFunctions';
import categories from '../../../data/category';
import { useSelector } from 'react-redux';

const items = [...categories.student, ...categories.worker, ...categories.etc];

export default function EditCategory({ dispatch }) {
  const currentCategory = useSelector(state => state.user?.userInfo?.category);
  const [category, setCategory] = useState(null);
  const handleClick = cate => setCategory(cate);
  const handleChangeCategory = () => {
    dispatch(profileUser({ category: category }));
    alert('카테고리 변경 완료!');
    location.reload();
  };

  return (
    <div className="border-2 rounded-lg border-semi_primary p-2">
      <div className="mb-5">
        <span className="text-lg font-semibold">카테고리 변경</span>
      </div>
      <div className="flex items-center justify-end">
        <DropDown
          title={category ? category : currentCategory}
          items={items}
          styles={'font-normal'}
          handleClick={handleClick}
        ></DropDown>
        <Button
          customStyle={'!bg-transparent !border-primary border-2 !text-primary ms-2'}
          handleClick={handleChangeCategory}
        >
          완료
        </Button>
      </div>
    </div>
  );
}
