import getListings from "@/actions/getListings";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const city = searchParams.get("city");
    const state = searchParams.get("state");

    const listings = await getListings({ city: "San Marcos", state });

    return new Response(JSON.stringify(listings));
  } catch (error) {
    console.error("Internal system error:", error);
    return new Response(JSON.stringify({ error: "Internal System Error" }));
  }
}
