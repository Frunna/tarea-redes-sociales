import { Router } from "express";
import { Controller } from "./controller.js";

export class CommuneRoute {
  static get route() {
    const router = Router();
    const controller = new Controller();
    router.get("", controller.getAllCommunes);

    return router;
  }
}
