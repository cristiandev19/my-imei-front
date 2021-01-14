import { URL_API } from "../models/constants";


export const emailSignUp = async (emailData) => {
  return new Promise(async (resolve) => {
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
      console.log('fetch_data', fetch_data);
      const data = await fetch_data.json();
      console.log('🚀 ~ file: auth.service.js ~ line 19 ~ emailSignUp ~ data', data)
      if(fetch_data.status === 400) {
        throw new Error(data.msj);
      }
      // console.log('🚀 ~ file: auth.service.js ~ line 21 ~ emailSignUp ~ data', data)
      return resolve(data);
    } catch (error) {
      // console.log('error', error)
      // console.log('error', error.message)
      return resolve({
        error: true,
        message: error.message
      })
    }
  })
}
