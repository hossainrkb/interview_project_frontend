import http from "./httpService";
const END_POINT = process.env.REACT_APP_SERVER_URL;

export function index(partnerId) {
  try {
    let accessToken = localStorage.getItem("accessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    return http.post(
      `${END_POINT}/api/partner/${partnerId}/offers/show`,
      {},
      {
        headers: headers,
      }
    );
  } catch (error) {
    return null;
  }
}
export function store(data,partnerId) {
  try {
    let accessToken = localStorage.getItem("accessToken");
    let headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    return http.post(
      `${END_POINT}/api/partner/${partnerId}/offers/store`,
      data,
      {
        headers: headers,
      }
    );
  } catch (error) {
    return null;
  }
}
export function update(id,data) {
  try {
    let accessToken = localStorage.getItem("accessToken");
    let headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    return http.post(
      `${END_POINT}/api/offer/${id}/update`,
      data,
      {
        headers: headers,
      }
    );
  } catch (error) {
    return null;
  }
}
export function show(id) {
  try {
    let accessToken = localStorage.getItem("accessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    return http.post(
      `${END_POINT}/api/offer/show/${id}`,
      {},
      {
        headers: headers,
      }
    );
  } catch (error) {
    return null;
  }
}
export function list() {
  try {
    let accessToken = localStorage.getItem("accessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    return http.post(
      `${END_POINT}/api/offer`,
      {},
      {
        headers: headers,
      }
    );
  } catch (error) {
    return null;
  }
}
export function destroy(id) {
  try {
    let accessToken = localStorage.getItem("accessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    return http.post(
      `${END_POINT}/api/offer/${id}/destroy`,
      {},
      {
        headers: headers,
      }
    );
  } catch (error) {
    return null;
  }
}