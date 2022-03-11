import {
  faBan,
  faEye,
  faPencilAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";
import { WCFormSelect } from "../components/wc-formselect";
import { statusOptions } from "./selectables";
// import { faEdit, faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const organizationEmployeeColumns = (
  onPlanRevoke,
  onSendNotification
) => {
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
    {
      Header: "Action",
      accessor: (row) => {
        return (
          <React.Fragment>
            <Button
              size="sm"
              style={{ marginRight: 5 }}
              onClick={onPlanRevoke.bind(this, row)}
            >
              {"Revoke"}
            </Button>
            <Button size="sm" onClick={onSendNotification}>
              {"Send Notification"}
            </Button>
          </React.Fragment>
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

export const adminUsersColumns = (onStatusChange, control, setPlanVisible) => {
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
      Header: "Subscription Plan",
      accessor: (row) => row?.organization_subscription?.subscription || "__",
    },
    {
      Header: "Expiry organization Plan",
      accessor: (row) =>
        row?.organization_subscription?.subscription_end_date || "__",
    },
    {
      Header: "Redeem Coupon",
      accessor: (row) => row?.organization_subscription?.coupon_code || "__",
    },
    {
      Header: "Registered Date",
      accessor: (row) => row?.createdAt || "__",
    },
    {
      Header: "Work life",
      accessor: (row) => row?.modes?.workLifeBalance?.is_active || "__",
    },
    {
      Header: "Road Safety",
      accessor: (row) => row?.modes?.roadSafety?.is_active || "__",
    },
    // {
    //   Header: "Calendar",
    //   accessor: (row) => row?.modes?.syncCalender?.status || "__",
    // },
    {
      Header: "Custom Status",
      accessor: (row) =>
        row?.user_status?.status?.status_notes?.is_custom
          ? row?.user_status?.status?.status_notes?.text
          : "__",
    },
    {
      Header: "Status",
      accessor: (row) => {
        return (
          <WCFormSelect
            name="status"
            control={control}
            options={statusOptions}
            size={"sm"}
            style={{ paddingRight: "30px", width: "inherit" }}
            onChange={onStatusChange.bind(this)}
            defaultValue={row.isActive}
          />
        );
      },
    },
    {
      Header: "Action",
      accessor: (row) => {
        return (
          <>
            <Button
              size="sm"
              variant="primary"
              onClick={setPlanVisible.bind(this, true)}
              disabled={row?.organization_subscription ? true : false}
            >
              {"Plan"}
            </Button>
          </>
        );
      },
    },
  ];
};

export const adminOrganizationColumns = () => {
  return [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Contant Name",
      accessor: (row) => row?.contact_information?.name || "__",
    },
    {
      Header: "Phone",
      accessor: (row) => row?.contact_information?.phone_no || "__",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "GST",
      accessor: (row) => row?.gst || "__",
    },
    {
      Header: "Email Id",
      accessor: (row) => row?.email || "__",
    },
    // {
    //   Header: "Coupon Codes",
    //   accessor: "00",
    // },
    // {
    //   Header: "Active Slots",
    //   accessor: 0,
    // },
    // {
    //   Header: "total Slots",
    //   accessor: 0,
    // },
    // {
    //   Header: "Free Slots",
    //   accessor: 0,
    // },
    // {
    //   Header: "Subscriptions",
    //   accessor: (row) => row?.email || "__",
    // },
    // {
    //   Header: "Action",
    //   accessor: (row) => {
    //     return (
    //       <Dropdown as={ButtonGroup}>
    //         <Dropdown.Toggle
    //           as={Button}
    //           split
    //           variant="link"
    //           className="text-dark m-0 p-0"
    //         >
    //           <span className="icon icon-sm">
    //             <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
    //           </span>
    //         </Dropdown.Toggle>
    //         <Dropdown.Menu>
    //           <Dropdown.Item>
    //             <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
    //           </Dropdown.Item>
    //           <Dropdown.Item>
    //             <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
    //           </Dropdown.Item>
    //           <Dropdown.Item className="text-danger">
    //             <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
    //           </Dropdown.Item>
    //         </Dropdown.Menu>
    //       </Dropdown>
    //     );
    //   },
    // },
    //   {
    //     Header: "Coupons",
    //     accessor: (row) => "__",
    //   },
    //   {
    //     Header: "Free Slots",
    //     accessor: (row) => "__",
    //   },
    //   {
    //     Header: "Active Slots",
    //     accessor: (row) => "__",
    //   },
    //   {
    //     Header: "Total Slots",
    //     accessor: (row) => "__",
    //   },
  ];
};

export const adminSubscriptionColumns = () => {
  return [
    {
      Header: "Name",
      accessor: "title",
    },
    {
      Header: "Duration",
      accessor: (row) => `${row.duration} Months`,
    },
    {
      Header: "Price",
      accessor: (row) => `₹${row.original_price}`,
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "GST",
      accessor: (row) => `${row.gst_percentage}%`,
    },
    {
      Header: "CESS",
      accessor: (row) => `${row.cess_percentage}%`,
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
      Header: "Order",
      accessor: "order",
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
    {
      Header: "Custom Status",
      accessor: (row) => {
        return (
          <span
            className={`fw-normal text-${row.is_custom ? "success" : "danger"}`}
          >
            {row.is_custom ? "Active" : "Inactive"}
          </span>
        );
      },
    },
    {
      Header: "Auto SMS",
      accessor: (row) => (
        <span
          className={`fw-normal text-${row.auto_sms ? "success" : "danger"}`}
        >
          {row?.auto_sms ? "Active" : "Inactive"}
        </span>
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
      accessor: "name",
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
