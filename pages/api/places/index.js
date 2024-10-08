import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    return response.status(200).json(places);
  }
  if (request.method === "POST") {
    // create a post api route
    try {
      const placeData = request.body; // data from form

      await Place.create(placeData);

      response.status(201).json({ status: "Place created." });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}
