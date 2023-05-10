import { fastApi } from "./axiosConfig";
import Swal from 'sweetalert2';

const firstSurveyApi = (payload: any) => {
  return fastApi.post(`api/members/signup`, payload,  { withCredentials: true })
  .then((res) => {
      return res.data;
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        text: '설문조사가 제대로 전달되지 않았어요.'
      })
      return err;
    });
}


export { firstSurveyApi };