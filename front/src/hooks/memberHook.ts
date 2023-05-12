import { MemberLoginType } from '../types/member';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/modules';
import { loginAction, logoutAction } from '../store/modules/member';
import { useNavigate } from "react-router-dom";

export default function useMember() {
  const { isLoggedIn, memberData } = useSelector((state: RootState) => state.member);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useCallback(
    (data: MemberLoginType) => {
      dispatch(loginAction(data));
    },
    [dispatch],
  );
  const logout = useCallback(() => {
    dispatch(logoutAction());
    navigate('/')
  }, [dispatch]);
  return { isLoggedIn, memberData, login, logout };
}