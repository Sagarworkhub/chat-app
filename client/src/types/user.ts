export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  profileSetup: boolean;
  color?: number;
}
