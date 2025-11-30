import React, { useState } from "react";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const StatusPill = ({ value }) => {
  let status = value ? value.toString().toLowerCase() : "unknown";
  if (typeof value === "boolean") {
    status = value ? "approved" : "not approved";
  }

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        status === "approved" || status === "authorized" ? "bg-primary-800 text-white" : null,
        status === "not approved" || status === "partially_paid" ? "bg-pink-100 text-pink-700" : null,
        status === "active" || status === "paid" ? "bg-green-100 text-green-700" : null,
        status === "draft" || status === "pending" ? "bg-yellow-100 text-yellow-700" : null,
        status === "archived" || status === "refunded" ? "bg-red-100 text-red-700" : null,
        status === "partially_refunded" ? "bg-primary-100 text-primary-700" : null,
        status === "partial" ? "bg-yellow-100 text-yellow-700" : null,
        status === "fulfilled" ? "bg-green-100 text-green-700" : null,
        status === "available" ? "bg-green-100 text-green-700" : null,
        status === "not available" ? "bg-red-100 text-red-700" : null,
        status === "pending" ? "bg-yellow-100 text-yellow-700" : null,
        status === "unfulfill" || status === "unfulfilled" ? "bg-red-100 text-red-700" : null
      )}
    >
      {status}
    </span>
  );
};

export default StatusPill;






  // const StatusPill = ({ value }) => {
  //   const [statusValue, setStatusValue] = useState('');
  //   const status = value;
  //   value === true ? setStatusValue("Active") : setStatusValue("Not uploaded");
  //   const status = value ? value : "unknown";
  //   return (
  //     <span
  //       className={classNames(
  //         "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
  //         // status.startsWith("all") ? "bg-primary-100 text-blue-700" : null,
  //         status.startsWith("active") ? "bg-green-100 text-green-700" : null,
  //         status.startsWith("draft") ? "bg-yellow-100 text-yellow-700" : null,
  //         status.startsWith("archived") ? "bg-red-100 text-red-700" : null,
  //       )}
  //     >
  //       {status}{statusValue}
  //     </span>
  //     // <span>{value ? <span className="px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm bg-green-100 text-green-700">Active</span> : <span className="px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm bg-red-100 text-red-700">Not Uploaded</span>}</span>
  //   );
  // }