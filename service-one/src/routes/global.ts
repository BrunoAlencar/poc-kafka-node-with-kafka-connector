import express from 'express';
import globalController from './../controllers/global';
const router = express.Router();
// your routes paths and methods
// single basic route at the base path of your application
router.get('/', globalController.healthyCheck);
export default router;
