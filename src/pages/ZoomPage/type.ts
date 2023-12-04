export type ChatData = {
  chat: string;
  receiver: {
    receive_id: null | string;
  };
  room_id: string;
  send_at: Date;
  sender: {
    id: string;
    name: string;
  };
  _v: number;
  _id: string;
};

export type GetMessage = {
  isOk: boolean;
  msg?: string;
  data?: ChatData[];
};

export type SendMessage = {
  isOk: boolean;
  error: string;
  message: ChatData;
};

export type GetUser = {
  userId: string;
  userNickName: string;
  userProfile: string;
  isRunning: 'y' | 'n';
  totalTime: number;
};

// export type GetTimer = {
//   daily: {
//     date: Date;
//     data: string[];
//   };
//   is_running: 'y' | 'n';
//   total_time: number;
//   user_id: string;
//   __v: number;
//   _id: string;
// };
