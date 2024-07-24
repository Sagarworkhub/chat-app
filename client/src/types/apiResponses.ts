export interface ContactSearchAPIResponse {
  contacts: Array<Contact>;
}

export interface Contact {
  id: string;
  email: string;
  password: string;
  profileSetup: boolean;
  __v: number;
  image?: string;
  color?: number;
  firstName?: string;
  lastName?: string;
}
