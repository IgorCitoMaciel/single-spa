import {
  DetailedHTMLProps,
  HTMLAttributes,
  forwardRef,
  RefAttributes,
} from "react";

export const Quadrado = forwardRef<
  HTMLDivElement,
  RefAttributes<HTMLDivElement>
  //DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>((props, ref) => (
  <div
    className={`
    h-[200px] 
    w-[200px] 
    bg-cinza 
    cursor-move 
    border-solid 
    border 
    border-[#333] 
    absolute 
    shadow-[0_1px_1px_-25px_#333] 
  `}
    ref={ref}
    {...props}
  ></div>
));
