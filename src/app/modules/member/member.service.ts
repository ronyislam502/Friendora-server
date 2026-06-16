
import QueryBuilder from "../../builder/queryBuilder";
import { Member } from "./member.model";


const allMembersFromDB = async (query: Record<string, unknown>) => {
  const memberQuery = new QueryBuilder(Member.find(), query)
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await memberQuery.countTotal();
  const data = await memberQuery.modelQuery

  return { meta, data };
};

export const MemberServices = {
  allMembersFromDB,
};
