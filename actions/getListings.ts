"use server";

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

    const response = await fetch(
      `https://reside-backend-b43qx6tlcq-uw.a.run.app/listings/getByCityState?city=${city}&state=${state?.toUpperCase()}`,
      requestOptions
    );

    if (!response.ok) {
      console.log(
        "STATUS: ",
        response.status,
        "- COULD NOT FETCH LISTINGS FROM BACKEND"
      );
      return null;
    } else {
      const data = await response.json();

      console.log(
        "STATUS: ",
        response.status,
        "- SUCCESSFULLY FETCHED ",
        data.length,
        " LISTINGS FROM RENTCAST & REDFIN"
      );

      return data;
    }
  } catch (error: any) {
    console.error("Error in getListings:", error);
    return null;
  }
}
