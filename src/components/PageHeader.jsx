"use client"

import Button from "@/ui/Button";

export default function PageHeader({ title, description, rightButton, actionClassName = "" }) {
  return (
    <div className="mb-8">
      <div className="mb-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 sm:text-2xl">{title}</h1>
        {rightButton?.href && rightButton?.label ? (
          <Button href={rightButton.href}>{rightButton?.label}</Button>
        ) : null}
      </div>
      {description && <p className="text-sm text-muted">{description}</p>}
    </div>
  );
}
  