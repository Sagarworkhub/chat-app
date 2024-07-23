import { useAppStore } from '@/store';

function Profile() {
  const { userInfo } = useAppStore();
  return <div>{userInfo?.email}</div>;
}

export default Profile;
