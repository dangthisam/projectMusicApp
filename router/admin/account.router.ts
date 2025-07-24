import { Router } from "express";
const router = Router();
import {
  indexAccount,
  createAccount,
  postCreateAccount,
  editAccount,
  editAccountPatch
} from "../../controller/admin/account.controller";

import multer from "multer";
const upload = multer();
import * as uploadMiddleware from "../../middleware/admin/uploadCould.middleware";
import * as validateAccount from "../../validate/admin/createAccount";
router.get("/", indexAccount);

router.get("/create", createAccount);

router.post("/create" ,
    upload.single("avatar"),
    uploadMiddleware.uploadSingle,
    validateAccount.createAccount,
    postCreateAccount
)

router.get("/edit/:id" , editAccount);

router.patch("/edit/:id" , 
  upload.single("avatar"),
  uploadMiddleware.uploadSingle,

  editAccountPatch);


export default router;
