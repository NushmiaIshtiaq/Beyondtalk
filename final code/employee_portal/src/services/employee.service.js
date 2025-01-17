import Axios from "axios";

import config from "../util/config.json";
import { getCurrentUser } from "./auth.service";

const ViewEmployees = () => {
  const user = getCurrentUser();
  const token = user.access_token;

  return Axios.get(
    `${config.SERVER_URI}/employee/viewallemployees/${user.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/form-data"
      }
    }
  );
};

const AddEmployee = employeeid => {
  const user = getCurrentUser();
  const token = user.access_token;

  const userid = user.user.id;

  const data = {
    userid,
    employeeid
  };

  return Axios.post(
    `${config.SERVER_URI}/employee/addtocontact/employee`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

export { ViewEmployees, AddEmployee };
