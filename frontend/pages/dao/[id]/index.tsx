import { useRouter } from "next/router";
import Dao from "../../../components/dynamic/dao/Dao";

const dao = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Dao id={id} />
    </div>
  );
};

export default dao;
