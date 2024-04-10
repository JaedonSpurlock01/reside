interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `https://reside-backend-b43qx6tlcq-uw.a.run.app/listings/getById?id=${listingId}`,
      requestOptions
    );

    const listing = await response.json();

    if (!listing) {
      return null;
    }
    return listing;
  } catch (error: any) {
    return null;
  }
}
