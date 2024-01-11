// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = response.json();
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/auth/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
export function hasLoginnedUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/auth/hasloginned`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        resolve({ data });
      } else {
        const error = await response.json();
        console.log(error);
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
export function signOut(userId) {
  return new Promise(async (resolve, reject) => {
    // On server we will remove user session info
    resolve({ data: "success" });
  });
}
