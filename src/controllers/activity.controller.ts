import { Request, Response } from "express";
import Feedback from "../models/Feedback";
import AppRequest from "../models/interfaces/AppRequest.interface";
import { getActivities } from "../services/activity.service";

export const getActivitiesController = async (
  req: AppRequest,
  res: Response
) => {
  let feedback = new Feedback<any>();
  let { page, docid } = req.query || 1;

  if (docid) {
    feedback = await getActivities(Number(page), Number(docid));
  } else {
    feedback.success = false;
    feedback.message = "This link is broken or invalid";
  }

  res.send(feedback);
};
