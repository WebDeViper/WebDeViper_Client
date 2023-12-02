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
};
