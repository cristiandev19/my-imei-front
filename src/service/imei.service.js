
const URL = 'http://localhost:3001';

export const getImeisByPersona = async () => {

  const fetch_data = await fetch(`${URL}/imei/imeiByPersona`, {
    "method": "GET",
    "headers": {}
  });
  const data = await fetch_data.json();
  return data;
}

export const addImei = async (imeiData) => {
  console.log("🚀 ~ file: imei.service.js ~ line 15 ~ addImei ~ imeiData", imeiData)
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
      "body": JSON.stringify({ data: imeiData })
    })
    console.log("🚀 ~ file: imei.service.js ~ line 34 ~ addImei ~ fetch_data", fetch_data)
    if(fetch_data.status === 400) {
      throw new Error('fallo');
    }
    const data = await fetch_data.json();
    return data;
  } catch (error) {
    console.log('hola', error)
  }

}
