// 회원가입 & 온보딩 각 단계 큰 글씨로 나오는 제목
export default function StepTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="whitespace-pre-line text-title-1 text-text-primary">
      {children}
    </h1>
  );
}
