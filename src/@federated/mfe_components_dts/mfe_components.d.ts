/// <reference types="react" />
declare module "mfe_components/Button.types" {
    export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
        children: React.ReactNode;
    }
}
declare module "mfe_components/Button" {
    import { ButtonProps } from "mfe_components/Button.types";
    const Button: ({ children, ...props }: ButtonProps) => import("react").JSX.Element;
    export default Button;
}
declare module "mfe_components/Button" {
    import Button from "mfe_components/Button";
    export default Button;
}
