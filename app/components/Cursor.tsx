import { RefObject, useEffect, useRef } from "react";
import { useMotionValue, useSpring, frame, motion } from "motion/react";

const WIDTH = 50;

export const Cursor = () => {
  return (
    <>
      <CursorCircleDelay />
      <DotCurstorCircle />
    </>
  );
};

const CursorCircleDelay = () => {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref, {
    damping: 15,
    stiffness: 90,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        ref={ref}
        style={{
          width: WIDTH,
          height: WIDTH,
          borderRadius: "50%",
          backgroundColor: "transparent",
          border: "3px solid white",
          position: "fixed",
          y,
          x,
          pointerEvents: "none",
          zIndex: 9999,
          /* invert inside */
          mixBlendMode: "difference",
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      />
    </>
  );
};

const DotCurstorCircle = () => {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref, {
    stiffness: 100000,
  });

  return (
    <motion.div
      ref={ref}
      style={{
        width: WIDTH / 4,
        height: WIDTH / 4,
        borderRadius: "50%",
        backgroundColor: "#ff5511",
        position: "fixed",
        y,
        x,
        pointerEvents: "none",
        zIndex: 9999,
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
    />
  );
};

type SpringConfig = {
  damping?: number;
  stiffness?: number;
  restDelta?: number;
};

export function useFollowPointer(
  ref: RefObject<HTMLElement>,
  spring: SpringConfig = { damping: 15, stiffness: 90, restDelta: 0.001 }
) {
  const xPoint = useMotionValue(0);
  const yPoint = useMotionValue(0);
  const x = useSpring(xPoint, spring);
  const y = useSpring(yPoint, spring);

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current!;

      frame.read(() => {
        xPoint.set(clientX - element.offsetLeft - element.offsetWidth / 2);
        yPoint.set(clientY - element.offsetTop - element.offsetHeight / 2);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [ref]);

  return { x, y };
}
