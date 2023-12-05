import { Link } from 'react-router-dom';
import './index.css';

export default function ErrorPage() {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
        </div>
        <h2>해당 페이지를 찾을 수 없습니다!</h2>
        <p>현재 접근하신 페이지는 존재하지 않거나 일시적으로 접근이 불가한 페이지입니다.</p>
        <Link to={'/'}>Go To Homepage</Link>
      </div>
    </div>
  );
}
