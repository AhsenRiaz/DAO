import { useRouter } from "next/router";
import Link from "next/link";
import { Container, Text } from "@nextui-org/react";

const dao = ({}) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Container lg>
        <Text h1>{id}</Text>
      </Container>
    </div>
  );
};

export default dao;
