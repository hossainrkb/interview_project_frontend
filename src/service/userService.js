import http from "./httpService";
const END_POINT = "http://localhost:8005";
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
export function register(user) {
  return http.post(`${END_POINT}/users/register`, user);
}
export function getCurrentUser() {
  try {
    let accessToken = localStorage.getItem("accessToken");
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
