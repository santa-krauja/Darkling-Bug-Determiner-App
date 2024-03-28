export enum BugBodyPart {
  LEG = "leg",
  HEAD = "head",
  FRONT_WINGS = "front_wings",
  TENTACLES = "tentacles",
  FORE_CHEST = "fore_chest",
}

export type BugBodyPartKey = keyof typeof BugBodyPart; // 'LEG' | 'HEAD'
export type BugBodyPartValue = typeof BugBodyPart[BugBodyPartKey]; // 'leg' | 'head'
