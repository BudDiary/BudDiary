import React, { useEffect } from "react";
import { kakaoSignUpApi } from "../../apis/userApi";
import { useDispatch } from "react-redux";
// import { REDIRECT_URI } from '../../apis/axiosConfig';
import { useNavigate } from "react-router-dom";
import useMember from "../../hooks/memberHook";
import Swal from "sweetalert2";
import { getMyStickersApi } from "../../apis/stickerApi";
import { getStickerList } from "../../store/modules/member";

export default function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login, memberData } = useMember();
  useEffect(() => {
    async function fetchData() {
      const currentUrl: string = window.location.href;
      // const code = currentUrl.split('buddiaryALB-1250245218.ap-northeast-2.elb.amazonaws.com/')[1];
      const code = currentUrl.split(
        `${process.env.REACT_APP_KAKAO_PARSE_URI}`
      )[1];
      const response = await kakaoSignUpApi(code);
      console.log(response);
      // 처음 가입한 사람이면 signup 으로 보내고, 아니면 메인페이지로
      if (response.newBe === true) {
        login(response);
        navigate("/signup-info", { state: response });
      } else if (response.newBe === false) {
        // 이미 가입된 사용자이면
        login(response);
        const sticker = await getMyStickersApi();
        dispatch(getStickerList(sticker));
        console.log("이미 가입한사람이예용", sticker);
        Swal.fire({
          icon: "success",
          text: "로그인 성공!",
        });
        navigate("/");
      } else {
        console.log(response);
      }
    }
    fetchData();
  }, []);
  return <div>SignUpPage</div>;
}
