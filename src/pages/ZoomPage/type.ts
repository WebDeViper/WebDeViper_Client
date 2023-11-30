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

export type JoinRoomCb = {
  isOk: boolean;
  msg?: string;
  data?: ChatData[];
};

export type GetUser = {
  userId: string;
  nickName: string;
  userProfile: string;
};
