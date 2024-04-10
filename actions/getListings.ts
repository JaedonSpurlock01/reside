export interface IParams {
  city: string | null;
  state: string | null;
}

export default async function getListings(params: IParams) {
  try {
    const { city, state } = params;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `https://reside-backend-b43qx6tlcq-uw.a.run.app/listings/getByCityState?city=${city}&state=${state?.toUpperCase()}`,
      requestOptions
    );

    const listings = await response.json();

    if (!listings) {
      return null;
    }
    return listings;
  } catch (error: any) {
    return null;
  }
}
