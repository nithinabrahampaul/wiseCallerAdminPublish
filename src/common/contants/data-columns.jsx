import {
  faBan,
  faDownload,
  faEye,
  faPencilAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Image } from "react-bootstrap";
import { staticPageOptions } from "./selectables";
// import { faEdit, faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const organizationEmployeeColumns = (
  onPlanRevoke,
  subscriptions,
  onHandleSendNotification,
  onGenerateInvoice,
  onHandleViewDetails
) => {
  return [
    {
      Header: "First Name",
      accessor: (row) => {
        return <span>{row.email ? row.first_name : "__"}</span>;
      },
    },
    {
      Header: "Last Name",
      accessor: (row) => {
        return <span>{row.email ? row.last_name : "__"}</span>;
      },
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
      Header: "Registered Date",
      accessor: "createdAt",
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
    {
      Header: "Action",
      accessor: (row) => {
        return (
          <React.Fragment>
            {/* <Button
              size="sm"
              style={{ marginRight: 5 }}
              onClick={onPlanRevoke.bind(this, row)}
            >
              {"Revoke"}
            </Button> */}
            <Button
              size="sm"
              onClick={onHandleViewDetails.bind(this, row)}
              style={{ marginRight: 5 }}
            >
              {"View"}
            </Button>
            <Button
              size="sm"
              onClick={onHandleSendNotification.bind(this, row)}
              style={{ marginRight: 5 }}
            >
              {"Send Notification"}
            </Button>
            {/* <Button
              size="sm"
              disabled={
                row?.organization_subscription ||
                row?.organization_subscription === null ||
                !row?.used_subscription
              }
              onClick={onGenerateInvoice.bind(this, { user_id: row._id })}
            >
              {"Download Invoice"}
            </Button> */}
          </React.Fragment>
        );
      },
    },
  ];
};

export const organizationCouponColumns = (onDeactivateCoupon) => {
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
        return row?.can_use_for ? row.can_use_for : "0";
      },
    },
    {
      Header: "User Subscribed",
      accessor: (row) => {
        return row?.used_subscription ? row.used_subscription : "0";
      },
    },
    {
      Header: "Open Slots",
      accessor: (row) => {
        return row?.can_use_for && row?.used_subscription
          ? row.can_use_for - row?.used_subscription
          : "0";
      },
    },
    {
      Header: "Generated Date",
      accessor: "createdAt",
    },
    {
      Header: "Price",
      accessor: "subscription.price",
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
    {
      Header: "Action",
      accessor: (row) => {
        return (
          <React.Fragment>
            <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faBan}
                className="me-2"
                onClick={onDeactivateCoupon.bind(this, row._id)}
              />
            </span>
          </React.Fragment>
        );
      },
    },
  ];
};

export const adminUsersColumns = (
  onHandleDeactivateUser,
  onHandlePlanChange,
  onHandleSendNotification,
  onGenerateInvoice,
  onHandleViewDetails,
  filters
) => {
  return [
    {
      Header: "First Name",
      accessor: (row) => row.first_name || "__",
    },
    {
      Header: "Last Name",
      accessor: (row) => row.last_name || "__",
    },
    {
      Header: "Phone Number",
      accessor: "phone",
    },
    {
      Header: "Email",
      accessor: (row) => row.email || "__",
    },
    {
      Header: "Secondary Phone",
      accessor: (row) => row.secondary_no || "__",
    },
    {
      Header: "Registered Date",
      accessor: (row) => row?.createdAt || "__",
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
              row?.modes?.syncCalender?.calenders?.length ? "success" : "danger"
            }`}
          >
            {row?.modes?.syncCalender?.calenders?.length
              ? "Active"
              : "Inactive"}
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
    {
      Header: "Action",
      accessor: (row) => {
        return (
          <React.Fragment>
            <Button
              size="sm"
              variant="primary"
              onClick={onHandleViewDetails.bind(this, row)}
              style={{ marginRight: 5 }}
            >
              {"View"}
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={onHandleDeactivateUser.bind(this, row.isActive, row._id)}
              style={{ marginRight: 5 }}
            >
              {"Deactivate"}
            </Button>
            <Button
              size="sm"
              onClick={onHandleSendNotification.bind(this, row)}
              style={{ marginRight: 5 }}
            >
              {"Send Notification"}
            </Button>
          </React.Fragment>
        );
      },
    },
  ];
};

export const adminOrganizationColumns = (onHandleOperations) => {
  return [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Contact Name",
      accessor: (row) => row?.contact_information?.name || "__",
    },
    {
      Header: "Phone",
      accessor: (row) => row?.contact_information?.phone_no || "__",
    },
    {
      Header: "Email",
      accessor: (row) => row?.contact_information?.email || "__",
    },
    {
      Header: "GST",
      accessor: (row) => row?.gst || "__",
    },
    {
      Header: "PAN",
      accessor: (row) => row?.pan || "__",
    },
    {
      Header: "Created On",
      accessor: (row) => row?.createdAt || "__",
    },
    {
      Header: "Payment",
      accessor: (row) => (
        <Button
          size="sm"
          style={{ marginRight: 5 }}
          onClick={onHandleOperations.bind(this, "regenerate", row)}
        >
          Regenerate
        </Button>
      ),
    },
    {
      Header: "Action",
      accessor: (row) => {
        return (
          <React.Fragment>
            <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faPencilAlt}
                className="me-2"
                onClick={onHandleOperations.bind(this, "edit", row)}
              />
            </span>
            <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faTrash}
                className="me-2 text-danger"
                onClick={onHandleOperations.bind(this, "delete", row)}
              />
            </span>
          </React.Fragment>
        );
      },
    },
  ];
};

export const adminSubscriptionColumns = (onHandleOperations) => {
  return [
    {
      Header: "Name",
      accessor: "title",
    },
    {
      Header: "Duration",
      accessor: (row) => `${row.duration ? row.duration : 0} Months`,
    },
    {
      Header: "Price",
      accessor: (row) => `₹${row.price ? row.price : 0}`,
    },
    {
      Header: "Discount",
      accessor: (row) => `${row.discount ? row.discount : 0}%`,
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "GST",
      accessor: (row) => `${row.gst_percentage ? row.gst_percentage : 0}%`,
    },
    {
      Header: "CESS",
      accessor: (row) => `${row.cess_percentage ? row.cess_percentage : 0}%`,
    },
    {
      Header: "Action",
      accessor: (row) => {
        return (
          <React.Fragment>
            <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faPencilAlt}
                className="me-2"
                onClick={onHandleOperations.bind(this, "update", row)}
              />
            </span>
            <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faTrash}
                className="me-2 text-danger"
                onClick={onHandleOperations.bind(this, "delete", row)}
              />
            </span>
          </React.Fragment>
        );
      },
    },
  ];
};

export const adminStatusColumns = (onHandleOperations) => {
  return [
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Icon Style",
      accessor: "icon_style",
    },
    {
      Header: "Action",
      accessor: (row) => {
        return (
          <React.Fragment>
            <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faPencilAlt}
                className="me-2"
                onClick={onHandleOperations.bind(this, "update", row)}
              />
            </span>
            <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faTrash}
                className="me-2 text-danger"
                onClick={onHandleOperations.bind(this, "delete", row)}
              />
            </span>
          </React.Fragment>
        );
      },
    },
  ];
};

export const adminCouponColumns = (onDeactivateCoupon, onPlanChange) => {
  return [
    {
      Header: "Name",
      accessor: (row) => {
        return row?.coupon_code ? row.coupon_code : "__";
      },
    },
    {
      Header: "Type",
      accessor: (row) => {
        return row?.type ? row.type : "__";
      },
    },
    {
      Header: "Total Slots",
      accessor: (row) => {
        return row?.can_use_for ? row.can_use_for : "0";
      },
    },
    {
      Header: "User Subscribed",
      accessor: (row) => {
        return row?.used_subscription ? row.used_subscription : "0";
      },
    },
    {
      Header: "Open Slots",
      accessor: (row) => {
        return row?.can_use_for && row?.used_subscription
          ? row.can_use_for - row?.used_subscription
          : "0";
      },
    },
    {
      Header: "Organization",
      accessor: (row) => {
        return row?.organization ? row?.organization?.name : "__";
      },
    },
    {
      Header: "Subscription",
      accessor: (row) => {
        return row?.subscription ? row?.subscription?.title : "__";
      },
    },
    {
      Header: "Action",
      accessor: (row) => {
        return (
          <React.Fragment>
            <Button size="sm" variant="primary" style={{ marginRight: 5 }}>
              {"Download"}
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={onDeactivateCoupon.bind(this, row._id, row?.is_active)}
              style={{ marginRight: 5 }}
            >
              {row?.is_active ? "Deactivate" : "Activate"}
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={onPlanChange.bind(this, row)}
              style={{ marginRight: 5 }}
              disabled={row?.type === "CASH_DISCOUNT"}
            >
              {"Change Plan"}
            </Button>
          </React.Fragment>
        );
      },
    },
  ];
};

export const adminNotesColumns = (onHandleOperations) => {
  return [
    {
      Header: "Text",
      accessor: "text",
    },
    {
      Header: "Type",
      accessor: "type",
    },
    // {
    //   Header: "Custom Status",
    //   accessor: (row) => {
    //     return (
    //       <span
    //         className={`fw-normal text-${row.is_custom ? "success" : "danger"}`}
    //       >
    //         {row.is_custom ? "Active" : "Inactive"}
    //       </span>
    //     );
    //   },
    // },
    // {
    //   Header: "Auto SMS",
    //   accessor: (row) => (
    //     <span
    //       className={`fw-normal text-${row.auto_sms ? "success" : "danger"}`}
    //     >
    //       {row?.auto_sms ? "Active" : "Inactive"}
    //     </span>
    //   ),
    // },
    {
      Header: "Action",
      accessor: (row) => {
        return (
          <React.Fragment>
            <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faPencilAlt}
                className="me-2"
                onClick={onHandleOperations.bind(this, "update", row)}
              />
            </span>
            <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faTrash}
                className="me-2 text-danger"
                onClick={onHandleOperations.bind(this, "delete", row)}
              />
            </span>
          </React.Fragment>
        );
      },
    },
  ];
};

export const adminPagesColumns = (onHandleOperations) => {
  return [
    {
      Header: "Name",
      accessor: (row) => {
        return staticPageOptions.find((item) => item.value === row.name).label;
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
    {
      Header: "Action",
      accessor: (row) => {
        return (
          <React.Fragment>
            <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faEye}
                className="me-2"
                onClick={onHandleOperations.bind(this, "view", row)}
              />
            </span>
            <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faPencilAlt}
                className="me-2"
                onClick={onHandleOperations.bind(this, "update", row)}
              />
            </span>
            <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faTrash}
                className="me-2 text-danger"
                onClick={onHandleOperations.bind(this, "delete", row)}
              />
            </span>
          </React.Fragment>
        );
      },
    },
  ];
};

export const adminGlobalTypesColumns = (onHandleOperations) => {
  return [
    {
      Header: "Name",
      accessor: "type",
    },
    {
      Header: "Action",
      Cell: ({ row }) => {
        return !row.depth ? (
          <React.Fragment>
            <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faPencilAlt}
                className="me-2"
                onClick={onHandleOperations.bind(this, "update", row.original)}
              />
            </span>
            <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faTrash}
                className="me-2 text-danger"
                onClick={onHandleOperations.bind(this, "delete", row.original)}
              />
            </span>
          </React.Fragment>
        ) : null;
      },
    },
  ];
};

export const adminPlanColumns = (onHandleOperations) => {
  return [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Subscription",
      accessor: "subscription.title",
    },
    {
      Header: "Price",
      accessor: "amount",
    },
    {
      Header: "Discount Price",
      accessor: "discount",
    },
    {
      Header: "Minimum Slot",
      accessor: "minSlab",
    },
    {
      Header: "Maximum Slot",
      accessor: "maxSlab",
    },
    {
      Header: "Action",
      accessor: (row) => {
        return (
          <React.Fragment>
            <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faPencilAlt}
                className="me-2"
                onClick={onHandleOperations.bind(this, "update", row)}
              />
            </span>
            <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faTrash}
                className="me-2 text-danger"
                onClick={onHandleOperations.bind(this, "delete", row)}
              />
            </span>
          </React.Fragment>
        );
      },
    },
  ];
};

export const adminTemplateColumns = (onHandleOperations) => {
  return [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Section",
      accessor: "section",
    },
    {
      Header: "Template",
      accessor: (row) => {
        return (
          <React.Fragment>
            <Image src={row.template} style={{ height: "70px" }} />
          </React.Fragment>
        );
      },
    },
    {
      Header: "Action",
      accessor: (row) => {
        return (
          <React.Fragment>
            <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faPencilAlt}
                className="me-2"
                onClick={onHandleOperations.bind(this, "update", row)}
              />
            </span>
            <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faTrash}
                className="me-2 text-danger"
                onClick={onHandleOperations.bind(this, "delete", row)}
              />
            </span>
          </React.Fragment>
        );
      },
    },
  ];
};

export const organizationTemplateColumns = (onHandleOperations) => {
  return [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Section",
      accessor: "section",
    },
    {
      Header: "Template",
      accessor: (row) => {
        return (
          <React.Fragment>
            <Image src={row.template} style={{ height: "70px" }} />
          </React.Fragment>
        );
      },
    },
    {
      Header: "Action",
      accessor: (row) => {
        return (
          <React.Fragment>
            <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faDownload}
                className="me-2"
                onClick={onHandleOperations.bind(this, "download", row)}
              />
            </span>
            {/* <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faTrash}
                className="me-2 text-danger"
                onClick={onHandleOperations.bind(this, "delete", row)}
              />
            </span> */}
          </React.Fragment>
        );
      },
    },
  ];
};

export const adminSubStatusColumns = (onHandleOperations) => {
  return [
    {
      Header: "Name",
      accessor: "status",
    },
    {
      Header: "Icon Style",
      accessor: "icon_style",
    },
    {
      Header: "Action",
      accessor: (row) => {
        return (
          <React.Fragment>
            <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faPencilAlt}
                className="me-2"
                onClick={onHandleOperations.bind(this, "update", row)}
              />
            </span>
            <span className="p-2" role={"button"}>
              <FontAwesomeIcon
                icon={faTrash}
                className="me-2 text-danger"
                onClick={onHandleOperations.bind(this, "delete", row)}
              />
            </span>
          </React.Fragment>
        );
      },
    },
  ];
};
