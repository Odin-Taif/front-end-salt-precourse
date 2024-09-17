"use client";

import React from "react";
import { IconType } from "react-icons";

type Props = {
  title: string;
  subtitle?: string;
  center?: boolean;
  icon?: IconType;
  iconSize?: number;
};

export const Heading = ({
  title,
  subtitle,
  center,
  icon: Icon,
  iconSize,
}: Props) => {
  // Rendering the Heading component with optional subtitle, center alignment, and icon
  return (
    <div className={center ? "text-center" : "text-start"}>
      {Icon && <Icon size={iconSize || 24} />}{" "}
      {/* Optional icon with customizable size */}
      <div className="text-3xl font-bold">{title}</div>
      {subtitle && (
        <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
      )}
    </div>
  );
};
