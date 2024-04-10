export type RentCastListing = {
  id: string;
  body: {
    formattedAddress: string;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string;
    zipCode: string;
    county: string;
    latitude: number;
    longitude: number;
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    squareFootage: number;
    lotSize: number;
    yearBuilt: number;
    status: string;
    price: number;
    listedDate: string;
    removedDate: string | null;
    createdDate: string;
    lastSeenDate: string;
    daysOnMarket: number;
  };
  viewedBy: string[];
  images: string[];
};
