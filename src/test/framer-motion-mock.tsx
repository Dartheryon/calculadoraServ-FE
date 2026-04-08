import React from 'react';

// Minimal framer-motion mock for testing — renders children without animations
export const motion = new Proxy(
  {},
  {
    get: (_target, prop: string) => {
      const Component = ({ children, ...props }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode; custom?: unknown; variants?: unknown; initial?: unknown; animate?: unknown; exit?: unknown; transition?: unknown }) => {
        // Strip framer-motion specific props
        const { custom: _c, variants: _v, initial: _i, animate: _a, exit: _e, transition: _t, ...rest } = props as Record<string, unknown>;
        return React.createElement(prop as string, rest as React.HTMLAttributes<HTMLElement>, children);
      };
      Component.displayName = `motion.${prop}`;
      return Component;
    },
  }
) as Record<string, React.ComponentType<Record<string, unknown>>>;

export const AnimatePresence = ({ children }: { children: React.ReactNode; mode?: string }) => {
  return <>{children}</>;
};

export const useAnimation = () => ({
  start: () => Promise.resolve(),
  stop: () => {},
  set: () => {},
});
