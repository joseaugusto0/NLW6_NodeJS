import { Router } from "express"
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUsersController } from "./controllers/CreateUsersController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();
const createUserController = new CreateUsersController();
const createTagController = new CreateTagController();

router.post("/users", createUserController.handle)
router.post("/tags", ensureAdmin, createTagController.handle)
export {router};