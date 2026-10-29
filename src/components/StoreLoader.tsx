"use client";

import dynamic from "next/dynamic";

const StoreScene = dynamic(() => import("./StoreScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-xl bg-white/5" />,
});

export default function StoreLoader(props: { profit: number; orders: number }) {
  return <StoreScene {...props} />;
}
