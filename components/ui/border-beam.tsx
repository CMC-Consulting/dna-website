import { cn } from "@/lib/utils"

interface BorderBeamProps {
  /**
   * The class name of the border beam.
   */
  className?: string
  /**
   * The size of the border beam.
   */
  size?: number
  /**
   * The duration of the border beam.
   */
  duration?: number
  /**
   * The border width of the beam.
   */
  borderWidth?: number
  /**
   * The anchor point of the beam.
   */
  anchor?: number
  /**
   * The color of the border beam from.
   */
  colorFrom?: string
  /**
   * The color of the border beam to.
   */
  colorTo?: string
  /**
   * The delay of the border beam.
   */
  delay?: number
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}) => {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        "[border:calc(var(--border-width)*1px)_solid_transparent]",
        // mask styles
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect]",
        "[mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        // pseudo styles
        "after:absolute after:aspect-square after:[offset-anchor:calc(var(--anchor)*1%)_50%]",
        "after:w-[calc(var(--size)*1px)] after:animate-border-beam",
        "after:[animation-delay:var(--delay)]",
        "after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)]",
        "after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className,
      )}
    />
  )
}
