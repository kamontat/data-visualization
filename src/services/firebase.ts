import debug from "debug";
import type Firebase from "firebase";

const logger = debug("services").extend("firebase");
export class FirebaseService {
  constructor(private firebase: typeof Firebase) {}

  subscribe(): void {
    logger("subscribe data: %O", this.firebase);
  }
}
