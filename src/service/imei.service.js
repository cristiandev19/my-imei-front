
const URL = 'http://localhost:3001';

export const getImeisByPersona = async () => {

  const fetch_data = await fetch(`${URL}/imei/imeiByPersona`, {
    "method": "GET",
    "headers": {}
  });
  const data = await fetch_data.json();
  return data;
}
