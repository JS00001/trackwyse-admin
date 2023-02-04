/*
 * Created on Fri Feb 03 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import Text from "@/components/Text";

interface AvatarProps {
  label: string;
}

const Avatar: React.FC<AvatarProps> = ({ label }) => {
  return (
    <div className="relative h-12 w-12 flex-shrink-0 rounded-full bg-gray-100">
      <div className="absolute flex h-full  w-full items-center justify-center">
        <Text variant="title" className="select-none">
          {label}
        </Text>
      </div>
    </div>
  );
};

export default Avatar;
