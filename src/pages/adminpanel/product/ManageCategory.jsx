import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboardTemplate from "../../../component/admindashboardcomponent/AdminDashboardTemplate";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [editState, setEditState] = useState({
    mainCategory: null,
    subCategory: null,
    subSubCategory: null,
    lavel3Category: null,
    lavel4Category: null,
  });
  const [editedValues, setEditedValues] = useState({
    mainCategory: "",
    subCategory: "",
    subSubCategory: "",
    lavel3Category: "",
    lavel4Category: "",
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

  const handleEdit = (
    type,
    index,
    subIndex = null,
    subSubIndex = null,
    lavel3Index = null,
    lavel4Index = null
  ) => {
    if (type === "mainCategory") {
      setEditState({
        mainCategory: index,
        subCategory: null,
        subSubCategory: null,
        lavel3Category: null,
        lavel4Category: null,
      });
      setEditedValues({ mainCategory: categories[index].mainCategory });
    } else if (type === "subCategory") {
      setEditState({
        mainCategory: null,
        subCategory: { index, subIndex },
        subSubCategory: null,
        lavel3Category: null,
        lavel4Category: null,
      });
      setEditedValues({
        subCategory: categories[index].subcategories[subIndex].name,
      });
    } else if (type === "subSubCategory") {
      setEditState({
        mainCategory: null,
        subCategory: null,
        subSubCategory: { index, subIndex, subSubIndex },
        lavel3Category: null,
        lavel4Category: null,
      });
      setEditedValues({
        subSubCategory:
          categories[index].subcategories[subIndex].subsubcategories[
            subSubIndex
          ].name,
      });
    } else if (type === "lavel3Category") {
      setEditState({
        mainCategory: null,
        subCategory: null,
        subSubCategory: null,
        lavel3Category: { index, subIndex, subSubIndex, lavel3Index },
        lavel4Category: null,
      });
      setEditedValues({
        lavel3Category:
          categories[index].subcategories[subIndex].subsubcategories[
            subSubIndex
          ].lavel3CategorySchema[lavel3Index].name,
      });
    } else if (type === "lavel4Category") {
      setEditState({
        mainCategory: null,
        subCategory: null,
        subSubCategory: null,
        lavel3Category: null,
        lavel4Category: {
          index,
          subIndex,
          subSubIndex,
          lavel3Index,
          lavel4Index,
        },
      });
      setEditedValues({
        lavel4Category:
          categories[index].subcategories[subIndex].subsubcategories[
            subSubIndex
          ].lavel3CategorySchema[lavel3Index].lavel4CategorySchema[lavel4Index]
            .name,
      });
    }
  };

  const handleSave = async (
    type,
    index,
    subIndex = null,
    subSubIndex = null,
    lavel3Index = null,
    lavel4Index = null
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
      } else if (type === "lavel3Category") {
        updatedCategory.subCategoryName =
          categories[index].subcategories[subIndex].name;
        updatedCategory.subSubCategoryName =
          categories[index].subcategories[subIndex].subsubcategories[
            subSubIndex
          ].name;
        updatedCategory.lavel3CategoryName =
          categories[index].subcategories[subIndex].subsubcategories[
            subSubIndex
          ].lavel3CategorySchema[lavel3Index].name;
        updatedCategory.newLavel3CategoryName = editedValues.lavel3Category;
      } else if (type === "lavel4Category") {
        updatedCategory.subCategoryName =
          categories[index].subcategories[subIndex].name;
        updatedCategory.subSubCategoryName =
          categories[index].subcategories[subIndex].subsubcategories[
            subSubIndex
          ].name;
        updatedCategory.lavel3CategoryName =
          categories[index].subcategories[subIndex].subsubcategories[
            subSubIndex
          ].lavel3CategorySchema[lavel3Index].name;
        updatedCategory.lavel4CategoryName =
          categories[index].subcategories[subIndex].subsubcategories[
            subSubIndex
          ].lavel3CategorySchema[lavel3Index].lavel4CategorySchema[
            lavel4Index
          ].name;
        updatedCategory.newLavel4CategoryName = editedValues.lavel4Category;
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
      lavel3Category: null,
      lavel4Category: null,
    });
  };

  const handleCancel = () => {
    setEditState({
      mainCategory: null,
      subCategory: null,
      subSubCategory: null,
      lavel3Category: null,
      lavel4Category: null,
    });
  };

  const handleDelete = async (
    type,
    index,
    subIndex = null,
    subSubIndex = null,
    lavel3Index = null,
    lavel4Index = null
  ) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) {
      return; // Exit the function if user cancels the confirmation
    }
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
      } else if (type === "lavel3Category") {
        categoryToDelete.subCategoryName =
          categories[index].subcategories[subIndex].name;
        categoryToDelete.subSubCategoryName =
          categories[index].subcategories[subIndex].subsubcategories[
            subSubIndex
          ].name;
        categoryToDelete.lavel3CategoryName =
          categories[index].subcategories[subIndex].subsubcategories[
            subSubIndex
          ].lavel3CategorySchema[lavel3Index].name;
      } else if (type === "lavel4Category") {
        categoryToDelete.subCategoryName =
          categories[index].subcategories[subIndex].name;
        categoryToDelete.subSubCategoryName =
          categories[index].subcategories[subIndex].subsubcategories[
            subSubIndex
          ].name;
        categoryToDelete.lavel3CategoryName =
          categories[index].subcategories[subIndex].subsubcategories[
            subSubIndex
          ].lavel3CategorySchema[lavel3Index].name;
        categoryToDelete.lavel4CategoryName =
          categories[index].subcategories[subIndex].subsubcategories[
            subSubIndex
          ].lavel3CategorySchema[lavel3Index].lavel4CategorySchema[
            lavel4Index
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
      <div className="w-[98%]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row p-4 bg-[#191C20] text-white font-bold lg:text-[10px] xlg:text-xs">
            <div className="text-[#CCCCCC] flex-1">Category Name</div>
            <div className="text-[#ED9C27] flex-1">Sub Category Name</div>
            <div className="text-[#C85BFB] flex-1">Sub-Sub Category Name</div>
            <div className="text-[#FF5733] flex-1">3rd Level Category</div>
            <div className="text-[#33FFBD] flex-1">4th Level Category</div>
            <div className="text-[#CCCCCC] flex-1">Actions</div>
          </div>
          <div className="flex flex-col bg-[#191C20] h-screen no-scrollbar overflow-auto">
            {categories.map((category, index) => (
              <div
                key={index}
                className="border-b border-[#2E2F32] lg:text-[10px] xlg:text-xs"
              >
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
                      <div className="flex-1"></div>
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
                            <div className="flex-1"></div>
                            <div className="flex-1"></div>

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

                          {/* Add 3rd Level Category */}
                          {subsubcategory.lavel3CategorySchema.map(
                            (lavel3, lavel3Index) => (
                              <div key={lavel3Index}>
                                <div className="flex-row flex px-4 py-2 border-b border-[#2E2F32]">
                                  <div className="flex-1"></div>
                                  <div className="flex-1"></div>
                                  <div className="flex-1"></div>
                                  <div className="text-[#FF5733] flex-1">
                                    {editState.lavel3Category &&
                                    editState.lavel3Category.index === index &&
                                    editState.lavel3Category.subIndex ===
                                      subIndex &&
                                    editState.lavel3Category.subSubIndex ===
                                      subSubIndex &&
                                    editState.lavel3Category.lavel3Index ===
                                      lavel3Index ? (
                                      <input
                                        type="text"
                                        value={editedValues.lavel3Category}
                                        onChange={(e) =>
                                          setEditedValues({
                                            ...editedValues,
                                            lavel3Category: e.target.value,
                                          })
                                        }
                                      />
                                    ) : (
                                      lavel3.name
                                    )}
                                  </div>
                                  <div className="flex-1"></div>

                                  <div className="flex flex-row items-center gap-5 flex-1">
                                    {editState.lavel3Category &&
                                    editState.lavel3Category.index === index &&
                                    editState.lavel3Category.subIndex ===
                                      subIndex &&
                                    editState.lavel3Category.subSubIndex ===
                                      subSubIndex &&
                                    editState.lavel3Category.lavel3Index ===
                                      lavel3Index ? (
                                      <>
                                        <button
                                          className="text-[#5BC0DE]"
                                          onClick={() =>
                                            handleSave(
                                              "lavel3Category",
                                              index,
                                              subIndex,
                                              subSubIndex,
                                              lavel3Index
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
                                              "lavel3Category",
                                              index,
                                              subIndex,
                                              subSubIndex,
                                              lavel3Index
                                            )
                                          }
                                        >
                                          Edit
                                        </button>
                                        <button
                                          className="text-[#D53F3A]"
                                          onClick={() =>
                                            handleDelete(
                                              "lavel3Category",
                                              index,
                                              subIndex,
                                              subSubIndex,
                                              lavel3Index
                                            )
                                          }
                                        >
                                          Delete
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>

                                {/* Add 4th Level Category */}
                                {lavel3.lavel4CategorySchema.map(
                                  (lavel4, lavel4Index) => (
                                    <div
                                      key={lavel4Index}
                                      className="flex-row flex px-4 py-2 border-b border-[#2E2F32]"
                                    >
                                      <div className="flex-1"></div>
                                      <div className="flex-1"></div>
                                      <div className="flex-1"></div>
                                      <div className="flex-1"></div>
                                      <div className="text-[#33FFBD] flex-1">
                                        {editState.lavel4Category &&
                                        editState.lavel4Category.index ===
                                          index &&
                                        editState.lavel4Category.subIndex ===
                                          subIndex &&
                                        editState.lavel4Category.subSubIndex ===
                                          subSubIndex &&
                                        editState.lavel4Category.lavel3Index ===
                                          lavel3Index &&
                                        editState.lavel4Category.lavel4Index ===
                                          lavel4Index ? (
                                          <input
                                            type="text"
                                            value={editedValues.lavel4Category}
                                            onChange={(e) =>
                                              setEditedValues({
                                                ...editedValues,
                                                lavel4Category: e.target.value,
                                              })
                                            }
                                          />
                                        ) : (
                                          lavel4.name
                                        )}
                                      </div>
                                      <div className="flex flex-row items-center gap-5 flex-1">
                                        {editState.lavel4Category &&
                                        editState.lavel4Category.index ===
                                          index &&
                                        editState.lavel4Category.subIndex ===
                                          subIndex &&
                                        editState.lavel4Category.subSubIndex ===
                                          subSubIndex &&
                                        editState.lavel4Category.lavel3Index ===
                                          lavel3Index &&
                                        editState.lavel4Category.lavel4Index ===
                                          lavel4Index ? (
                                          <>
                                            <button
                                              className="text-[#5BC0DE]"
                                              onClick={() =>
                                                handleSave(
                                                  "lavel4Category",
                                                  index,
                                                  subIndex,
                                                  subSubIndex,
                                                  lavel3Index,
                                                  lavel4Index
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
                                                  "lavel4Category",
                                                  index,
                                                  subIndex,
                                                  subSubIndex,
                                                  lavel3Index,
                                                  lavel4Index
                                                )
                                              }
                                            >
                                              Edit
                                            </button>
                                            <button
                                              className="text-[#D53F3A]"
                                              onClick={() =>
                                                handleDelete(
                                                  "lavel4Category",
                                                  index,
                                                  subIndex,
                                                  subSubIndex,
                                                  lavel3Index,
                                                  lavel4Index
                                                )
                                              }
                                            >
                                              Delete
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            )
                          )}
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
