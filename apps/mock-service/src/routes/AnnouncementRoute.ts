import express, { Request, Response } from 'express';
import { Logger } from '@siakad/express.utils';
import AnnouncementList from '../resource/announcement/AnnouncementList.json';

const router = express.Router();

interface AnnouncementQuery {
  page: number;
  page_size: number;
}

router.get(
  '/',
  (req: Request<{}, {}, {}, AnnouncementQuery>, res: Response): Response => {
    const { page, page_size } = req.query;
    Logger.info(
      `[Announcement] Get Announcement | page: ${page} | page_size: ${page_size}`
    );
    return res.json(AnnouncementList);
  }
);

export default router;
