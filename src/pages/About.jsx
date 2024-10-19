import LabelArea from "@/components/form/LabelArea";
import Uploader from "@/components/image-uploader/Uploader";
import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  TableCell,
  TableContainer,
  TableHeader,
  Textarea,
  Table,
} from "@windmill/react-ui";
import Title from "@/components/form/Title";
import Error from "@/components/form/Error";
import InputArea from "@/components/form/InputArea";
import DrawerButton from "@/components/form/DrawerButton";
import InputValue from "@/components/form/InputValue";
import { FaPlus } from "react-icons/fa6";
import useAboutSubmit from "@/hooks/useAboutSubmit";

const About = () => {
  const [imageUrl, setImageUrl] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    errors,
    bannerUrl,
    setBannerUrl,
    bannerTwoUrl,
    setBannerTwoUrl,
    ourTeam,
    setOurTeam,
    setTeamUrl,
    middleUrl,
    setMiddleUrl,
    teamUrl1,
    setTeamUrl1,
    teamName,
    teamPosition,
    onSubmit,
    handleTeamName,
    handleTeamPosition,
    handleAddMember,
    getAboutDetails,
    // handleDeleteMember,
  } = useAboutSubmit();
  useEffect(() => {
    getAboutDetails();
  }, [])
  const handleDeleteMember = (index) => {
    const updatedTeam = [...ourTeam];
    updatedTeam.splice(index, 1);
    setOurTeam(updatedTeam);
  };
  return (
    <div>
      <>
        <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">About us</h1>
        <br />
        <form onSubmit={handleSubmit(onSubmit)} className="block" id="block">

          <div className="w-full">
            <div className="col-span-8 sm:col-span-4">
              <Uploader
                // product  
                type="file" id="img" name="img" accept="image/*"
                folder="product"
                imageUrl={bannerUrl}
                setImageUrl={setBannerUrl}
              />
            </div>
          </div>


          <hr />
          <div className=" flex justify-around gap-2 p-1 w-full">
            <div className="grid  gap-3 w-full mb-6">
              {/* <LabelArea label={"welcome title"} /> */}

              <div className="col-span-8 sm:col-span-4">
                <Input
                  {...register(`title`, {
                    required: "required!",
                  })}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="title"
                  type="text"
                  placeholder={"welcome title"}
                // onBlur={(e) => handleProductSlug(e.target.value)}
                />
                <Error errorName={errors.title} />
              </div>
              <div className="col-span-8 sm:col-span-4">
                <Textarea
                  className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  {...register("description", {
                    required: false,
                  })}
                  name="description"
                  placeholder={"Product Description"}
                  rows="4"
                  spellCheck="false"
                />
                <Error errorName={errors.description} />
              </div>
              <div className="flex gap-1">
                <div>
                  <div className="col-span-8 pb-1 sm:col-span-4">
                    <Input
                      {...register(`LikeOneHeading`, {
                        required: "required!",
                      })}
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      name="LikeOneHeading"
                      type="text"
                      placeholder={"80 k"}
                    // onBlur={(e) => handleProductSlug(e.target.value)}
                    />
                    <Error errorName={errors.LikeOneHeading} />
                  </div>
                  <div className="col-span-8 pb-1 sm:col-span-4">
                    <Input
                      {...register(`LikeOneDec`, {
                        required: "required!",
                      })}
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      name="LikeOneDec"
                      type="text"
                      placeholder={"Lovely Customer"}
                    // onBlur={(e) => handleProductSlug(e.target.value)}
                    />
                    <Error errorName={errors.LikeOneDec} />
                  </div>
                  <div className="col-span-8 pb-1 sm:col-span-4">
                    <Input
                      {...register(`LikeOnePara`, {
                        required: "required!",
                      })}
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      name="LikeOnePara"
                      type="text"
                      placeholder={"about this"}
                    // onBlur={(e) => handleProductSlug(e.target.value)}
                    />
                    <Error errorName={errors.LikeOnePara} />
                  </div>
                </div>
                <div>
                  <div className="col-span-8 pb-1 sm:col-span-4">
                    <Input
                      {...register(`LikeTwoHeading`, {
                        required: " heading is required!",
                      })}
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      name="LikeTwoHeading"
                      type="text"
                      placeholder={"12k"}
                    // onBlur={(e) => handleProductSlug(e.target.value)}
                    />
                    <Error errorName={errors.LikeTwoHeading} />
                  </div>
                  <div className="col-span-8 pb-1 sm:col-span-4">
                    <Input
                      {...register(`LikeTwoDec`, {
                        required: "required!",
                      })}
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      name="LikeTwoDec"
                      type="text"
                      placeholder={"Listed Products"}
                    // onBlur={(e) => handleProductSlug(e.target.value)}
                    />
                    <Error errorName={errors.LikeTwoDec} />
                  </div>
                  <div className="col-span-8 pb-1 sm:col-span-4">
                    <Input
                      {...register(`LikeTwoPara`, {
                        required: "required!",
                      })}
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      name="LikeTwoPara"
                      type="text"
                      placeholder={"about this"}
                    // onBlur={(e) => handleProductSlug(e.target.value)}
                    />
                    <Error errorName={errors.LikeTwoPara} />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="col-span-8 sm:col-span-4">
                <Uploader
                  product
                  folder="product"
                  imageUrl={bannerTwoUrl}
                  setImageUrl={setBannerTwoUrl}
                />
              </div>
            </div>
          </div>
          <hr />

          <div className="col-span-8 py-2 sm:col-span-4">
            <Textarea
              className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              {...register("BriefDescription", {
                required: true,
              })}
              name="BriefDescription"
              placeholder={"Brief Description"}
              rows="4"
              spellCheck="false"
            />
            <Error errorName={errors.BriefDescription} />
          </div>

          <div className="col-span-8 sm:col-span-4">
            <Uploader
              // product
              folder="product"
              imageUrl={middleUrl}
              setImageUrl={setMiddleUrl}
            />
          </div>
          <hr />
          <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300"> Our Team</h1>

          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            {/* <LabelArea label={t("ProductTitleName")} /> */}
            <div className="col-span-8 sm:col-span-4">
              <Input
                {...register(`teamDec`, {
                  required: "TItle is required!",
                })}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                name="teamDec"
                type="text"
                placeholder={'"We’re impartial and independent..."'}
              // onBlur={(e) => handleProductSlug(e.target.value)}
              />
              <Error errorName={errors.teamDec} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {ourTeam.map((ele, i) => (
              <div key={i} className="max-w-sm shadow-md rounded p-2">
                <img
                  width={250}
                  height={250}
                  src={ele.mediaLink}
                  alt="team-1"
                  className="block rounded-lg "
                />
                <button
                  onClick={() => handleDeleteMember(i)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  Delete
                </button>
                <div className="py-4">
                  <h5 className="my-2 text-lg font-bold text-gray-700 dark:text-gray-300">
                    {ele.name}
                  </h5>
                  <span className="opacity-75 text-sm text-gray-700 dark:text-gray-300">{ele.position}</span>
                </div>
              </div>
            ))}
            <div className="w-300">
              <div className="col-span-8 sm:col-span-4">
                <Uploader
                  // product
                  folder="product"
                  imageUrl={teamUrl1}
                  setImageUrl={setTeamUrl1}
                />
              </div>
              <div className="col-span-8 pb-1 sm:col-span-4">
                <Input
                  {...register(`teamName1`, {
                    required: false,
                  })}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name={`teamName1`}
                  type="text"
                  defaultValue={teamName}
                  placeholder={"name"}
                  onBlur={(e) => handleTeamName(e.target.value)}
                />
              </div>
              <div className="col-span-8 pb-1 sm:col-span-4">
                <Input
                  {...register(`teamPosition1`, {
                    required: false,
                  })}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name={`teamPosition1`}
                  type="text"
                  defaultValue={teamPosition}
                  placeholder={"position"}
                  onBlur={(e) => handleTeamPosition(e.target.value)}
                />
              </div>
              {teamUrl1 &&
                <button
                  onClick={() => handleAddMember()}
                  className="w-300 bg-gray-100 border border-gray-200 rounded cursor-pointer dark:bg-bgBlack flex items-center justify-center py-3 text-green-400"
                >
                  <FaPlus />
                  Add member
                </button>
              }
            </div>
          </div>

          <div className="w-full flex justify-end  pb-3">
            <Button type="submit" 
            style={{ backgroundColor: "#f34d1b" }}
              className="w-200 m-3">
              submit
            </Button>
          </div>
        </form>
      </>
    </div>
  );
};

export default About;
