import express from "express";
import { MemberControllers } from "./member.controller";
import validateRequest from "../../middlewares/validateRequest";
import { MemberValidations } from "./member.validation";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.get("/", MemberControllers.allMembers);

router.patch(
  "/:id/profile-picture",
  multerUpload.single("image"),
  MemberControllers.updateProfilePicture
);

router.patch(
  "/:id/cover-photo",
  multerUpload.single("image"),
  MemberControllers.updateCoverPhoto
);

router.patch(
  "/:id/bio",
  validateRequest(MemberValidations.updateBioValidationSchema),
  MemberControllers.updateBio
);

router.patch(
  "/:id/category",
  validateRequest(MemberValidations.updateCategoryValidationSchema),
  MemberControllers.updateCategory
);

router.patch(
  "/:id/personal-details",
  validateRequest(MemberValidations.updatePersonalDetailsValidationSchema),
  MemberControllers.updatePersonalDetails
);

router.patch(
  "/:id/work-info",
  validateRequest(MemberValidations.updateWorkInformationValidationSchema),
  MemberControllers.updateWorkInformation
);

router.patch(
  "/:id/education-info",
  validateRequest(MemberValidations.updateEducationInformationValidationSchema),
  MemberControllers.updateEducationInformation
);

router.patch(
  "/:id/hobbies",
  validateRequest(MemberValidations.updateHobbiesValidationSchema),
  MemberControllers.updateHobbies
);

router.patch(
  "/:id/interests",
  validateRequest(MemberValidations.updateInterestsValidationSchema),
  MemberControllers.updateInterests
);

router.patch(
  "/:id/travel-info",
  validateRequest(MemberValidations.updateTravelInformationValidationSchema),
  MemberControllers.updateTravelInformation
);

router.patch(
  "/:id/contact-info",
  validateRequest(MemberValidations.updateContactInformationValidationSchema),
  MemberControllers.updateContactInformation
);

export const MemberRoutes = router;
