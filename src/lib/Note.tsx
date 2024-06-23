import { ObjectId } from "mongodb";
import React from "react";

export type Note = {
  _id?: ObjectId;
  id: number;
  content: string;
  color: string;
  timestamp: Date;
  created?: Date;
  updated?: Date;
};
