import debug from "debug";
import type Firebase from "firebase";

import { updateUser } from "src/stores/user";

const logger = debug("services").extend("warmup");

export class WarmupService {
  constructor(private firebase: typeof Firebase) {}

  async start(): Promise<void> {
    return new Promise<void>(res => {
      updateUser(this.firebase, () => {
        console.log("promise resolved");
        res();
      });
    }).then(() => {
      logger("start");
    });
  }
}
