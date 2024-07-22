import axios from "axios";
import { UserModel } from "../models/auth";
import { SiteKey } from "../models/dashboard";

const API_URL = "https://app.admss.com/api/v1/sites";
const APP_KEY = "sites";

export function login(user: string, secret: string) {
  return axios.post<UserModel>(API_URL, {
    user,
    secret,
    application: APP_KEY,
  });
}

export async function getSiteKey(userId: string = "0"): Promise<SiteKey> {
  return axios.get<SiteKey>(`${API_URL}/${userId}/apikey`).then((response) => {
    return response.data;
  });
}

export function generateSiteKey(userId: string = "0"): Promise<SiteKey> {
  return axios.post<SiteKey>(`${API_URL}/${userId}/apikey`).then((response) => {
    return response.data;
  });
}
