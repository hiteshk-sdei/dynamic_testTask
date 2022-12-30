import Axios from "axios";
import { IUsersDetails } from "../Components/Interface/Interface";

export function unAuthenticatedInstance() {
  return Axios.create({
    baseURL: "https://ulventech-react-exam.netlify.app",
  });
}

export const callGetAPI = async (url: string) => {
  const requestInstance = unAuthenticatedInstance();
  const result = await requestInstance.get(url);
  return result;
};

export const callPostAPI = async (url: string, body: IUsersDetails) => {
  const requestInstance = unAuthenticatedInstance();
  const result = await requestInstance.post(url, body);
  return result;
};
