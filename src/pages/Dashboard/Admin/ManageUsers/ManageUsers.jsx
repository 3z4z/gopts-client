import { useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import userUsers from "../../../../hooks/userUsers";
import { useRef, useState } from "react";

export default function ManageUsersPage() {
  const { data: users = [], isLoading, refetch } = userUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const queryClient = useQueryClient();
  const axios = useAxios();
  const updateStatusModalRef = useRef();
  const handleModalOpen = (user) => {
    setSelectedUser(user);
    updateStatusModalRef.current.showModal();
  };
  const updateStatus = async (user, status) => {
    const statusInfo = { status: status };
    if (user?.status === "pending") {
      statusInfo.status = "approved";
    }
    if (user?.status === "approved") {
      statusInfo.status = "rejected";
    } else {
      statusInfo.status = "approved";
    }
    console.log(user?._id);
    await axios
      .patch(`/users/${user._id}`, statusInfo)
      .then(() => {
        refetch();
        queryClient.invalidateQueries(["user-status", user?.email]);
        updateStatusModalRef.current.close();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <h4 className="text-2xl mb-4">Manage All Users</h4>
      <p>Total users: {isLoading ? 0 : users.length}</p>
      <div className="flex justify-between">
        <input type="search" className="input" placeholder="Search" />
        <select defaultValue={"Select user type"} className="select">
          <option value="Select user type" disabled>
            Select user type
          </option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="buyer">Buyer</option>
        </select>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
        <table className="table">
          <thead className="bg-base-300">
            <tr>
              <th>Sl no.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="even:bg-base-200">
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <div
                    className={`badge badge-sm ${
                      user?.role === "Admin"
                        ? "badge-primary"
                        : user?.role === "Manager"
                        ? "badge-secondary"
                        : "badge-neutral"
                    }`}
                  >
                    {user.role}
                  </div>
                </td>
                <td
                  className={`capitalize ${
                    user?.status.toLowerCase() === "pending"
                      ? "text-warning"
                      : user?.status.toLowerCase() === "rejected"
                      ? "text-error"
                      : "text-success"
                  }`}
                >
                  {user.status}
                </td>
                <td>
                  <div className="flex">
                    {user?.role !== "Admin" && (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleModalOpen(user)}
                      >
                        Update User
                      </button>
                    )}
                  </div>
                  <dialog ref={updateStatusModalRef} className="modal">
                    <div className="modal-box">
                      <div className="flex gap-5">
                        <figure className="w-20 h-20">
                          <img src={selectedUser?.image} alt="" />
                        </figure>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xl text-primary">
                              {selectedUser?.name}
                            </h4>
                            <p className="badge badge-primary badge-soft badge-sm font-semibold">
                              {selectedUser?.role}
                            </p>
                          </div>
                          <p className="mb-3">{selectedUser?.email}</p>
                          <p>
                            Status:{" "}
                            <span className="font-bold capitalize">
                              {selectedUser?.status}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="modal-action">
                        <button
                          onClick={() =>
                            updateStatus(selectedUser, selectedUser?.status)
                          }
                          className="btn btn-primary"
                        >
                          {selectedUser?.status === "Pending"
                            ? "Approve"
                            : selectedUser?.status === "approved"
                            ? "Reject"
                            : "Approve"}
                        </button>
                      </div>
                    </div>
                  </dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
