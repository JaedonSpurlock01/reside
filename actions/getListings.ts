export interface IListingsParams {
  listedDate?: string;
  daysOnMarket?: number;
  roomCount?: number;
  bathroomCount?: number;
  price?: string;
  propertyType?: string;
  squareFootage?: number;
  lotSize?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      listedDate,
      daysOnMarket,
      roomCount,
      bathroomCount,
      price,
      propertyType,
      squareFootage,
      lotSize,
    } = params;

    let query: any = {};

    if (listedDate) {
      query.listedDate = listedDate;
    }

    if (daysOnMarket) {
      query.daysOnMarket = daysOnMarket;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (price) {
      query.price = price;
    }

    if (propertyType) {
      query.propertyType = propertyType;
    }

    if (squareFootage) {
      query.squareFootage = squareFootage;
    }

    if (lotSize) {
      query.lotSize = lotSize;
    }

    const listings = await (() => {}); // In the future, grab listings from here
    return null;
  } catch (error: any) {
    throw new Error(error);
  }
}
