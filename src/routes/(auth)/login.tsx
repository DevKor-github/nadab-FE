import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-5">
      <Link to="/">뒤로가기</Link>
      <h1>이메일로 로그인하기</h1>
      <label htmlFor="">이메일</label>
      <input type="email" name="" id="" />
      <label htmlFor="">비밀번호</label>
      <input type="password" name="" id="" />
      <button className={``}>로그인</button>
    </div>
  );
}
