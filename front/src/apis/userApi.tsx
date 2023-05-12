import { api, formApi } from "./axiosConfig";
import Swal from 'sweetalert2';

// 카카오 인가코드 전송
const kakaoSignUpApi = (payload: string | null) => {
    return api.get(`${payload}`, { withCredentials: true })
    .then((res) => {
        return res.data;
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          text: '로그인 과정에서 오류가 발생했어요.'
        })
        return err;
      });
}

// 회원가입 
const firstSignUpApi = (payload: any) => {
    return formApi.post(`api/members/signup`, payload,  { withCredentials: true })
    .then((res) => {
        return res.data;
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          text: '회원가입 프사업로드, 닉네임 설정 과정에서 오류가 발생했어요.'
        })
        return err;
      });
}

// 닉네임 업데이트
const patchNicknameApi = (payload: any) => {
  return api.patch(`api/members/nickname`, {nickname: payload },  { withCredentials: true })
  .then((res) => {
      return res.data;
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        text: '닉네임은 2자 이상, 8자 이하여야 합니다.'
      })
      return err;
    });
}

// intro 업데이트
const patchIntroApi = (payload: any) => {
  return api.patch(`api/members/intro`, {intro: payload} ,  { withCredentials: true })
  .then((res) => {
      return res.data;
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        text: 'intro 업데이트 에러'
      })
      return err;
    });
}

// profile 업데이트
const patchProfileApi = (payload: any) => {
  return formApi.patch(`api/members/profile`, payload,  { withCredentials: true })
  .then((res) => {
      return res.data;
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        text: '프로필 사진 파일이 잘못되었습니다.'
      })
      return err;
    });
}

// 로그아웃 시 쿠키의 토큰 삭제
const deleteTokenApi = () => {
  return api.delete(`api/members/token`, { withCredentials: true })
  .then((res) => {
    Swal.fire({
      icon: 'success',
      text: '로그아웃 성공'
    })
    return res.data
  })
  .catch((err) => {
    console.log(err, 'deleteTokenApi 오류')
  })
} 

export { kakaoSignUpApi, firstSignUpApi, patchNicknameApi, patchIntroApi, patchProfileApi, deleteTokenApi };