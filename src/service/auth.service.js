import { URL_API } from "../models/constants";


export const emailSignUp = async (emailData) => {
  try {
    const fetch_data = await fetch(`${URL_API}/auth/emailSignUp`, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      // "headers": {
      //   "cookie": "PHPSESSID=2rjqso2ukk193osc73r8uvmk2p",
      //   "Content-Type": "application/json"
      // },
      "body": JSON.stringify({ ...emailData })
    })
    if(fetch_data.status === 400) {
      throw new Error('fallo');
    }
    const data = await fetch_data.json();
    return data;
  } catch (error) {
  }

}
