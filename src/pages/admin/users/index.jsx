import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { WCDataTable } from "../../../common/components/wc-datatable";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { useEmployee, useLoader } from "../../../common/hooks";
// import { removeUserCookies } from "../../../common/apis/base-api";
// import { useNavigate } from "react-router-dom";
// import { componentRoutes } from "../../../common/contants/component-routes";
import swal from "sweetalert";
import UserChangePlan from "./user-plan";
import { adminUsersColumns } from "../../../common/contants/data-columns";

const AdminUsers = () => {
  const { control } = useForm();
  // const navigate = useNavigate();
  const [isPlanVisible, setPlanVisible] = useState(false);
  const { loading } = useLoader();
  const { employees, getAllEmployees } = useEmployee();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  // const [statusChange, setstatusChange] = useState(false);
  // const onLogout = async () => {
  //   await removeUserCookies();
  //   navigate(componentRoutes.login);
  // };
  const onStatusChange = (e, value) => {
    let content = {
      element: "input",
      attributes: {
        placeholder: "Reason for Deactivate a user",
        type: "text",
      },
    };
    swal({
      title: "Are you sure?",
      text:
        e.target.value === "true"
          ? "You want to activate account?"
          : "You want to deactivate account?",
      icon: "warning",
      input: "text",
      content: e.target.value === "false" && content,
      dangerMode: true,
      buttons: {
        confirm: "Yes",
        cancel: "No",
      },
    }).then((e, value) => console.log(value, e));
  };

  const columns = useMemo(
    () => adminUsersColumns(onStatusChange, control, setPlanVisible),
    [control]
  );

  useEffect(() => {
    getAllEmployees({ page, limit });
  }, [getAllEmployees, page, limit]);

  return loading ? (
    <WCPreLoader />
  ) : (
    <React.Fragment>
      <WCDataTable
        columns={columns}
        data={employees?.docs ? employees.docs : []}
        totalDocs={employees.totalDocs}
        pagingCounter={employees.pagingCounter}
        hasPreviousPage={employees.hasPrevPage}
        hasNextPage={employees.hasNextPage}
        totalPages={employees.totalPages}
        page={employees.page}
        onPageChange={setPage}
        title={"Employees"}
        limit={limit}
      />
      {isPlanVisible && (
        <UserChangePlan
          show={isPlanVisible}
          onClose={setPlanVisible.bind(this)}
        />
      )}
    </React.Fragment>
  );
};

export default AdminUsers;
