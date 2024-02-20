import React from "react";
import { Text } from "@/components/atoms";

interface PropertiesProps {
  name?: string;
  value?: string;
  className?: string;
}

const Properties: React.FC<PropertiesProps> = ({ name, value, className }) => {
  return (
    <div className={className}>
      <Text variant="p">
        <Text variant="span" className="font-bold">
          {name}:&nbsp;
        </Text>
        {value}
      </Text>
    </div>
  );
};

export default Properties;
