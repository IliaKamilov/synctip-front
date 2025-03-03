import { Dropdown } from "@/components/Dropdown";
import { Navbar } from "@/components/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar>
        <Dropdown open={true}>
          <Dropdown.Item>item</Dropdown.Item>
          <Dropdown.Item>item</Dropdown.Item>
          <Dropdown.Item>item</Dropdown.Item>
        </Dropdown>
      </Navbar>
    </>
  );
};

export default HomePage;
