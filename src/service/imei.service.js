
const URL = 'http://localhost:3001';

export const getImeisByPersona = async (_id_user) => {
  try {
    const fetch_data = await fetch(`${URL}/imei/imeiByPersona?_id_user=${_id_user}`, {
      "method": "GET",
      "headers": {}
    });
    const data = await fetch_data.json();
    return data;
  } catch (error) {
    
  }
}

export const addImei = async (imeiData) => {
  try {
    const fetch_data = await fetch(`${URL}/imei/addImei`, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      // "headers": {
      //   "cookie": "PHPSESSID=2rjqso2ukk193osc73r8uvmk2p",
      //   "Content-Type": "application/json"
      // },
      "body": JSON.stringify({ ...imeiData })
    })
    if(fetch_data.status === 400) {
      throw new Error('fallo');
    }
    const data = await fetch_data.json();
    return data;
  } catch (error) {
  }

}

export const deleteImei = async (_id_imei) => {
  try {
    const fetch_data = await fetch(`${URL}/imei/deleteImei`, {
      "method": "DELETE",
      "headers": {
        "Content-Type": "application/json"
      },
      // "headers": {
      //   "cookie": "PHPSESSID=2rjqso2ukk193osc73r8uvmk2p",
      //   "Content-Type": "application/json"
      // },
      "body": JSON.stringify({ _id_imei })
    })
    if(fetch_data.status === 400) {
      throw new Error('fallo');
    }
    const data = await fetch_data.json();
    return data;
  } catch (error) {
  }

}

export const deletupdateImeieImei = async (imeiData) => {
  try {
    const fetch_data = await fetch(`${URL}/imei/updateImei`, {
      "method": "PUT",
      "headers": {
        "Content-Type": "application/json"
      },
      // "headers": {
      //   "cookie": "PHPSESSID=2rjqso2ukk193osc73r8uvmk2p",
      //   "Content-Type": "application/json"
      // },
      "body": JSON.stringify({ ...imeiData })
    })
    if(fetch_data.status === 400) {
      throw new Error('fallo');
    }
    const data = await fetch_data.json();
    return data;
  } catch (error) {
  }

}
