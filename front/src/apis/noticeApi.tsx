import { api } from "./axiosConfig";
import Swal from "sweetalert2";

const getSSEAlarmsApi = () => {
  return api
    .get(`/api/notices`, { withCredentials: true })
    .then((res) => {
      return res.data.noticeList;
    })
    .catch((err) => {
      console.log(err, "getSSEAlarmsAPI 오류");
      return err;
    });
};

const deleteSSEAlarmsApi = (payload: number) => {
  return api
    .delete(`/api/notices/${payload}`, { withCredentials: true })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err, "deleteSSEAlarmsAPI 오류");
      Swal.fire({
        icon: "error",
        text: "deleteSSEAlarmsAPI 오류",
      });
    });
};

export { getSSEAlarmsApi, deleteSSEAlarmsApi };
