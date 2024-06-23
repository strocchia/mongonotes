import { FC, PropsWithChildren } from "react";
import { Flowbite } from "flowbite-react";

const FlowbiteContext: FC<PropsWithChildren> = ({ children }) => {
  return <Flowbite>{children}</Flowbite>;
};

export default FlowbiteContext;
