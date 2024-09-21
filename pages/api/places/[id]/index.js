import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

//import { db_comments } from "../../../../lib/db_comments";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id); //use singular

    // if (!id) {
    //   return;
    // }

    /* const place = db_places.find((place) => place._id.$oid === id);
  const comment = place?.comments;
  const allCommentIds = comment?.map((comment) => comment.$oid) || [];
  const comments = db_comments.filter((comment) =>
    allCommentIds.includes(comment._id.$oid)
  );*/

    if (!place) {
      return response.status(404).json({ status: "Not found" }); //if there is no place for corresponding id
    }

    return response.status(200).json({ place: place, comments: [] });
  }

  if (request.method === "PUT") {
    try {
      const placeData = request.body; // data from form

      const updatedPlace = await Place.findByIdAndUpdate(id, placeData);

      console.log(response.json);

      response.status(201).json({ status: "Place Updated." });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      await Place.findByIdAndDelete(id);
      response.status(201).json({ status: "Place Deleted." });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}
