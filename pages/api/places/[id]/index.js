import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place.js";

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
      return response.status(404).json({ status: "Not found" });
    }

    return response.status(200).json(place);
  }
}
