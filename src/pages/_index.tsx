import { useNavigate } from "react-router";
import Button from "../components/shared/Button/Button";
import { addTwoNumbers } from "../utils/number/addTwoNumbers";

const Index = () => {
  const navigate = useNavigate();
  const sum = addTwoNumbers(2, 2);

  const handleClick = () => {
    navigate("/another-page");
  };

  return (
    <>
      <div>2 + 2 = {sum}</div>
      <Button onClick={handleClick}>Go to another page</Button>
    </>
  );
};

export default Index;
