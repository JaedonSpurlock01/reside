export async function POST(req) {
  try {
    console.log("HELLO");
    const requestBody = {
      Listing: "525 W El Norte (SPC 201) Pkwy, Escondido, CA 91993",
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };

    const response = await fetch(
      "https://open-visuals.vercel.app/ResideLibrary/Images",
      requestOptions
    );

    if (response) {
      try {
        let jsonR = await response?.text();
        console.log("INSIDE API: ", jsonR);
      } catch (error) {
        console.log("recieved response but could not parse body");
      }

      return new Response(JSON.stringify({ response: "hello world" }));
    }
  } catch (error) {
    console.error("Internal system error:", error);
    return new Response(JSON.stringify({ error: "Internal System Error" }));
  }
}
