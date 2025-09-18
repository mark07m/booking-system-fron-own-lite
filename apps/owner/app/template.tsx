"use client";

import { useEffect } from "react";

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Здесь можно добавить логику, которая должна выполняться
    // при переходе между страницами (например, анимации)
  }, []);

  return <>{children}</>;
}
