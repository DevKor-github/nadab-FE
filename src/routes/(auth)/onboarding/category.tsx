import { createFileRoute, redirect } from "@tanstack/react-router";
import BlockButton from "@/components/BlockButton";
import {
  BarChartSquareFilledIcon,
  ChartRadarFilledIcon,
  SignAltFilledIcon,
  UsersFilledIcon,
} from "@/components/Icons";
import StepTitle from "@/features/auth/StepTitle";
import clsx from "clsx";
import { useState } from "react";
import useSignupStore from "@/store/signupStore";

export const Route = createFileRoute("/(auth)/onboarding/category")({
  component: Category,
  beforeLoad: () => {
    // 이전 단계 건너뛰는 것 방지
    const { hasSeenIntro } = useSignupStore.getState();
    if (!hasSeenIntro) {
      throw redirect({ to: "/signup/terms" });
    }
  },
});

function Category() {
  const updateCategory = useSignupStore.use.updateCategory();
  const initialItems = [
    {
      icon: <BarChartSquareFilledIcon />,
      title: "일과 성장",
      isSelected: false,
    },
    {
      icon: <ChartRadarFilledIcon />,
      title: "강점과 약점",
      isSelected: false,
    },
    {
      icon: <SignAltFilledIcon />,
      title: "삶의 방향",
      isSelected: false,
    },
    {
      icon: <UsersFilledIcon />,
      title: "사람과 관계",
      isSelected: false,
    },
  ];
  const [items, setItems] = useState(initialItems);
  const selectedItem = items.find((item) => item.isSelected);

  return (
    // Todo: 버튼 밑으로 내리는 거 상위 컴포넌트에서 해주기
    <div className="h-full flex flex-col">
      <div className="flex-1 flex flex-col gap-padding-y-m">
        <div className="my-margin-y-m flex flex-col gap-margin-y-m">
          <StepTitle>
            당신의 어떤 이야기부터
            <br />
            알아가볼까요?
          </StepTitle>
          <p className="text-caption-l text-text-tertiary">
            당신에 대해 더 알고 싶은 주제를 하나 선택해주세요. <br />
            선택한 주제에 맞춰, 나답이 질문들을 준비할게요.
          </p>
        </div>
        <ul className="py-padding-y-m flex flex-col gap-margin-y-m">
          {items.map((item, i) => {
            return (
              <li
                onClick={() => {
                  setItems((prev) =>
                    prev.map((innerItem, idx) => {
                      if (idx === i) {
                        return {
                          ...innerItem,
                          isSelected: !innerItem.isSelected,
                        };
                      } else {
                        return { ...innerItem, isSelected: false };
                      }
                    })
                  );
                }}
                key={i}
                className={clsx(
                  "py-padding-y-l px-padding-x-l flex items-center gap-gap-x-m border rounded-xl cursor-pointer",
                  {
                    "border-neutral-200": !item.isSelected,
                    "border-brand-primary": item.isSelected,
                  }
                )}
              >
                {item.icon}{" "}
                <p className="text-title-3 text-text-primary">{item.title}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <BlockButton
        onClick={() => {
          updateCategory(selectedItem!.title);
        }}
      >
        다음
      </BlockButton>
    </div>
  );
}
