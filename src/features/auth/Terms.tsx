import BlockButton from "@/components/BlockButton";
import { Link } from "@tanstack/react-router";
import useSignupStore from "@/store/signupStore";
import clsx from "clsx";
import { useState } from "react";

export default function Terms() {
  const initialItems = [
    {
      id: 0,
      isRequired: true,
      title: "서비스 이용약관에 동의해요.",
      url: "",
      isAgreed: false,
    },
    {
      id: 1,
      isRequired: true,
      title: "개인정보 처리 방침에 동의해요.",
      url: "",
      isAgreed: false,
    },
    {
      id: 2,
      isRequired: true,
      title: "만 14세 이상이에요.",
      url: "",
      isAgreed: false,
    },
    {
      id: 3,
      isRequired: false,
      title: "마케팅 정보 수신에 동의해요.",
      url: "",
      isAgreed: false,
    },
  ];
  const [items, setItems] = useState(initialItems);
  const isAllAgreed = items.every((item) => item.isAgreed);
  const isAllRequiredAgreed = items.every((item) => {
    if (item.isRequired) {
      return item.isAgreed;
    } else {
      return true;
    }
  });
  const updateIsTermsAgreed = useSignupStore.use.updateIsTermsAgreed();
  return (
    <div>
      <h1>서비스 이용약관에 동의해 주세요</h1>
      <button
        className="flex gap-2"
        onClick={() => {
          setItems((prev) =>
            prev.map((item) => ({ ...item, isAgreed: !isAllAgreed }))
          );
        }}
      >
        <span
          className={clsx({
            "text-gray-400": !isAllAgreed,
            "text-black": isAllAgreed,
          })}
        >
          V
        </span>
        <p>약관 모두 동의하기</p>
      </button>
      <ul>
        {items.map((item, idx) => {
          return (
            <li
              className="cursor-pointer flex gap-2"
              key={idx}
              onClick={() => {
                setItems((prev) =>
                  prev.map((item, i) => {
                    if (idx === i) {
                      return { ...item, isAgreed: !item.isAgreed };
                    } else {
                      return item;
                    }
                  })
                );
              }}
            >
              <button
                className={clsx({
                  "text-gray-400": !item.isAgreed,
                  "text-black": item.isAgreed,
                })}
              >
                V
              </button>
              <p>{item.isRequired === true ? "필수" : "선택"}</p>
              <p>{item.title}</p>
            </li>
          );
        })}
      </ul>
      {isAllRequiredAgreed ? (
        <Link
          to="/signup"
          search={{ step: "email" }}
          onClick={updateIsTermsAgreed}
        >
          <BlockButton>완료</BlockButton>
        </Link>
      ) : (
        <BlockButton disabled>완료</BlockButton>
      )}
    </div>
  );
}
