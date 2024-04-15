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

    console.log("ABOUT TO GENERATE LISTINGS FOR, ", city, state);

    const response = await fetch(
      `  /listings/createByCityState?city=${city}&state=${state?.toUpperCase()}`,
      requestOptions
    );

    console.log("GENERATED SOMETHING...");

    const listings = await response.json();

    if (!listings) {
      return null;
    }
    return listings;
  } catch (error: any) {
    return null;
  }
}
