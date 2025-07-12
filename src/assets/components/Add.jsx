import { useState } from "react";
import AddForm from "./AddDogForm";
import DeleteForm from "./DeleteForm";

const Add = () => {
  const [activeTab, setActiveTab] = useState("addForm");

  return (
    <section className="px-5 pt-20 lg:px-35">
      <div>
        {/* Tab Buttons */}
        <ul className="mb-4 flex  w-full flex-wrap border-b border-gray-200" role="tablist">
          <li className="w-1/2">
            <button
              onClick={() => setActiveTab("addForm")}
              className={`px-4 py-2 w-full rounded-t-md focus:outline-none ${
                activeTab === "addForm"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Add Form
            </button>
          </li>
          <li className="w-1/2">
            <button
              onClick={() => setActiveTab("deleteForm")}
              className={`ml-2 px-4 py-2 w-full rounded-t-md focus:outline-none ${
                activeTab === "deleteForm"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Delete Dog
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content mt-2 p-4 border border-t-0 rounded-b-md bg-white">
          {activeTab === "addForm" && (
            <div className="overflow-x-auto scrollbar">
              <AddForm />
            </div>
          )}
          {activeTab === "deleteForm" && (
                      <div className="overflow-x-auto scrollbar">

              <DeleteForm />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Add;
