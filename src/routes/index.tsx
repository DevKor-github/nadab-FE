import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import "../App.css";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="App">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
        <div key={i}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore,
          iure. Animi tempora nobis quod magnam in est ducimus illo deleniti,
          quia veniam, quibusdam labore nulla culpa eaque et? Voluptatibus,
          dolore.
        </div>
      ))}
      <Link to="/login" className="bg-blue-200">
        이메일로 로그인
      </Link>
      <Link to="/signup" className="bg-orange-200">
        회원가입
      </Link>
    </div>
  );
}
