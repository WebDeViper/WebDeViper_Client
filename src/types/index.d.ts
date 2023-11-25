// Modal
interface ModalProps {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

type IsServiceAdmin = 'n' | 'y';

// User
interface UserInfo {
  id: string;
  email: string;
  nickName: string;
  category: string | null;
  profileImg: string;
  statusMsg: string;
  isServiceAdmin: IsServiceAdmin;
  alarmMessage: Alarm[];
}

// Group
interface GroupInfoType {
  group_id: string;
  leader_id: string;
  name: string;
  category: string;
  description: string;
  img_path: string;
  member_max: string;
  goal_time: string;
  members: string[];
  // join_requests: string[];
}

// Alarm
type Alarm = {
  content: string;
  content_id: string;
  group_id: null | string;
  is_read: 'n' | 'y';
  notification_kind: 'new_notice' | 'group_request';
  updated_at: Date;
  user_id: string;
  __v: number;
  _id: string;
};

// TODO

type Todo = {
  todo_id: string;
  user_id: string;
  title: string;
  content: string;
  start_time: Date;
  end_time: Date;
  done: 'y' | 'n';
};
