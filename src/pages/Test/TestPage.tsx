import { ButtonDefault } from '../../components/common/Button';
import { SimpleDropdown } from '../../components/common/Dropdown';

export default function TestPage() {
  return (
    <div className="container">
      TestPage
      <SimpleDropdown title="test" items={[1, 2, 3]} />
      <SimpleDropdown title="test2" items={['소방관', '바이퍼', '등등']} />
      <ButtonDefault>하이</ButtonDefault>
    </div>
  );
}
