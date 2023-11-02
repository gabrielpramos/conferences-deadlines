import Conferences from '@/classes/conferences';
import { getConferencesList } from '@/shared/components/body/conferences-utils';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = { data: string };

export const getConferencesRequest = async () => {
  const conferencesInstance = Conferences.getInstance();
  const conferencesList = await getConferencesList();

  conferencesInstance.setConferences(conferencesList);

  return conferencesList;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method === 'GET') {
    const responseData = await getConferencesRequest();

    res.status(200).json({ data: JSON.stringify(responseData) });
  }
};

export default handler;
