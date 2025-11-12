/* eslint-disable react-hooks/refs */
import { forwardRef, useContext, useRef } from "react";
import { motion } from "motion/react";
import { Outlet, getRouterContext } from "@tanstack/react-router";
import { useIsPresent } from "motion/react";
import cloneDeep from "lodash/cloneDeep";

export const AnimatedOutlet = forwardRef<HTMLDivElement>((_, ref) => {
  const RouterContext = getRouterContext();
  const routerContext = useContext(RouterContext);
  const renderedContext = useRef(routerContext);
  const isPresent = useIsPresent();

  if (isPresent) {
    renderedContext.current = cloneDeep(routerContext);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ x: 150 }}
      animate={{ x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      //   transition={{ duration: 0.25 }}
      transition={{ ease: "easeOut" }}
      className="h-full"
    >
      <RouterContext.Provider value={renderedContext.current}>
        <Outlet />
      </RouterContext.Provider>
    </motion.div>
  );
});

AnimatedOutlet.displayName = "AnimatedOutlet";
