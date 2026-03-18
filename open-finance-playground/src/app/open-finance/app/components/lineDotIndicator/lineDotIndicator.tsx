import React, { useEffect, useRef, useState } from "react";
import style from "./lineDotIndicator.module.css";

interface FloatingMarkerProps {
  targetId: string;
  offsetX?: number;
  offsetY?: number;
  color?: string;
  size?: number;
  insideContainer?: boolean;
  containerSelector?: string;
  side?: "left" | "right";
  hoverText?: string;
  initialHover?: boolean;
  resetOffset?: number;
  setFirstHoverDone?: React.Dispatch<React.SetStateAction<boolean>>;
  firstHoverDone?: boolean;
}

const LineDotIndicator: React.FC<FloatingMarkerProps> = ({
  targetId,
  offsetX = 8,
  offsetY = 0,
  color = "red",
  size = 12,
  insideContainer = false,
  containerSelector,
  side = "right",
  hoverText,
  initialHover = false,
  resetOffset,
  setFirstHoverDone,
  firstHoverDone,
}) => {
  const markerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showHover, setShowHover] = useState(false);
  const hideTimerRef = useRef<number | null>(null);

  const getScrollParent = (el: HTMLElement | null): HTMLElement | Window => {
    if (!el) return window;
    let parent = el.parentElement;
    while (parent) {
      const styleComputed = getComputedStyle(parent);
      if (styleComputed.overflowY === "auto" || styleComputed.overflowY === "scroll") return parent;
      parent = parent.parentElement;
    }
    return window;
  };


  const isInViewport = (target: HTMLElement, scrollContainer: HTMLElement | Window): boolean => {
    const rect = target.getBoundingClientRect();
    const verticallyVisible = rect.bottom > 0 && rect.top < window.innerHeight;
    const horizontallyVisible = rect.right > 0 && rect.left < window.innerWidth;

    if (scrollContainer !== window) {
      const containerRect = (scrollContainer as HTMLElement).getBoundingClientRect();
      return (
        rect.bottom > containerRect.top &&
        rect.top < containerRect.bottom &&
        rect.right > containerRect.left &&
        rect.left < containerRect.right
      );
    }
    return verticallyVisible && horizontallyVisible;
  };

  const positionMarker = () => {
    const target = document.getElementById(targetId);
    const marker = markerRef.current;

    if (!target || !marker) {
      setIsVisible(false);
      return;
    }

    const scrollContainer = getScrollParent(target);

    if (!isInViewport(target, scrollContainer)) {
      setIsVisible(false);
      return;
    }

    const rect = target.getBoundingClientRect();
    let top = rect.top + rect.height / 2 - size / 2 + offsetY;
    let left = rect.right + offsetX;

    if (resetOffset && window.innerWidth < 1024) {
      left -= resetOffset;
    }

    if (insideContainer && containerSelector) {
      const container = document.querySelector(containerSelector);
      if (container instanceof HTMLElement) {
        const containerRect = container.getBoundingClientRect();
        top -= containerRect.top;
        left -= containerRect.left;
      }
    }

    marker.style.top = `${top}px`;
    marker.style[side] = `${left}px`;
    setIsVisible(true);
  };

  useEffect(() => {
    const raf = requestAnimationFrame(positionMarker);
    const target = document.getElementById(targetId);
    const scrollContainer = getScrollParent(target);

    const handleScroll = () => requestAnimationFrame(positionMarker);
    const handleResize = () => requestAnimationFrame(positionMarker);

    scrollContainer.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    const observer = new MutationObserver(() => requestAnimationFrame(positionMarker));
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      scrollContainer.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [targetId, insideContainer, containerSelector]);

useEffect(() => {
  if (!initialHover || !isVisible) return;

  setShowHover(true);
  const timer = setTimeout(() => {
    setShowHover(false);
  }, 2000);

  return () => clearTimeout(timer);
}, [initialHover, isVisible, firstHoverDone, setFirstHoverDone]);

  const clearHideTimer = () => {
    if (hideTimerRef.current !== null) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };


  const handleDotMouseEnter = () => {
    clearHideTimer();
    setShowHover(true);
    if (!firstHoverDone) setFirstHoverDone?.(true);
  };

  const handleDotMouseLeave = () => {
    clearHideTimer();
    hideTimerRef.current = window.setTimeout(() => {
      setShowHover(false);
      hideTimerRef.current = null;
    }, 100);
  };

  const handleTooltipMouseEnter = () => {
    clearHideTimer();
    setShowHover(true);
  };

  const handleTooltipMouseLeave = () => {
    clearHideTimer();
    hideTimerRef.current = window.setTimeout(() => {
      setShowHover(false);
      hideTimerRef.current = null;
    }, 100);
  };

  return (
    <div
      ref={markerRef}
      style={{
        position: insideContainer ? "absolute" : "fixed",
        borderRadius: "50%",
        pointerEvents: "auto",
        transition: "top 0.1s, left 0.1s, opacity 0.2s",
        opacity: isVisible ? 1 : 0,
        display: "flex",
        alignItems: "center",
        flexDirection: side === "right" ? "row-reverse" : "row",
        zIndex: 1000,
      }}
    >
      <div className={style.line}></div>
      <div
  className={`${style.clickRing} ${
    firstHoverDone ? style.noRipple : ""
  } ${side === "left" ? style.leftRing : ""}`}
  onMouseEnter={handleDotMouseEnter}
  onMouseLeave={handleDotMouseLeave}
  style={{ pointerEvents: "auto", borderColor: color }}
>
  <div className={style.innerCircle} />
  {hoverText && (
    <div
      className={`${style.hoverContainer} ${showHover ? style.showHover : ""}`}
      onMouseEnter={handleTooltipMouseEnter}
      onMouseLeave={handleTooltipMouseLeave}
      style={side === "left" ? { left: "26px", top: "-14px" } : { right: "26px", top: "-14px" }}
    >
      <div className={style.hoverDot} />
      <div
        className={style.hoverText}
        dangerouslySetInnerHTML={{
          __html: (hoverText ?? "").replace(/\\n/g, "\n").replace(/\n/g, "<br/>"),
        }}
      />
    </div>
  )}
</div>

    </div>
  );
};

export default LineDotIndicator;
