import styled from "styled-components";
import Card from "../components/Card.js";
import useSWR from "swr";
import Link from "next/link.js";
import { StyledLink } from "../components/StyledLink.js";

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row; /* Changed to row */
  align-items: center;
  gap: 1rem;
  padding-left: 0;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  position: relative;
  width: 30%;
`;

const FixedLink = styled(StyledLink)`
  position: fixed;
  bottom: 50px;
  right: 50px;
`;
export default function Home() {
  const { data } = useSWR("/api/places", { fallbackData: [] }); //api call

  return (
    <>
      <List role="list">
        {data.map((place) => {
          return (
            <ListItem key={place.id}>
              <Card
                name={place.name}
                image={place.image}
                location={place.location}
                id={`${place._id.$oid ?? place._id}`}
              />
            </ListItem>
          );
        })}
      </List>
      <Link href="/create" passHref legacyBehavior>
        <FixedLink>+ place</FixedLink>
      </Link>
    </>
  );
}
