import { Link } from "@tanstack/react-router";
import useSignupStore from "@/store/signupStore";
import type { ButtonHTMLAttributes } from "react";
import BlockButton from "@/components/BlockButton";
import { NaverIcon, GoogleIcon, RoundEmailIcon } from "@/components/Icons";

export function LandingPage() {
  const reset = useSignupStore.use.reset();
  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* 위 절반 */}
      <div className="flex-1 flex items-center">
        <svg
          width="165"
          height="122"
          viewBox="0 0 165 122"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M34.8359 41.3369C38.7098 34.6274 46.9071 31.9712 53.877 34.8545C62.004 37.8284 67.0964 46.9131 65.2861 55.4121C64.1757 60.6349 63.3943 66.8687 65.4014 72.0684C66.5227 74.9745 68.0829 77.6764 70.0391 80.1006C73.5324 84.4385 79.3253 86.8793 84.4072 88.5303C92.8675 91.2773 98.2442 100.59 96.3916 109.288C95.4942 113.501 93.0546 116.949 89.5195 118.99C85.9868 121.03 81.7819 121.421 77.6807 120.091C69.2205 117.344 63.8437 108.031 65.6963 99.333C66.8075 94.1064 68.3021 87.458 66.292 82.2637C65.1707 79.3575 63.6114 76.6556 61.6553 74.2314C59.7859 71.9118 57.0571 70.2528 54.1465 68.959L28.4922 113.395C24.2762 120.697 14.9391 123.199 7.63672 118.983C0.334335 114.767 -2.16818 105.429 2.04785 98.127L34.8359 41.3369Z"
            fill="#593500"
          />
          <path
            d="M102.523 39.9575C106.39 33.26 114.565 30.6014 121.526 33.4595C129.676 36.4184 134.788 45.5191 132.975 54.0317C131.864 59.2545 131.083 65.4883 133.09 70.688C134.211 73.5942 135.771 76.296 137.728 78.7202C141.221 83.0581 147.014 85.4989 152.096 87.1499C160.556 89.897 165.933 99.21 164.08 107.908C163.183 112.121 160.743 115.569 157.208 117.61C153.675 119.649 149.47 120.041 145.369 118.71C136.909 115.963 131.532 106.65 133.385 97.9526C134.496 92.726 135.991 86.0776 133.98 80.8833C132.859 77.9771 131.3 75.2753 129.344 72.8511C127.474 70.5312 124.745 68.8725 121.834 67.5786L96.1797 112.015C91.9636 119.317 82.6266 121.819 75.3242 117.603C68.0219 113.387 65.5194 104.05 69.7354 96.7476L102.523 39.9575Z"
            fill="#593500"
          />
          <circle
            cx="81.8743"
            cy="15.518"
            r="15.5179"
            transform="rotate(-90 81.8743 15.518)"
            fill="#FFC455"
          />
        </svg>
      </div>
      {/* 아래 절반 */}
      <div className="flex-1 w-full flex flex-col justify-center">
        <div className="flex flex-col gap-margin-y-l">
          <div className="flex flex-col gap-margin-y-m">
            <LoginButton icon={NaverIcon}>네이버로 로그인</LoginButton>
            <LoginButton icon={GoogleIcon}>구글로 로그인</LoginButton>
            <Link to="/login" onClick={reset}>
              <LoginButton icon={RoundEmailIcon}>메일로 로그인</LoginButton>
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <hr className="flex-1 border-t border-border-layer-1" />
            <span className="text-text-disabled text-caption-m">또는</span>
            <hr className="flex-1 border-t border-border-layer-1" />
          </div>
          <Link to="/signup">
            <BlockButton>회원가입</BlockButton>
          </Link>
          <p className="text-center text-label-s text-text-tertiary">
            가입을 진행할 경우, 이용약관과 개인정보 수집 및 이용
            <br />에 대해 동의한 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}

type Props = {
  icon: React.ElementType;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

// 왜 기본 버튼 컴포넌트 안 쓴거지
function LoginButton({ icon: Icon, children, ...props }: Props) {
  return (
    <button
      {...props}
      className="relative w-full rounded-xl py-padding-y-m text-center border border-border-layer-1 hover:border-button-tertiary-border-hover text-text-primary bg-field-bg-default hover:bg-button-tertiary-bg-hover text-button-1"
    >
      <span className="absolute left-4">
        <Icon />
      </span>
      {children}
    </button>
  );
}
