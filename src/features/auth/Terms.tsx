import BlockButton from "@/components/BlockButton";
import { Link } from "@tanstack/react-router";
import useSignupStore from "@/store/signupStore";
import clsx from "clsx";
import { useState } from "react";
import {
  AgreementCheckboxIcon,
  SelectAllCheckboxIcon,
} from "@/components/Icons";

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
    <div className="p-padding-y-m flex flex-col gap-margin-y-m">
      <button
        className="flex items-center gap-padding-x-xs text-button-1 text-text-primary px-padding-x-s py-padding-y-s border border-border-base rounded-lg"
        onClick={() => {
          setItems((prev) =>
            prev.map((item) => ({ ...item, isAgreed: !isAllAgreed }))
          );
        }}
      >
        <span
          className={clsx({
            "text-icon-disabled": !isAllAgreed,
            "text-icon-primary": isAllAgreed,
          })}
        >
          <SelectAllCheckboxIcon />
        </span>
        <p>약관 모두 동의하기</p>
      </button>
      <ul className="flex flex-col gap-padding-y-xs">
        {items.map((item, idx) => {
          return (
            <li
              className={clsx("cursor-pointer flex gap-margin-x-s", {
                "text-text-disabled": !item.isAgreed,
                "text-text-primary": item.isAgreed,
              })}
              key={idx}
              onClick={() => {
                setItems((prev) =>
                  prev.map((innerItem, i) => {
                    if (idx === i) {
                      return { ...innerItem, isAgreed: !innerItem.isAgreed };
                    } else {
                      return innerItem;
                    }
                  })
                );
              }}
            >
              <button className="flex items-center px-padding-x-xs py-padding-y-xs">
                <AgreementCheckboxIcon />
              </button>
              <p className="text-label-l">
                {item.isRequired === true ? "필수" : "선택"}
              </p>
              <p className="text-caption-l">{item.title}</p>
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
