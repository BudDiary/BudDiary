import { api } from "./axiosConfig";
import Swal from 'sweetalert2';

const getSSEAlarmsAPI = () => {
  return api
    .get(``)
    .then((res) => {
      console.log(res)
      // return res.data
    })
    .catch((err) => {
      console.log(err, 'getSSEAlarmsAPI 오류')
      Swal.fire({
        icon: 'error',
        text: 'getSSEAlarmsAPI 오류'
      })
    });
};

const deleteSSEAlarmsAPI = () => {
  return api
    .delete(``)
    .then((res) => {
      console.log(res)
      // return res.data
    })
    .catch((err) => {
      console.log(err, 'deleteSSEAlarmsAPI 오류')
      Swal.fire({
        icon: 'error',
        text: 'deleteSSEAlarmsAPI 오류'
      })
    });
};



export {
  getSSEAlarmsAPI,
  deleteSSEAlarmsAPI,

};