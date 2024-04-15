const accessToken =
  "pk.eyJ1IjoiamFlZG9uMDEiLCJhIjoiY2x0eXlodHVjMGlhejJrczNpaHBxNXJhMiJ9.RNn_iXR_1qqPXVoU6FYDEw";

export interface IParams {
  lat: number;
  lon: number;
}

export default async function getNearbyFacilities({ lat, lon }: IParams) {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/university.json?type=poi&proximity=${lon},${lat}&access_token=${accessToken}`;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, requestOptions);

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return null;
  }
}
