import generateListings from "./generateListings";

export interface IParams {
  city: string | null;
  state: string | null;
}

export default async function getListings(params: IParams) {
  try {
    let { city, state } = params;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (city && city.endsWith(" city")) {
      city = city.replace(" city", "");
    }

    console.log("CITY: ", city);

    const response = await fetch(
      `https://reside-backend-b43qx6tlcq-uw.a.run.app/listings/getByCityState?city=${city}&state=${state?.toUpperCase()}`,
      requestOptions
    );

    console.log("RESPONSE STATUS: ", response.status);

    if (!response.ok) {
      // if (response.status === 404) {
      //   console.log("No listings found. Generating new listings...");
      //   const createdListings = await generateListings(params);
      //   console.log("NEW LISTINGS CREATED: ", createdListings);
      //   if (!createdListings) return null; // City, State invalid
      //   return createdListings;
      // } else {
      // Handle other error responses
      console.error("Error response:", await response.text());
      return null;
      //}
    } else {
      const data = await response.json();
      console.log("LISTINGS RECEIVED: ", data);
      return data;
    }
  } catch (error: any) {
    console.error("Error in getListings:", error);
    return null;
  }
}
