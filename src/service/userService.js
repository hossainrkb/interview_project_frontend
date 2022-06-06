import http from "./httpService";
const END_POINT = process.env.REACT_APP_SERVER_URL;
export async function login(user) {
  try {
    let {
      data: { access_token },
    } = await http.post(`${END_POINT}/oauth/token`, user);
    localStorage.setItem("accessToken", access_token);
    return Promise.resolve(access_token);
  } catch (error) {
    return Promise.reject(error);
  }
}

export function getCurrentUser() {
  try {
    let accessToken = localStorage.getItem("accessToken");
    if(!accessToken)return;
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    return http.post(
      `${END_POINT}/api/user`,
      {},
      {
        headers: headers,
      }
    );
  } catch (error) {
    return null;
  }
}
export function logout() {
  try {
    let accessToken = localStorage.getItem("accessToken");
    let tempToken  = accessToken;
    localStorage.removeItem("accessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tempToken}`,
    };
    return http.post(
      `${END_POINT}/api/logout`,
      {},
      {
        headers: headers,
      }
    );
  } catch (error) {
    return null;
  }
}
export async function register(user) {
  try {
    let {
      data
    } = await http.post(`${END_POINT}/api/register`, user);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}