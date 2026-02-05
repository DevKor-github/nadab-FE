import useModalStore from "@/store/modalStore";
import { useEffect } from "react";
import Modal from "./Modal";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ErrorPage({ error }: { error: any }) {
  useEffect(() => {
    const isAxiosNetworkError = error.code === "ERR_NETWORK";
    const isModuleLoadError =
      error instanceof TypeError &&
      (error.message.includes("fetch") || error.message.includes("import"));

    //  axios 자체 네트워크 에러 + 네트워크 에러로 뭐 못 가져온 경우
    if (isAxiosNetworkError || isModuleLoadError) {
      useModalStore
        .getState()
        .showError(
          "네트워크 연결이 불안정해요.",
          "네트워크 확인 후 다시 시도해주세요.",
        );
    } else {
      useModalStore
        .getState()
        .showError(
          error.response?.data?.code ?? error.message,
          error.response?.data?.message ?? "알 수 없는 에러가 발생했습니다.",
        );
    }
  }, [error]);
  return (
    <>
      <div className="bg-surface-base w-screen h-dvh" />
      <Modal />
    </>
  );
}
