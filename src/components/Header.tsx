// 뒤로가기 버튼과 타이틀이 있는 헤더
import { useRouter } from "@tanstack/react-router";
import { ArrowLeftIcon } from "./Icons";

export default function SubHeader({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    // 음수 마진으로 본문 패딩 무시
    <header className="relative text-center -mx-padding-x-m p-padding-y-s bg-surface-base border-b border-b-border-base text-label-l text-text-secondary">
      <button
        className="absolute left-padding-x-s"
        onClick={() => router.history.back()}
      >
        <ArrowLeftIcon />
      </button>
      {children}
    </header>
  );
}
