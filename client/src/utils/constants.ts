export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = 'api/auth';
export const SIGN_UP_ROUTE = `${AUTH_ROUTES}/signUp`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;
export const GET_USER_INFO_ROUTE = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/add-profile-image`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-profile-image`;

export const CONTACTS_ROUTES = '/api/contacts';
export const SEARCH_CONTACTS_ROUTES = `${CONTACTS_ROUTES}/search`;
export const GET_CONTACTS_WITH_MESSAGES_ROUTE = `${CONTACTS_ROUTES}/get-contacts-for-list`;
export const GET_ALL_CONTACTS = `${CONTACTS_ROUTES}/all-contacts`;

export const MESSAGES_ROUTES = '/api/messages';
export const FETCH_ALL_MESSAGES_ROUTE = `${MESSAGES_ROUTES}/get-messages`;
export const UPLOAD_FILE = `${MESSAGES_ROUTES}/upload-file`;

export const CHANNEL_ROUTES = '/api/channel';
export const CREATE_CHANNEL = `${CHANNEL_ROUTES}/create-channel`;
export const GET_USER_CHANNELS = `${CHANNEL_ROUTES}/get-user-channels`;
export const GET_CHANNEL_MESSAGES = `${CHANNEL_ROUTES}/get-channel-messages`;

export enum MESSAGE_TYPES {
  'TEXT' = 'text',
  'FILE' = 'file',
}
