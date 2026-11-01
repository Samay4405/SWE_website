export const TOUCH_GESTURE_CLASS = "touch-none select-none";

export function capturePointer(target: Element, pointerId: number) {
  try {
    target.setPointerCapture(pointerId);
  } catch {}
}

export function releasePointer(target: Element, pointerId: number) {
  try {
    if (target.hasPointerCapture(pointerId)) {
      target.releasePointerCapture(pointerId);
    }
  } catch {}
}
