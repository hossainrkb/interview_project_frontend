import http from "./httpService";
const END_POINT = process.env.REACT_APP_SERVER_URL;

export function index() {
  try {
    let accessToken = localStorage.getItem("accessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    return http.post(
      `${END_POINT}/api/partner`,
      {},
      {
        headers: headers,
      }
    );
  } catch (error) {
    return null;
  }
}
export function store(data) {
  try {
    let accessToken = localStorage.getItem("accessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    return http.post(
      `${END_POINT}/api/partner/store`,
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
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    return http.post(
      `${END_POINT}/api/partner/${id}/update`,
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
      `${END_POINT}/api/partner/show/${id}`,
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
      `${END_POINT}/api/partner/${id}/destroy`,
      {},
      {
        headers: headers,
      }
    );
  } catch (error) {
    return null;
  }
}
