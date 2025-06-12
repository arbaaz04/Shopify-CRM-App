import { deleteRecord, ActionOptions } from "gadget-server";
import { preventCrossShopDataAccess } from "gadget-server/shopify";

export const run: ActionRun = async ({ params, record, logger, api, connections }) => {
  await deleteRecord(record);
  await preventCrossShopDataAccess(params, record);
};

export const options: ActionOptions = {
  actionType: "delete",
};
