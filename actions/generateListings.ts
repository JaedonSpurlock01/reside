export interface IParams {
  city: string | null;
  state: string | null;
}

export default async function generateListings(params: IParams) {
  try {
    let { city, state } = params;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (city && city.endsWith(" city")) {
      city = city.replace(" city", "");
    }

    const response = await fetch(
      `https://reside-backend-b43qx6tlcq-uw.a.run.app/listings/createByCityState?city=${city}&state=${state?.toUpperCase()}`,
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
