import React, { useEffect } from "react";
import { Container, Row, Text, Col } from "@nextui-org/react";
import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../utils/etherjsConnection/connectors";
import Connect from "./Connect";

const Header = () => {
  const { activate } = useWeb3React();

  useEffect(() => {
    injectedConnector
      .isAuthorized()
      .then((isAuthorized: any) => {
        if (isAuthorized) {
          activate(injectedConnector);
        }
      })
      .catch(() => {});
  }, [activate]);

  return (
    <Container lg>
      <Row justify="center" align="center" css={{ padding: "0rem 0rem" }}>
        <Col
          css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 0rem",
          }}
        >
          <Text
            size={30}
            css={{ textGradient: "$primaryTextGradient", fontWeight: "bold" }}
          >
            DAO
          </Text>

          <Connect />
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
