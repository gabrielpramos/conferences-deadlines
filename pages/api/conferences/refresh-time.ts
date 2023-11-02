import Conferences from '@/classes/conferences';
import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  data: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method === 'GET') {
    res.status(200).json({
      data: JSON.stringify(Conferences.getInstance().getLastUpdate()),
    });
  }
};

export default handler;
