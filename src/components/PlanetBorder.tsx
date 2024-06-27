import type { SVGProps } from "react"
const PlanetBorder = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 1270 80"
        preserveAspectRatio="none"
        {...props}
    >
        <path
            fill="#0F76F0"
            d="M0 45.926S258.43 0 635 0s635 45.926 635 45.926V80H0z"
        />
    </svg>
)
export default PlanetBorder
