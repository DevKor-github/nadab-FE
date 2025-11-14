import type { Ref } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";
import clsx from "clsx";

export function LeftCarousel({
  className,
  ref,
}: {
  className?: string;
  ref?: Ref<HTMLButtonElement>;
}) {
  return (
    <Carousel className={className} ref={ref}>
      <ChevronLeftIcon />
    </Carousel>
  );
}

export function RightCarousel({
  className,
  ref,
}: {
  className?: string;
  ref?: Ref<HTMLButtonElement>;
}) {
  return (
    <Carousel className={className} ref={ref}>
      <ChevronRightIcon />
    </Carousel>
  );
}

function Carousel({
  className,
  children,
  ref,
}: {
  className?: string;
  children: React.ReactNode;
  ref?: Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={ref}
      className={clsx(
        `rounded-full overflow-hidden bg-linear-to-br
       from-black/10 via-transparent to-transparent backdrop-blur-[3px] shadow-lg`,
        className
      )}
    >
      <div
        className={`w-9 h-9 flex items-center justify-center rounded-full bg-white/15 text-ic`}
      >
        {children}
      </div>
      <GradientBorder height={36} />
    </button>
  );
}

function GradientBorder({ height }: { height: number }) {
  return (
    // 부모 요소 전체를 덮음
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      {/* 재사용 가능한 그라디언트 정의 */}
      <defs>
        <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="40%" stopColor="white" stopOpacity="0" />
          <stop offset="60%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>
      </defs>

      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        rx={height / 2 + "px"} // rounded-full과 동일한 효과
        ry={height / 2 + "px"}
        fill="none" // 내부는 투명
        stroke="url(#borderGradient)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke" // SVG가 리사이즈되어도 stroke 두께는 고정
      />
    </svg>
  );
}
