import { ConferencesList } from '@/app/models/spreadsheet-model';
import Conferences from '@/classes/conferences';
import { getConferencesList } from '@/shared/components/body/conferences-utils';
import { addHours } from 'date-fns';
import isAfter from 'date-fns/isAfter';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = { data: string };

export const getConferencesRequest = async () => {
  const conferencesInstance = Conferences.getInstance();

  if (
    !conferencesInstance.getLastUpdate() ||
    isAfter(
      Number(conferencesInstance.getLastUpdate()),
      addHours(Date.now(), Conferences.update_amount_hours)
    )
  ) {
    const conferencesList = await getConferencesList();
    conferencesInstance.setConferences(conferencesList);

    return conferencesList;
  }

  return conferencesInstance.getConferences();
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method === 'GET') {
    res.status(200).json({ data: JSON.stringify(getConferencesRequest()) });
  }
};

export default handler;
