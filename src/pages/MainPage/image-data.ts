type Images = {
  src: string;
  text: string;
  textColor: 'black' | 'white';
};

export const images: Images[] = [
  { src: '/images/main_visual_01.jpg', text: '언제 어디서나<br/>내 손안에 스터디 카페', textColor: 'black' },
  {
    src: '/images/main_visual_02.jpg',
    text: '서로 공부하는 모습을 보며<br/>집중해서 공부할 수 있어요',
    textColor: 'white',
  },
];
