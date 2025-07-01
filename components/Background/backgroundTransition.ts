const visibleStatus: TransitionStatus[] = ['entering', 'entered'];

export type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited' | 'unmounted';

/**
 * Is the given TransitionStatus visible?
 */
export const isVisible = (status: TransitionStatus): boolean =>
  visibleStatus.includes(status);

/**
 * Is the given TransitionStatus hidden?
 */
export const isHidden = (status: TransitionStatus): boolean =>
  !visibleStatus.includes(status);

/**
 * Forces a reflow to trigger transitions on enter
 */
export const reflow = (node: HTMLElement | null): number | undefined =>
  node?.offsetHeight;
