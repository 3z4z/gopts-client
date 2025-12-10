import useAxios from "../../../../hooks/useAxios";
import useUsers from "../../../../hooks/useUsers";
import { useRef, useState } from "react";
import EmptyTableDataComponent from "../../../../components/Common/EmptyTableData/EmptyTableData";
import toast from "react-hot-toast";

export default function ManageUsersPage() {
  const [selectedRole, setSelectedRole] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useUsers({
    role: selectedRole,
    search: searchValue,
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const axios = useAxios();
  const updateStatusModalRef = useRef();
  const rejectReasonModalRef = useRef();
  const handleModalOpen = (user) => {
    setSelectedUser(user);
    updateStatusModalRef.current.showModal();
  };
  const showRejectReasonModal = (user) => {
    updateStatusModalRef.current.close();
    setSelectedUser(user);
    rejectReasonModalRef.current.showModal();
  };
  const handleApprove = async (user, status) => {
    const statusInfo = { status: status };
    await axios
      .patch(`/users/${user._id}`, statusInfo)
      .then(() => {
        refetch();
        toast.success("User approved successfully!");
        updateStatusModalRef.current.close();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message || "Something went wrong");
      });
  };
  const handleDecline = async (user, status) => {
    const statusInfo = { status: status };
    statusInfo.rejectionReason = {
      title: title,
      body: body,
    };
    await axios
      .patch(`/users/${user._id}`, statusInfo)
      .then(() => {
        refetch();
        rejectReasonModalRef.current.close();
        toast.success("User rejected successfully!");
        setBody("");
        setTitle("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <>
      <h4 className="text-2xl mb-4">Manage All Users</h4>
      <div className="flex max-sm:flex-col justify-between sm:gap-3 gap-4">
        <input
          type="search"
          className="input max-sm:w-full"
          placeholder="Search"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <select
          defaultValue={"Select user type"}
          className="select max-sm:w-full"
          onChange={(e) => {
            setSelectedRole(
              e.target.value === "Select user type" ? "" : e.target.value
            );
            refetch();
          }}
        >
          <option value="Select user type">Select user type</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Buyer">Buyer</option>
        </select>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : users.length > 0 ? (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
          <table className="table">
            <thead className="bg-base-300">
              <tr>
                <th>Sl no</th>
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
                          className="btn btn-sm btn-info btn-soft rounded-full border-info/20"
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
                            disabled={selectedUser?.status === "approved"}
                            className="btn btn-success px-4 rounded-full"
                            onClick={() =>
                              handleApprove(selectedUser, "approved")
                            }
                          >
                            Approve
                          </button>
                          <button
                            disabled={selectedUser?.status === "rejected"}
                            className="btn btn-error btn-outline rounded-full px-4"
                            onClick={() => showRejectReasonModal(selectedUser)}
                          >
                            Reject
                          </button>
                          <button
                            className="btn btn-neutral btn-outline rounded-full px-4"
                            onClick={() => updateStatusModalRef.current.close()}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </dialog>
                    <dialog ref={rejectReasonModalRef} className="modal">
                      <div className="modal-box">
                        <h4 className="text-xl font-bold mb-4">
                          Write the rejection reason
                        </h4>
                        <div className="fieldset mt-3">
                          <div className="mb-2">
                            <input
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              type="text"
                              placeholder="Rejection Reason"
                              className="input w-full"
                            />
                          </div>
                          <div className="mb-2">
                            <textarea
                              value={body}
                              onChange={(e) => setBody(e.target.value)}
                              className="textarea resize-none w-full"
                              rows={3}
                              placeholder="Add some detailed rejection reason"
                            ></textarea>
                          </div>
                          <div className="modal-action">
                            <button
                              className="btn btn-error rounded-full px-4"
                              onClick={() =>
                                handleDecline(selectedUser, "rejected")
                              }
                            >
                              Reject
                            </button>
                            <button
                              onClick={() =>
                                rejectReasonModalRef.current.close()
                              }
                              className="btn btn-neutral btn-outline rounded-full px-4"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyTableDataComponent data={"Users"} />
      )}
    </>
  );
}
