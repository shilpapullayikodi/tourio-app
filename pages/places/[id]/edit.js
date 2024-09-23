import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Form from "../../../components/Form.js";
import { StyledLink } from "../../../components/StyledLink.js";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const {
    data: { place, comments } = {},
    isLoading,
    error,
  } = useSWR(`/api/places/${id}`); //read request (GET)

  async function editPlace(place) {
    var { id } = router.query;
    const response = await fetch(`/api/places/${id}`, {
      //update request(PUT)
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(place),
    });
    if (response.ok) {
      await response.json();
      router.push(`/places/${id}`);
    }
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <Link href={`/places/${id}`} passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
      <Form onSubmit={editPlace} formName={"edit-place"} defaultData={place} />
    </>
  );
}
