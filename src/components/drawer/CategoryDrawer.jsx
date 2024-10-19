import { Input } from "@windmill/react-ui";

import Tree from "rc-tree";
import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";

//internal import
import { notifyError } from "@/utils/toast";
import Error from "@/components/form/Error";
import Title from "@/components/form/Title";
import InputArea from "@/components/form/InputArea";
import LabelArea from "@/components/form/LabelArea";
import SwitchToggle from "@/components/form/SwitchToggle";
import TextAreaCom from "@/components/form/TextAreaCom";
import Uploader from "@/components/image-uploader/Uploader";
import useCategorySubmit from "@/hooks/useCategorySubmit";
import CategoryServices from "@/services/CategoryServices";
import { showingTranslateValue } from "@/utils/translate";
import DrawerButton from "@/components/form/DrawerButton";
import ParentCategory from "../category/ParentCategory";
import useProductSubmit from "@/hooks/useProductSubmit";
import useAsync from "@/hooks/useAsync";

const CategoryDrawer = ({ id, lang }) => {
  const { data, loading } = useAsync(CategoryServices?.getAllCategory);
  const { t } = useTranslation();
  const {
    checked,
    register,
    onSubmit,
    handleSubmit,
    errors,
    imageUrl,
    setImageUrl,
    published,
    setPublished,
    setChecked,
    selectCategoryName,
    setSelectCategoryName,
    setSelectCategoryId,
    handleSelectLanguage,
    isSubmitting,
  } = useCategorySubmit(data, id);

  const {
    language,
    selectedCategory,
    setSelectedCategory,
    setDefaultCategory,
  } = useProductSubmit(id);


  console.log("CategoryDrawer=======>", data);

  const STYLE = `
  .rc-tree-child-tree {
    display: block;
  }
  .node-motion {
    transition: all .3s;
    overflow-y: hidden;
  }
`;

  const motion = {
    motionName: "node-motion",
    motionAppear: false,
    onAppearStart: (node) => {
      return { height: 0 };
    },
    onAppearActive: (node) => ({ height: node.scrollHeight }),
    onLeaveStart: (node) => ({ height: node.offsetHeight }),
    onLeaveActive: () => ({ height: 0 }),
  };

  const renderCategories = (data) => {
    let myCategories = [];
    if (data && data.length) {
      for (let category of data) {
        myCategories.push({
          title: category?.name,
          key: category?._id,
          children:
            category.children.length > 0 && renderCategories(category.children),
        });
      }
    } else if (data.categories && data.categories.length) {
      for (let category of data.categories) {
        myCategories.push({
          // title: showingTranslateValue(category?.name, lang),
          title: category?.name,
          key: category?._id,
          children:
            category.children.length > 0 && renderCategories(category.children),
        });
      }
    }
    return myCategories;
  };


  const findObject = (obj, target) => {
    console.log("categories obj", obj._id);
    return obj._id === target
      ? obj
      : obj?.children?.reduce(
        (acc, obj) => acc ?? findObject(obj, target),
        undefined
      );
  };

  const handleSelect = async (key) => {
    console.log('key', key, 'id', id);
    console.log( 'id', id);
    if (key === undefined) return;
    if (id) { 
      const parentCategoryId = await CategoryServices.getCategoryById(key);

      if (id === key) {
        return notifyError("This can't be select as a parent category!");
      } else if (id === parentCategoryId.parentId) {
        return notifyError("This can't be select as a parent category!");
      } else {
        if (key === undefined) return;
        setChecked(key);
        const categoryArray = data.categories;
        var result;
        for(let category of categoryArray){
          result = findObject(category, key); 
       }
         setSelectCategoryId(result?._id);
        setSelectCategoryName(result?.name);
      }
    }else{
      if (key === undefined) return;
      setChecked(key);
      const categoryArray = data.categories;
      var result;
      for(let category of categoryArray){
        result = findObject(category, key); 
     }
     setSelectCategoryId(result?._id);
      setSelectCategoryName(result?.name);
    }
  };

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateCategory")}
            description={t("UpdateCategoryDescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("AddCategoryTitle")}
            description={t("AddCategoryDescription")}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Name")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Category title"
                  name="name"
                  type="text"
                  placeholder={t("ParentCategoryPlaceholder")}
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Description")} />
              <div className="col-span-8 sm:col-span-4">
                <TextAreaCom
                  required
                  register={register}
                  label="Description"
                  name="description"
                  type="text"
                  placeholder="Category Description"
                />
                <Error errorName={errors.description} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("ParentCategory")} />

              <div className="col-span-8 sm:col-span-4 relative">
                <Input
                  readOnly
                  {...register(`parent`, {
                    required: false,
                  })}
                  name="parent"
                  value={selectCategoryName ? selectCategoryName : "Home"}
                  placeholder={t("ParentCategory")}
                  type="text"
                  className="border h-12 w-full text-sm focus:outline-none block bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
                {!loading && data !== undefined && (
                  <div className="draggable-demo capitalize">
                    <style dangerouslySetInnerHTML={{ __html: STYLE }} />
                    <Tree
                      expandAction="click"
                      treeData={renderCategories(data?.categories)}
                      selectedKeys={[checked]}
                      onSelect={(v) => handleSelect(v[0])}
                      motion={motion}
                      animation="slide-up"
                    />
                  </div>
                )}
              </div>

            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("CategoryIcon")} />
              <div className="col-span-8 sm:col-span-4">
                <Uploader
                  category
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  folder="category"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Published")} />
              <div className="col-span-8 sm:col-span-4">
                <SwitchToggle
                  handleProcess={setPublished}
                  processOption={published}
                />
              </div>
            </div>
          </div>

          {imageUrl &&
            <DrawerButton id={id} title="Category" isSubmitting={isSubmitting} />
          }
        </form>
      </Scrollbars>
    </>
  );
};

export default CategoryDrawer;
