import { Card, Container, Grid, Text } from "@nextui-org/react";
import Link from "next/link";
import React, { FC } from "react";
import { DaoList } from "./DaoList";

interface IDao {
  daoCards: DaoList;
}

const Dao: FC<IDao> = ({ daoCards }) => {
  return (
    <Container lg>
      <Grid.Container gap={3}>
        {daoCards &&
          daoCards.map((dao, i) => {
            return (
              <Link key={i} href={`dao/[id]`} as={`dao/${dao.id}`}>
                <Grid key={i} xs={12} sm={6} md={4} lg={4}>
                  <Card isHoverable isPressable variant="bordered" key={i}>
                    <Card.Header>
                      <Text
                        h3
                        css={{
                          color: "#ff758c",
                          fontWeight: "bold",
                        }}
                      >
                        {dao.title}
                      </Text>
                    </Card.Header>
                    <Card.Body css={{ color: "#b76db7" }}>
                      {dao.description}
                    </Card.Body>
                    <Card.Footer css={{ color: "#cb9ecb" }}>
                      Click on the card
                    </Card.Footer>
                  </Card>
                </Grid>
              </Link>
            );
          })}
      </Grid.Container>
    </Container>
  );
};

export default Dao;
