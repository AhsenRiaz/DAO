import React from "react";
import Dao from "./Dao";

export type DaoList = {
  title: string;
  description: string;
}[];

const DaoList = () => {
  let daoCards: DaoList = [
    {
      title: "Buy This NFT",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo laudantium, officia animi provident id nemo cum ea esse officiis delectus ipsam, aliquid earum! Vero debitis necessitatibus veritatis dignissimos. Similique, voluptatibus",
    },
    {
      title: "Buy This NFT",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo laudantium, officia animi provident id nemo cum ea esse officiis delectus ipsam, aliquid earum! Vero debitis necessitatibus veritatis dignissimos. Similique, voluptatibus",
    },
  ];
  return (
    <div style={{marginTop:'2rem'}} >
      <Dao daoCards={daoCards} />
    </div>
  );
};

export default DaoList;
