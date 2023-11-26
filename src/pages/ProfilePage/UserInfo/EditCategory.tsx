import { useEffect, useState } from 'react';
import { SimpleDropdown } from '../../../components/common/Dropdown';
import { Button } from '../../../components/common/Button';
import { profileUser } from '../../../store/thunkFunctions';
import categories from '../../../data/category';
import { AppDispatch, useAppSelector } from '../../../store/store';

const items = categories;

interface Props {
  dispatch: AppDispatch;
}

export default function EditCategory({ dispatch }: Props) {
  const currentCategory = useAppSelector(state => state.user?.userInfo?.category);
  const [category, setCategory] = useState<string | null>(currentCategory);

  useEffect(() => {
    console.log('마이페이지 카테고리 변경 잘 되나 ::', category);
  }, [category]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setCategory(target.innerText);
  };
  const handleChangeCategory = () => {
    dispatch(profileUser({ category: category }));
    alert('카테고리 변경 완료!');
  };

  return (
    <div className="border-2 rounded-lg border-semi_primary p-2">
      <div className="mb-5">
        <span className="text-lg font-semibold">카테고리 변경</span>
      </div>
      <div className="flex items-center justify-end gap-3">
        <SimpleDropdown title={category} handleClick={e => handleClick(e)} items={items}></SimpleDropdown>
        <Button onClick={handleChangeCategory}>완료</Button>
      </div>
    </div>
  );
}
