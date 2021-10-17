import { PrismaClient, User } from '@prisma/client';
import Feedback from '../models/Feedback';
import Pagination from '../models/Pagination';
import { sendMail } from '../utils/nodemailer.utils';

const prisma = new PrismaClient();

export const shareDocument = async (
  documentId: number,
  email: string,
  user: User,
  host: string
) => {
  let feedback = new Feedback<boolean>();
  try {
    let version = await prisma.documentVersion.findFirst({
      where: { documentId, isCurrent: true },
    });
    if (version) {
      let shareId: number;
      let alreadyShared = await prisma.share.findFirst({
        where: { userId: user.id, versionId: version.id },
      });
      if (!alreadyShared) {
        let { id } = await prisma.share.create({
          data: {
            email,
            versionId: version.id,
          },
        });
        shareId = id;
      } else {
        shareId = alreadyShared.id;
      }
      // TODO: send mail to user
      await sendMail({
        to: `${email}`,
        from: `<myproject2019@aol.com>`,
        subject: `${user.firstname} ${user.lastname} (via Cloudify)`,
        html: `
          <p>
            Hi,
          </p>
          <p>
            ${user.firstname} ${user.lastname} (<a href="mailto:${user.email}">${user.email}</a>) invited you to view the file "<b>${version.name}</b>" on Cloudify.
          </p>
          <br>
          <br>
          <a href="${host}/share/document/request/${shareId}" style="background-color: green; color: #fff; padding: 0.8rem;display: inline-block; text-decoration: none">View file</a>
          <br>
          <br>
          <p>
            Enjoy!
          </p>
          <p>
            The Cloudify Team
          </p>
      `,
      });
    } else {
      feedback.success = false;
      feedback.message = 'Document does not exists';
    }
  } catch (error) {
    console.log(error);
    feedback.success = false;
    feedback.message = 'Failed to share document.';
  }
  return feedback;
};

export const acceptShare = async () => {};

export const getSharedDocuments = async () => {};
