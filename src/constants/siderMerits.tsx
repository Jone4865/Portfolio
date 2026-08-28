import type { ComponentType } from 'react';
import { FaGrinBeam } from 'react-icons/fa';
import { LuBookOpenCheck, LuMessagesSquare } from 'react-icons/lu';
import { GrRun } from 'react-icons/gr';

import { profile } from 'data/profile';

type MeritKey = (typeof profile.merits)[number]['key'];

export const siderMeritIcons: Record<MeritKey, ComponentType> = {
  communication: LuMessagesSquare,
  calm: FaGrinBeam,
  challenge: GrRun,
  detail: LuBookOpenCheck,
};
