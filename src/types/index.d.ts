// Modal
interface ModalProps {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

// User
interface UserInfo {
  id: string;
  email: string;
  nickName: string;
  category: string | null;
  profileImg: string;
  statusMsg: string;
  isServiceAdmin: 'n' | 'y';
}

// Group
interface GroupInfoType {
  _id: string;
  groupLeader: string;
  group_name: string;
  group_category: string;
  group_description: string;
  group_image_path: string;
  group_maximum_member: string;
  dailyGoalTime: string;
  isCameraOn: string;
  members: string[];
  join_requests: string[];
}

// TODO: room에 대한 타입도 지정할건지 ..