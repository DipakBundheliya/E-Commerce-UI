// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://e-commerce-back-end-three.vercel.app/auth/signup",
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      }
    );
    const data = response.json();
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `https://e-commerce-back-end-three.vercel.app/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(loginInfo),
          headers: { "content-type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
export function hasLoginnedUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `https://e-commerce-back-end-three.vercel.app/auth/hasloginned`
      );
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error);
      }
      console.log(response);
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
