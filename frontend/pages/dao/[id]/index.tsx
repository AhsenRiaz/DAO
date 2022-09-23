import { GetStaticProps } from "next";
import Dao from "../../../components/dynamic/dao/Dao";

const dao = ({ id }: any) => {
  return <Dao id={id} />;
};

export default dao;

export const getServerSideProps: GetStaticProps = async (context) => {
  let id = context.params?.id;
  console.log("context", context);
  return {
    props: {
      id,
    },
  };
};
