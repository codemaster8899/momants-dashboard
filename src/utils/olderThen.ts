export const isOlderThan24Hours = (conversationEndedAt: string | null): boolean => {
  if (!conversationEndedAt) return false; // no date to check

  const endedAt = new Date(conversationEndedAt);
  const now = new Date();
  const hoursDifference =
    (now.getTime() - endedAt.getTime()) / (1000 * 60 * 60);

  return hoursDifference > 24;
};
