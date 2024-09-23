import Link from "next/link";
import { useRouter } from "next/router.js";
import useSWR from "swr";
import styled from "styled-components";
import { StyledLink } from "../../../components/StyledLink.js";
import { StyledButton } from "../../../components/StyledButton.js";
import { StyledImage } from "../../../components/StyledImage.js";
import Comments from "../../../components/Comments.js";

const ImageContainer = styled.div`
  position: relative;
  height: 15rem;
  width: 50%;
  margin: 0 auto;
  overflow: hidden;
  border: 3px solid black;
  border-radius: 0.8rem;
`;

const ButtonContainer = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 0.2rem;

  & > * {
    flex-grow: 1;
    text-align: center;
  }
`;

const StyledLocationLink = styled(StyledLink)`
  text-align: center;
  background-color: white;
  border: 3px solid #2f5233;
`;

export default function DetailsPage() {
  const router = useRouter(); //access the route parameters (like id)
  const { isReady } = router;
  const { id } = router.query; //This extracts the 'id' parameter from the URL (query string), which is used to fetch the specific place's data.
  const {
    data: { place, comments } = {}, //if the data object is not yet available, the place and comments values will be set to undefined
    isLoading,
    error,
  } = useSWR(`/api/places/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  async function deletePlace() {
    const response = await fetch(`/api/places/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      alert("Place has been successfully deleted.");
      await response.json();
      router.push("/");
    } else {
      const errorText = await response.text();
      alert(`Error: ${errorText || "Not able to delete"}`);
    }
  }

  return (
    <>
      <Link href={"/"} passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
      <ImageContainer>
        <StyledImage
          src={place.image}
          priority
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt=""
        />
      </ImageContainer>
      <h2>
        {place.name}, {place.location}
      </h2>
      <Link href={place.mapURL} passHref legacyBehavior>
        <StyledLocationLink>Location on Google Maps</StyledLocationLink>
      </Link>
      <p>{place.description}</p>
      <ButtonContainer>
        <Link href={`/places/${id}/edit`} passHref legacyBehavior>
          <StyledLink>Edit</StyledLink>
        </Link>
        <StyledButton onClick={deletePlace} type="button" variant="delete">
          Delete
        </StyledButton>
      </ButtonContainer>
      <Comments locationName={place.name} comments={comments} />
    </>
  );
}
