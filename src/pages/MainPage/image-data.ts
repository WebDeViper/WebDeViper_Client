type Images = {
  src: string;
  text: string;
  textColor: 'black' | 'white';
};

export const images: Images[] = [
  {
    src: '/images/main_visual_02.png',
    text: ' Socket.IO 를 활용한 <br className="block md:hidden" /> 실시간 채팅, 타이머, 알림 기능',
    textColor: 'white',
  },
  {
    src: '/images/main_visual_01.png',
    text: '서로 공부하는 모습을 보며<br/>집중해서 공부할 수 있어요',
    textColor: 'black',
  },
];
