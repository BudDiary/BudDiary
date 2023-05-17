import { useState, useEffect } from "react";
import { PostApproveInvitationApi } from "../../apis/clubApi";

export default function ApproveInvitation() {
  const currentUrl = window.location.href;
  const lastSegment = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);

  useEffect(() => {
    PostApproveInvitationApi(lastSegment)
      .then((res) => {
        // Handle the response
      })
      .catch((err) => {
        // Handle the error
      });
  }, [lastSegment]);

  return (
    <>
      <div>{lastSegment}</div>
    </>
  );
}
