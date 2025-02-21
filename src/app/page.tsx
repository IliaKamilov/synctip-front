import Form from "@/components/form/Form";
import TextField from "@/components/input/TextField";

const Home = () => {
  return (
    <div className="container sm:p-2 p-4 w-full mx-auto">
      <Form>
        <TextField type="date" placeholder="בחר תאריך" label="תאריך" />
        <TextField type="number" placeholder="סכום טיפים" label="טיפים" />
        <TextField type="number" placeholder="סכום קופה" label="קופה" />
      </Form>
    </div>
  );
};

export default Home;
