export interface SiteKey {
  apikey: string;
  enabled: 0 | 1;
  status: "OK";
}

export interface SiteMessage {
  created: Date;
  email: string;
  id: number;
  itemuid: string;
  nickname: string;
  phone: string;
  topic: string;
  updated: Date;
  useruid: string;
  message: string;
}
