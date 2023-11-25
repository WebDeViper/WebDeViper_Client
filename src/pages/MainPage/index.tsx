import VisualComponent from './VisualComponent';
import '../../styles/main.css';

export default function MainPage() {
  return (
    <div className="-mt-5">
      <section className="w-screen relative overflow-hidden md:h-[820px] h-[600px]">
        <h2 className="skip">visual</h2>
        <VisualComponent />
      </section>
    </div>
  );
}
