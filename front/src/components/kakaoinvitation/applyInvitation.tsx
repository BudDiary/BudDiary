import { useState } from "react";

export default function applyInvitation() {
  const currentUrl = window.location.href;
  const lastSegment = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
  return (
    <>
      <div>{lastSegment}</div>
    </>
  );
}
