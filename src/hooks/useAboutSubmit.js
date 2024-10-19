import { SidebarContext } from "@/context/SidebarContext";
import AboutService from "@/services/AboutService";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const useAboutSubmit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const {
    toggleDrawer,
    isDrawerOpen,
    currentPage,
    toggleModal,
    limitData,
    toggleBulkDrawer,
    taxEdit,
    setTaxEdit,
  } = useContext(SidebarContext);
  const [bannerUrl, setBannerUrl] = useState(
    "https://res.cloudinary.com/dren3tno6/image/upload/v1697861271/product/6ES7512-1DK01-0AB0-480x480.jpg"
  );
  const [bannerTwoUrl, setBannerTwoUrl] = useState([
    "https://res.cloudinary.com/dren3tno6/image/upload/v1697861271/product/6ES7512-1DK01-0AB0-480x480.jpg",
    "https://res.cloudinary.com/dren3tno6/image/upload/v1697861271/product/6ES7512-1DK01-0AB0-480x480.jpg",
  ]);
  const [middleUrl, setMiddleUrl] = useState(
    "https://res.cloudinary.com/dren3tno6/image/upload/v1697861271/product/6ES7512-1DK01-0AB0-480x480.jpg"
  );
  
  const [teamUrl1, setTeamUrl1] = useState( );
  const [teamUrl, setTeamUrl] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamPosition, setTeamPosition] = useState("");
  const [aboutId, setAboutId] = useState("");

  const [ourTeam, setOurTeam] = useState([
    {
      mediaLink:
        "https://res.cloudinary.com/dren3tno6/image/upload/v1697861271/product/6ES7512-1DK01-0AB0-480x480.jpg",
      name: "Orla Dwyer",
      position: "Danien James",
    },
  ]);

  const handleAddMember = () => {
    let team = {
      mediaLink: teamUrl1,
      name: teamName,
      position: teamPosition,
    };
    setOurTeam([...ourTeam, team]);
    setValue("teamName1", "");
    setTeamName("");
    setValue("teamPosition1", "");
    setTeamPosition("");
  };

  const handleTeamName = (val) => {
    setValue("teamName1", val);
    setTeamName(val);
  };
  const handleTeamPosition = (val) => {
    setValue("teamPosition1", val);
    setTeamPosition(val);
  };

  const onSubmit = async (data) => {
    let AboutData = {
      id: aboutId && aboutId,
      bannerImage: bannerUrl,
      bannerTitle: "About",
      heading: data.title,
      shortDescription: data.description,
      productImage: bannerTwoUrl,
      socialInteraction: [
        {
          counting: data.LikeOneHeading,
          comment: data.LikeOneDec,
          description: data.LikeOnePara,
        },
        {
          counting: data.LikeTwoHeading,
          comment: data.LikeTwoDec,
          description: data.LikeTwoPara,
        },
      ],
      briefDescription: data.BriefDescription,
      centerImage: middleUrl,
      ourTeam: {
        teamDescription: data.teamDec,
        members: ourTeam,
      },
    };

    AboutService.postAbout(AboutData).then((res) => {
      if (res.success == true) {
        notifySuccess(res.message);
      } else {
        notifyError(res?.message);
      }
    });
  };

  const getAboutDetails = () => {
    AboutService.getAbout({ page: currentPage, limit: limitData }).then(
      (res) => {
        if (res?.success === true) {
          // notifySuccess(res?.message);
          setAboutId(res.result[0]._id);
          setBannerUrl(res.result[0].bannerImage);
          setValue("title", res.result[0].heading);
          setValue("description", res.result[0].shortDescription);
          setBannerTwoUrl(res.result[0].productImage);
          setValue(
            "LikeOneHeading",
            res.result[0].socialInteraction[0]?.comment
          );
          setValue("LikeOneDec", res.result[0].socialInteraction[0]?.counting);
          setValue(
            "LikeOnePara",
            res.result[0].socialInteraction[0]?.description
          );
          setValue(
            "LikeTwoHeading",
            res.result[0].socialInteraction[1]?.comment
          );
          setValue("LikeTwoDec", res.result[0].socialInteraction[1]?.counting);
          setValue(
            "LikeTwoPara",
            res.result[0].socialInteraction[1]?.description
          );
          setValue("BriefDescription", res.result[0].briefDescription);
          setMiddleUrl(res.result[0].centerImage);
          setValue("teamDec", res.result[0]?.ourTeam?.teamDescription);
          setValue("teamDec", res.result[0]?.ourTeam?.teamDescription);
          setOurTeam(res.result[0]?.ourTeam?.members);

          // setHomeResponse(res?.PromotionDetailsdData);
          // setHomePage(res?.Pagination);
        } else {
          notifyError(res?.message);
        }
      }
    );
  };

  return {
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
    handleTeamName,
    handleTeamPosition,
    handleAddMember,
    onSubmit,
    getAboutDetails,
  };
};

export default useAboutSubmit;
