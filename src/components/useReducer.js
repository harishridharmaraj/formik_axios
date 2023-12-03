import { useReducer } from "react";

const initialState = {
  name: "",
  email: "",
  phone: "",
  submittedData: [],
};
const formReducer = (state, action) => {
  switch (action.type) {
    case "formVal":
      return { ...state, [action.field]: action.value };
    case "SubmitForm":
      const submittedData = { ...state };
      delete submittedData.submittedData; // Remove the submittedData array from the copied state
      return {
        ...state,
        submittedData: [...state.submittedData, submittedData],
        name: "",
        email: "",
        phone: "",
      };

    default:
      return state;
  }
};

const Reduceer = () => {
  // const [data, setData] = useState([]);
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state.name);

    dispatch({ type: "formVal", field: "name", value: "" });
    dispatch({ type: "formVal", field: "email", value: "" });
    dispatch({ type: "formVal", field: "phone", value: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "formVal", field: name, value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={state.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={state.email}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="phone"
          placeholder="Phone"
          value={state.phone}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <div>{state.submittedData.map((item) => item.name)}</div>
    </div>
  );
};

export default Reduceer;
