import React from "react";
// import { faEdit, faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const organizationEmployeeColumns = () => {
  return [
    {
      Header: "First Name",
      accessor: "first_name",
    },
    {
      Header: "Last Name",
      accessor: "last_name",
    },
    {
      Header: "Phone Number",
      accessor: "phone",
    },
    {
      Header: "Email",
      accessor: (row) => {
        return <span>{row.email ? row.email : "__"}</span>;
      },
    },

    {
      Header: "Plan",
      accessor: (row) => {
        return (
          <span>
            {row?.organization_subscription?.subscription
              ? row.organization_subscription.subscription
              : "__"}
          </span>
        );
      },
    },
    {
      Header: "Redeem Coupon",
      accessor: (row) => {
        return (
          <span>
            {row.organization_subscription?.coupon_code
              ? row.organization_subscription.coupon_code
              : "__"}
          </span>
        );
      },
    },
    {
      Header: "Registered Date",
      accessor: "createdAt",
    },
    {
      Header: "Subscribed Date",
      accessor: (row) => {
        return (
          <span>
            {row.user_subscription?.subscription_created_date
              ? row.user_subscription.subscription_created_date
              : "__"}
          </span>
        );
      },
    },
    {
      Header: "Work Life balance",
      accessor: (row) => {
        return (
          <span
            className={`fw-normal text-${
              row?.modes?.workLifeBalance?.is_active ? "success" : "danger"
            }`}
          >
            {row?.modes?.workLifeBalance?.is_active ? "Active" : "Inactive"}
          </span>
        );
      },
    },
    {
      Header: "Road Safety",
      accessor: (row) => {
        return (
          <span
            className={`fw-normal text-${
              row?.modes?.roadSafety?.is_active ? "success" : "danger"
            }`}
          >
            {row?.modes?.roadSafety?.is_active ? "Active" : "Inactive"}
          </span>
        );
      },
    },
    {
      Header: "Calender Sync",
      accessor: (row) => {
        return (
          <span
            className={`fw-normal text-${
              row?.modes?.syncCalender?.is_active ? "success" : "danger"
            }`}
          >
            {row?.modes?.syncCalender?.is_active ? "Active" : "Inactive"}
          </span>
        );
      },
    },
    {
      Header: "Status",
      accessor: (row) => {
        return (
          <span
            className={`fw-normal text-${row.isActive ? "success" : "danger"}`}
          >
            {row.isActive ? "Active" : "Inactive"}
          </span>
        );
      },
    },
    // {
    //   Header: "Action",
    //   accessor: (row) => {
    //     return (
    //       <React.Fragment>
    //         <span className="p-2" role={"button"}>
    //           <FontAwesomeIcon icon={faEye} className="me-2" />
    //         </span>
    //         <span className="p-2" role={"button"}>
    //           <FontAwesomeIcon icon={faEdit} className="me-2" />
    //         </span>
    //         <span className="p-2 text-danger" role={"button"}>
    //           <FontAwesomeIcon icon={faTrashAlt} className="me-2" />
    //         </span>
    //       </React.Fragment>
    //     );
    //   },
    // },
  ];
};

export const organizationCouponColumns = () => {
  return [
    {
      Header: "Code",
      accessor: (row) => {
        return row?.coupon_code ? row.coupon_code : "__";
      },
    },
    {
      Header: "Expired on",
      accessor: (row) => {
        return row?.expires_at ? row.expires_at : "__";
      },
    },
    {
      Header: "Plan",
      accessor: (row) => {
        return row?.subscription?.title ? row?.subscription?.title : "__";
      },
    },
    {
      Header: "Total Slots",
      accessor: (row) => {
        return <span>{row?.can_use_for ? row.can_use_for : "__"}</span>;
      },
    },
    {
      Header: "User Subscribed",
      accessor: (row) => {
        return 0;
      },
    },
    {
      Header: "Open Slots",
      accessor: (row) => {
        return 0;
      },
    },
    {
      Header: "Generated Date",
      accessor: "createdAt",
    },
    {
      Header: "Original Price",
      accessor: "subscription.original_price",
    },
    {
      Header: "Paid Price",
      accessor: "subscription.current_price",
    },
    {
      Header: "GST",
      accessor: (row) => {
        return row.subscription?.gst_percentage
          ? row.subscription?.gst_percentage
          : 0;
      },
    },
    {
      Header: "CESS",
      accessor: (row) => {
        return row.subscription?.cess_percentage
          ? row.subscription?.cess_percentage
          : 0;
      },
    },
  ];
};
