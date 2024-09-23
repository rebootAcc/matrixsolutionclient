import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboardTemplate from "../../../component/admindashboardcomponent/AdminDashboardTemplate";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [editState, setEditState] = useState({
    mainCategory: null,
    subCategory: null,
    subSubCategory: null,
  });
  const [editedValues, setEditedValues] = useState({
    mainCategory: "",
    subCategory: "",
    subSubCategory: "",
  });

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/categories/getcategory`
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (type, index, subIndex = null, subSubIndex = null) => {
    if (type === "mainCategory") {
      setEditState({
        mainCategory: index,
        subCategory: null,
        subSubCategory: null,
      });
      setEditedValues({ mainCategory: categories[index].mainCategory });
    } else if (type === "subCategory") {
      setEditState({
        mainCategory: null,
        subCategory: { index, subIndex },
        subSubCategory: null,
      });
      setEditedValues({
        subCategory: categories[index].subcategories[subIndex].name,
      });
    } else if (type === "subSubCategory") {
      setEditState({
        mainCategory: null,
        subCategory: null,
        subSubCategory: { index, subIndex, subSubIndex },
      });
      setEditedValues({
        subSubCategory:
          categories[index].subcategories[subIndex].subsubcategories[
            subSubIndex
          ].name,
      });
    }
  };

  const handleSave = async (
    type,
    index,
    subIndex = null,
    subSubIndex = null
  ) => {
    try {
      const updatedCategory = { mainCategory: categories[index].mainCategory };
      if (type === "mainCategory") {
        updatedCategory.newMainCategory = editedValues.mainCategory;
      } else if (type === "subCategory") {
        updatedCategory.subCategoryName =
          categories[index].subcategories[subIndex].name;
        updatedCategory.newSubCategoryName = editedValues.subCategory;
      } else if (type === "subSubCategory") {
        updatedCategory.subCategoryName =
          categories[index].subcategories[subIndex].name;
        updatedCategory.subSubCategoryName =
          categories[index].subcategories[subIndex].subsubcategories[
            subSubIndex
          ].name;
        updatedCategory.newSubSubCategoryName = editedValues.subSubCategory;
      }
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/categories/updatecategory`,
        updatedCategory
      );
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
    }
    setEditState({
      mainCategory: null,
      subCategory: null,
      subSubCategory: null,
    });
  };

  const handleCancel = () => {
    setEditState({
      mainCategory: null,
      subCategory: null,
      subSubCategory: null,
    });
  };

  const handleDelete = async (
    type,
    index,
    subIndex = null,
    subSubIndex = null
  ) => {
    try {
      const categoryToDelete = { mainCategory: categories[index].mainCategory };
      if (type === "subCategory") {
        categoryToDelete.subCategoryName =
          categories[index].subcategories[subIndex].name;
      } else if (type === "subSubCategory") {
        categoryToDelete.subCategoryName =
          categories[index].subcategories[subIndex].name;
        categoryToDelete.subSubCategoryName =
          categories[index].subcategories[subIndex].subsubcategories[
            subSubIndex
          ].name;
      }
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/categories/deletecategory`,
        { data: categoryToDelete }
      );
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <AdminDashboardTemplate>
      <div className="w-[90%]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row p-4 bg-[#191C20] text-white font-bold">
            <div className="text-[#CCCCCC] flex-1">Category Name</div>
            <div className="text-[#ED9C27] flex-1">Sub Category Name</div>
            <div className="text-[#C85BFB] flex-1">Sub-Sub Category Name</div>
            <div className="text-[#CCCCCC] flex-1">Actions</div>
          </div>
          <div className="flex flex-col bg-[#191C20] h-screen no-scrollbar overflow-auto">
            {categories.map((category, index) => (
              <div key={index} className="border-b border-[#2E2F32]">
                <div className="flex flex-row px-4 py-6">
                  <div className="text-[#CCCCCC] flex-1 font-bold">
                    {editState.mainCategory === index ? (
                      <input
                        type="text"
                        value={editedValues.mainCategory}
                        onChange={(e) =>
                          setEditedValues({
                            ...editedValues,
                            mainCategory: e.target.value,
                          })
                        }
                      />
                    ) : (
                      category.mainCategory
                    )}
                  </div>
                  <div className="flex-1"></div>
                  <div className="flex-1"></div>
                  <div className="flex flex-row items-center gap-5 flex-1">
                    {editState.mainCategory === index ? (
                      <>
                        <button
                          className="text-[#5BC0DE]"
                          onClick={() => handleSave("mainCategory", index)}
                        >
                          Save
                        </button>
                        <button
                          className="text-[#D53F3A]"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-[#5BC0DE]"
                          onClick={() => handleEdit("mainCategory", index)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-[#D53F3A]"
                          onClick={() => handleDelete("mainCategory", index)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
                {category.subcategories.map((subcategory, subIndex) => (
                  <div key={subIndex} className="">
                    <div className="flex flex-row px-4 py-3 border-b border-[#2E2F32]">
                      <div className="flex-1"></div>
                      <div className="text-[#ED9C27] flex-1">
                        {editState.subCategory &&
                        editState.subCategory.index === index &&
                        editState.subCategory.subIndex === subIndex ? (
                          <input
                            type="text"
                            value={editedValues.subCategory}
                            onChange={(e) =>
                              setEditedValues({
                                ...editedValues,
                                subCategory: e.target.value,
                              })
                            }
                          />
                        ) : (
                          subcategory.name
                        )}
                      </div>
                      <div className="flex-1"></div>
                      <div className="flex flex-row items-center gap-5 flex-1">
                        {editState.subCategory &&
                        editState.subCategory.index === index &&
                        editState.subCategory.subIndex === subIndex ? (
                          <>
                            <button
                              className="text-[#5BC0DE]"
                              onClick={() =>
                                handleSave("subCategory", index, subIndex)
                              }
                            >
                              Save
                            </button>
                            <button
                              className="text-[#D53F3A]"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="text-[#5BC0DE]"
                              onClick={() =>
                                handleEdit("subCategory", index, subIndex)
                              }
                            >
                              Edit
                            </button>
                            <button
                              className="text-[#D53F3A]"
                              onClick={() =>
                                handleDelete("subCategory", index, subIndex)
                              }
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    {subcategory.subsubcategories.map(
                      (subsubcategory, subSubIndex) => (
                        <div key={subSubIndex} className="">
                          <div className="flex flex-row px-4 py-2 border-b border-[#2E2F32]">
                            <div className="flex-1"></div>
                            <div className="flex-1"></div>
                            <div className="text-[#C85BFB] flex-1">
                              {editState.subSubCategory &&
                              editState.subSubCategory.index === index &&
                              editState.subSubCategory.subIndex === subIndex &&
                              editState.subSubCategory.subSubIndex ===
                                subSubIndex ? (
                                <input
                                  type="text"
                                  value={editedValues.subSubCategory}
                                  onChange={(e) =>
                                    setEditedValues({
                                      ...editedValues,
                                      subSubCategory: e.target.value,
                                    })
                                  }
                                />
                              ) : (
                                subsubcategory.name
                              )}
                            </div>
                            <div className="flex flex-row items-center gap-5 flex-1">
                              {editState.subSubCategory &&
                              editState.subSubCategory.index === index &&
                              editState.subSubCategory.subIndex === subIndex &&
                              editState.subSubCategory.subSubIndex ===
                                subSubIndex ? (
                                <>
                                  <button
                                    className="text-[#5BC0DE]"
                                    onClick={() =>
                                      handleSave(
                                        "subSubCategory",
                                        index,
                                        subIndex,
                                        subSubIndex
                                      )
                                    }
                                  >
                                    Save
                                  </button>
                                  <button
                                    className="text-[#D53F3A]"
                                    onClick={handleCancel}
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    className="text-[#5BC0DE]"
                                    onClick={() =>
                                      handleEdit(
                                        "subSubCategory",
                                        index,
                                        subIndex,
                                        subSubIndex
                                      )
                                    }
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="text-[#D53F3A]"
                                    onClick={() =>
                                      handleDelete(
                                        "subSubCategory",
                                        index,
                                        subIndex,
                                        subSubIndex
                                      )
                                    }
                                  >
                                    Delete
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default ManageCategory;
